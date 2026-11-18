"""
base.py
-------
الملف الرئيسي لتشغيل موقع "إدارة حياتي" (Life Manager) باستخدام Flask.
يدعم تسجيل الدخول (Sign In / Sign Up) والتصميم المتجاوب مع الهواتف.
لتشغيل الموقع:
    python base.py
ثم افتح المتصفح على الرابط:
    http://127.0.0.1:5000
"""

import os
from flask import Flask, render_template, request, redirect, url_for, jsonify, session
from jinja2 import ChoiceLoader, FileSystemLoader, DictLoader
from database import db

# تحديد المسارات المطلقة للمشروع لضمان العثور على القوالب والملفات الثابتة دائماً
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_DIR = os.path.join(BASE_DIR, "templates")
STATIC_DIR = os.path.join(BASE_DIR, "static")

# التأكد من وجود وتحديث ملفات القوالب (templates) والملفات الثابتة (static) وتجهيز قاعدة البيانات
db.ensure_project_files(BASE_DIR)
db.init_db()

app = Flask(
    __name__,
    template_folder=TEMPLATE_DIR,
    static_folder=STATIC_DIR,
)
app.secret_key = os.environ.get("LIFE_MANAGER_SECRET", "life-manager-personal-secret-key-2026")

# إعداد محمّل قوالب مزدوج: يقرأ من مجلد templates أولاً، ويستخدم النسخة الاحتياطية لمنع خطأ TemplateNotFound
app.jinja_loader = ChoiceLoader([
    FileSystemLoader(TEMPLATE_DIR),
    DictLoader(db.DEFAULT_TEMPLATES),
])


def get_current_user_id():
    """إرجاع رقم المستخدم المسجل حالياً في الجلسة."""
    return session.get("user_id", 1)


@app.before_request
def before_any_request():
    """التأكد من ملفات المشروع والتحقق من تسجيل الدخول قبل فتح صفحات لوحة التحكم."""
    db.ensure_project_files(BASE_DIR)
    allowed_endpoints = ("login", "register", "static")
    if request.endpoint and request.endpoint not in allowed_endpoints:
        if "user_id" not in session:
            return redirect(url_for("login"))


@app.context_processor
def inject_current_user():
    """تمرير بيانات المستخدم الحالي لجميع قوالب HTML تلقائياً."""
    if "user_id" in session:
        return {
            "current_user": {
                "id": session.get("user_id"),
                "username": session.get("username"),
                "display_name": session.get("display_name"),
            }
        }
    return {"current_user": None}


# ============================================================================
# 0. مسارات تسجيل الدخول والحسابات (Authentication Routes)
# ============================================================================

@app.route("/login", methods=["GET", "POST"])
def login():
    """صفحة تسجيل الدخول (Sign In)."""
    if "user_id" in session:
        return redirect(url_for("home"))

    error = None
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")
        remember = request.form.get("remember")

        user = db.authenticate_user(username, password)
        if user:
            session.permanent = bool(remember)
            session["user_id"] = user["id"]
            session["username"] = user["username"]
            session["display_name"] = user["display_name"]
            return redirect(url_for("home"))
        else:
            error = "اسم المستخدم أو كلمة المرور غير صحيحة / Invalid username or password"

    return render_template("login.html", title="تسجيل الدخول | Sign In", error=error, mode="login")


@app.route("/register", methods=["POST"])
def register():
    """إنشاء حساب مستخدم جديد وتسجيل الدخول مباشرة."""
    username = request.form.get("username", "").strip()
    display_name = request.form.get("display_name", "").strip()
    password = request.form.get("password", "")

    user, error = db.create_user(username, display_name, password)
    if error:
        return render_template("login.html", title="إنشاء حساب | Create Account", error=error, mode="register")

    session.permanent = True
    session["user_id"] = user["id"]
    session["username"] = user["username"]
    session["display_name"] = user["display_name"]
    return redirect(url_for("home"))


@app.route("/logout")
def logout():
    """تسجيل الخروج ومسح الجلسة."""
    session.clear()
    return redirect(url_for("login"))


# ============================================================================
# 1. الصفحات الرئيسية (Page Routes)
# ============================================================================

@app.route("/")
@app.route("/dashboard")
def home():
    """الصفحة الرئيسية (Dashboard): تعرض ملخصاً شاملاً للجدول والماليات والعادات."""
    uid = get_current_user_id()
    tasks = db.get_all_tasks(user_id=uid)
    habits = db.get_all_habits(user_id=uid)
    finance = db.get_finance_summary(user_id=uid)
    recent_transactions = db.get_all_transactions(user_id=uid)[:4]

    pending_count = sum(1 for t in tasks if not t["completed"])
    completed_habits_count = sum(1 for h in habits if h["completed_today"])

    return render_template(
        "home.html",
        title="Dashboard | اللوحة الرئيسية",
        active_page="dashboard",
        tasks=tasks[:5],
        pending_count=pending_count,
        total_tasks_count=len(tasks),
        habits=habits,
        completed_habits_count=completed_habits_count,
        finance=finance,
        recent_transactions=recent_transactions,
    )


@app.route("/schedule")
def schedule():
    """صفحة الجدول والمهام (Schedule Page)."""
    uid = get_current_user_id()
    category_filter = request.args.get("category", "all")
    status_filter = request.args.get("status", "all")
    tasks = db.get_all_tasks(category=category_filter, status=status_filter, user_id=uid)

    all_tasks = db.get_all_tasks(user_id=uid)
    total_count = len(all_tasks)
    completed_count = sum(1 for t in all_tasks if t["completed"])
    pending_count = total_count - completed_count

    return render_template(
        "schedule.html",
        title="Schedule | الجدول والمهام",
        active_page="schedule",
        tasks=tasks,
        current_category=category_filter,
        current_status=status_filter,
        total_count=total_count,
        completed_count=completed_count,
        pending_count=pending_count,
    )


@app.route("/habits")
def habits():
    """صفحة تتبع العادات (Habits Page)."""
    uid = get_current_user_id()
    habits_list = db.get_all_habits(user_id=uid)
    total_habits = len(habits_list)
    completed_today = sum(1 for h in habits_list if h["completed_today"])
    best_streak = max((h["streak"] for h in habits_list), default=0)

    return render_template(
        "habits.html",
        title="Habits | تتبع العادات",
        active_page="habits",
        habits=habits_list,
        total_habits=total_habits,
        completed_today=completed_today,
        best_streak=best_streak,
    )


@app.route("/finance")
def finance():
    """صفحة إدارة الماليات والميزانية (Finance Page)."""
    uid = get_current_user_id()
    tx_type_filter = request.args.get("type", "all")
    transactions = db.get_all_transactions(
        tx_type=tx_type_filter if tx_type_filter in ("income", "expense") else None,
        user_id=uid,
    )
    summary = db.get_finance_summary(user_id=uid)

    return render_template(
        "finance.html",
        title="Finance | الماليات",
        active_page="finance",
        transactions=transactions,
        finance=summary,
        current_type=tx_type_filter,
    )


# ============================================================================
# 2. عمليات الجدول والمهام (Schedule Actions)
# ============================================================================

@app.route("/schedule/add", methods=["POST"])
def add_task_route():
    """إضافة مهمة جديدة من النموذج."""
    uid = get_current_user_id()
    title = request.form.get("title", "").strip()
    category = request.form.get("category", "study")
    priority = request.form.get("priority", "medium")
    due_date = request.form.get("due_date", "")
    due_time = request.form.get("due_time", "")
    notes = request.form.get("notes", "")
    redirect_to = request.form.get("redirect_to", "schedule")

    if title:
        db.add_task(title, category, priority, due_date, due_time, notes, user_id=uid)

    return redirect(url_for("home" if redirect_to == "home" else "schedule"))


@app.route("/schedule/toggle/<int:task_id>", methods=["POST"])
def toggle_task_route(task_id):
    """تغيير حالة المهمة."""
    new_state = db.toggle_task(task_id)
    if request.headers.get("X-Requested-With") == "XMLHttpRequest" or request.is_json:
        return jsonify({"status": "ok", "task_id": task_id, "completed": new_state})
    redirect_to = request.form.get("redirect_to", "schedule")
    return redirect(url_for("home" if redirect_to == "home" else "schedule"))


@app.route("/schedule/delete/<int:task_id>", methods=["POST"])
def delete_task_route(task_id):
    """حذف مهمة."""
    db.delete_task(task_id)
    redirect_to = request.form.get("redirect_to", "schedule")
    return redirect(url_for("home" if redirect_to == "home" else "schedule"))


# ============================================================================
# 3. عمليات العادات (Habits Actions)
# ============================================================================

@app.route("/habits/add", methods=["POST"])
def add_habit_route():
    """إضافة عادة جديدة."""
    uid = get_current_user_id()
    name = request.form.get("name", "").strip()
    icon = request.form.get("icon", "🔥").strip() or "🔥"
    target_days = request.form.get("target_days", 7)
    if name:
        db.add_habit(name, icon, target_days, user_id=uid)
    return redirect(url_for("habits"))


@app.route("/habits/toggle/<int:habit_id>", methods=["POST"])
def toggle_habit_route(habit_id):
    """تسجيل إنجاز العادة اليوم أو إلغاؤه."""
    result = db.toggle_habit(habit_id)
    if request.headers.get("X-Requested-With") == "XMLHttpRequest" or request.is_json:
        return jsonify({"status": "ok", "habit_id": habit_id, "data": result})
    redirect_to = request.form.get("redirect_to", "habits")
    return redirect(url_for("home" if redirect_to == "home" else "habits"))


@app.route("/habits/reset/<int:habit_id>", methods=["POST"])
def reset_habit_route(habit_id):
    """تصفير عداد العادة."""
    db.reset_habit_streak(habit_id)
    return redirect(url_for("habits"))


@app.route("/habits/delete/<int:habit_id>", methods=["POST"])
def delete_habit_route(habit_id):
    """حذف عادة."""
    db.delete_habit(habit_id)
    return redirect(url_for("habits"))


# ============================================================================
# 4. عمليات الماليات (Finance Actions)
# ============================================================================

@app.route("/finance/add", methods=["POST"])
def add_transaction_route():
    """إضافة معاملة مالية جديدة (دخل أو مصروف)."""
    uid = get_current_user_id()
    title = request.form.get("title", "").strip()
    amount_raw = request.form.get("amount", "0")
    tx_type = request.form.get("tx_type", "expense")
    category = request.form.get("category", "general")
    tx_date = request.form.get("tx_date", "")
    notes = request.form.get("notes", "")

    try:
        amount = float(amount_raw)
    except ValueError:
        amount = 0.0

    if title and amount > 0:
        db.add_transaction(title, amount, tx_type, category, tx_date, notes, user_id=uid)

    return redirect(url_for("finance"))


@app.route("/finance/budget", methods=["POST"])
def update_budget_route():
    """تحديث الميزانية الشهرية."""
    uid = get_current_user_id()
    budget_raw = request.form.get("monthly_budget", "800")
    try:
        budget_val = float(budget_raw)
        if budget_val > 0:
            db.update_monthly_budget(budget_val, user_id=uid)
    except ValueError:
        pass
    return redirect(url_for("finance"))


@app.route("/finance/delete/<int:tx_id>", methods=["POST"])
def delete_transaction_route(tx_id):
    """حذف معاملة مالية."""
    db.delete_transaction(tx_id)
    return redirect(url_for("finance"))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
