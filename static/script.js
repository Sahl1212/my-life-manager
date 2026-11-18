// LIFE_MANAGER_V2_AUTH_MOBILE
// ============================================================================
// Life Manager Client Script (script.js) - v2 (Auth + Mobile Support)
// يتحكم في تبديل اللغة (عربي / إنجليزي)، تبديل النمط (داكن / فاتح)، وتبويبات الدخول
// ============================================================================

const translations = {
    ar: {
        page_title: "لوحة التحكم الشخصية | Life Manager",
        brand_name: "إدارة حياتي",
        nav_dashboard: "الرئيسية",
        nav_schedule: "الجدول",
        nav_finance: "الماليات",
        nav_habits: "العادات",
        nav_logout: "تسجيل الخروج",
        nav_logout_short: "خروج",
        // Auth / Login Page
        auth_subtitle: "سجّل دخولك لإدارة جدولك، عاداتك، ومالياتك من أي جهاز.",
        tab_login: "تسجيل الدخول",
        tab_register: "إنشاء حساب جديد",
        label_username: "اسم المستخدم",
        placeholder_username: "مثال: admin أو sahl",
        label_display_name: "الاسم الشخصي",
        placeholder_display_name: "مثال: سهل صديق",
        label_password: "كلمة المرور",
        placeholder_password: "أدخل كلمة المرور...",
        remember_me: "تذكرني على هذا الجهاز",
        btn_login_submit: "دخول إلى لوحة التحكم ←",
        btn_register_submit: "إنشاء الحساب والدخول ←",
        demo_hint_label: "الحساب الافتراضي الجاهز:",
        btn_quick_fill: "تعبئة سريعة ⚡",
        // Dashboard
        header_welcome: "مرحباً بك مجدداً 👋",
        header_subtitle: "إليك ملخص سريع لأهم أنشطة اليوم من قاعدة البيانات.",
        kpi_pending_tasks: "مهام متبقية",
        kpi_habits_done: "عادات منجزة اليوم",
        total_tasks: "إجمالي المهام",
        completed_tasks: "مهام مكتملة",
        tasks_remaining: "مهام متبقية",
        card_schedule_title: "جدول اليوم",
        card_finance_title: "ملخص الماليات",
        finance_balance: "الرصيد الحالي",
        finance_income: "إجمالي الدخل",
        finance_spent: "مصروفات الشهر",
        monthly_budget_label: "الميزانية الشهرية",
        budget_usage: "استهلاك الميزانية الشهرية",
        card_habits_title: "تتبع العادات",
        view_details: "التفاصيل ←",
        manage_habits: "إدارة العادات ←",
        days_unit: "أيام",
        btn_add: "إضافة",
        placeholder_quick_task: "أضف مهمة سريعة...",
        no_tasks_msg: "لا توجد مهام حالياً. أضف مهمتك الأولى!",
        no_habits_msg: "لا توجد عادات مضافة بعد.",
        no_tx_msg: "لا توجد معاملات مالية مسجلة.",
        // Schedule Page
        schedule_page_title: "📅 الجدول وإدارة المهام",
        schedule_page_subtitle: "نظّم محاضراتك، جلسات البرمجة، ومهامك اليومية بوضوح.",
        add_new_task_title: "➕ إضافة مهمة جديدة",
        label_task_title: "عنوان المهمة",
        placeholder_task_title: "مثال: مذاكرة مادة الرياضيات...",
        label_category: "التصنيف",
        cat_study: "🎓 دراسة ومحاضرات",
        cat_coding: "💻 برمجة ومشاريع",
        cat_sport: "🏋️ رياضة وصحة",
        cat_personal: "📌 شخصي وعام",
        label_priority: "الأولوية",
        prio_high: "🔴 عالية",
        prio_medium: "🟡 متوسطة",
        prio_low: "🟢 منخفضة",
        label_date: "التاريخ",
        label_time: "الوقت",
        label_notes: "ملاحظات (اختياري)",
        placeholder_notes: "تفاصيل إضافية...",
        btn_save_task: "حفظ المهمة في الجدول",
        schedule_list_title: "قائمة المهام والمواعيد",
        filter_all: "الكل",
        filter_pending: "المتبقية",
        filter_completed: "المكتملة",
        // Habits Page
        habits_page_title: "🔥 تتبع العادات اليومية",
        habits_page_subtitle: "ابْنِ عادات إيجابية مستمرة وتابع سلسلة التزامك اليومي.",
        total_habits: "إجمالي العادات",
        best_streak_label: "أفضل سلسلة التزام",
        add_new_habit_title: "➕ إضافة عادة جديدة",
        label_habit_name: "اسم العادة",
        placeholder_habit_name: "مثال: قراءة 10 صفحات، رياضة...",
        label_habit_icon: "الأيقونة",
        label_target_days: "الهدف الأسبوعي (أيام)",
        btn_save_habit: "إضافة العادة",
        habits_list_title: "عاداتك الحالية",
        weekly_goal: "الهدف الأسبوعي:",
        habit_done_btn: "مكتمل اليوم",
        habit_mark_btn: "تسجيل اليوم",
        // Finance Page
        finance_page_title: "💰 إدارة الماليات والميزانية",
        finance_page_subtitle: "تابع دخلك، مصروفاتك، وميزانيتك الشهرية بدقة.",
        add_tx_title: "➕ تسجيل معاملة مالية",
        label_tx_title: "الوصف / البند",
        placeholder_tx_title: "مثال: شراء كتب، وجبة غداء...",
        label_tx_amount: "المبلغ ($)",
        label_tx_type: "نوع المعاملة",
        type_expense: "🔻 مصروف (Expense)",
        type_income: "🔺 دخل / إيداع (Income)",
        type_income_short: "الدخل",
        type_expense_short: "المصروفات",
        btn_save_tx: "حفظ المعاملة المالية",
        budget_settings_title: "🎯 الميزانية وتوزيع المصروفات",
        btn_update_budget: "تحديث الميزانية",
        expenses_by_cat_title: "المصروفات حسب التصنيف:",
        tx_history_title: "سجل المعاملات المالية",
        th_title: "البند",
        th_category: "التصنيف",
        th_date: "التاريخ",
        th_amount: "المبلغ"
    },
    en: {
        page_title: "Personal Life Manager",
        brand_name: "Life Manager",
        nav_dashboard: "Dashboard",
        nav_schedule: "Schedule",
        nav_finance: "Finance",
        nav_habits: "Habits",
        nav_logout: "Sign Out",
        nav_logout_short: "Exit",
        // Auth / Login Page
        auth_subtitle: "Sign in to manage your schedule, habits, and finances on any device.",
        tab_login: "Sign In",
        tab_register: "Create Account",
        label_username: "Username",
        placeholder_username: "e.g., admin or sahl",
        label_display_name: "Full Name",
        placeholder_display_name: "e.g., Sahl Sideeg",
        label_password: "Password",
        placeholder_password: "Enter your password...",
        remember_me: "Remember me on this device",
        btn_login_submit: "Sign In to Dashboard →",
        btn_register_submit: "Create Account & Sign In →",
        demo_hint_label: "Default ready account:",
        btn_quick_fill: "Quick Fill ⚡",
        // Dashboard
        header_welcome: "Welcome back 👋",
        header_subtitle: "Here is a quick live summary of your day from the database.",
        kpi_pending_tasks: "Pending Tasks",
        kpi_habits_done: "Habits Done Today",
        total_tasks: "Total Tasks",
        completed_tasks: "Completed Tasks",
        tasks_remaining: "Tasks Left",
        card_schedule_title: "Today's Schedule",
        card_finance_title: "Financial Summary",
        finance_balance: "Current Balance",
        finance_income: "Total Income",
        finance_spent: "Monthly Spent",
        monthly_budget_label: "Monthly Budget",
        budget_usage: "Monthly Budget Usage",
        card_habits_title: "Habit Tracker",
        view_details: "Details →",
        manage_habits: "Manage Habits →",
        days_unit: "days",
        btn_add: "Add",
        placeholder_quick_task: "Add a quick task...",
        no_tasks_msg: "No tasks found. Add your first task!",
        no_habits_msg: "No habits added yet.",
        no_tx_msg: "No financial transactions recorded.",
        // Schedule Page
        schedule_page_title: "📅 Schedule & Task Manager",
        schedule_page_subtitle: "Organize your lectures, coding sessions, and daily tasks clearly.",
        add_new_task_title: "➕ Add New Task",
        label_task_title: "Task Title",
        placeholder_task_title: "e.g., Review calculus lecture...",
        label_category: "Category",
        cat_study: "🎓 Study & Lectures",
        cat_coding: "💻 Coding & Projects",
        cat_sport: "🏋️ Exercise & Health",
        cat_personal: "📌 Personal & General",
        label_priority: "Priority",
        prio_high: "🔴 High",
        prio_medium: "🟡 Medium",
        prio_low: "🟢 Low",
        label_date: "Date",
        label_time: "Time",
        label_notes: "Notes (Optional)",
        placeholder_notes: "Additional details...",
        btn_save_task: "Save Task to Schedule",
        schedule_list_title: "Tasks & Schedule List",
        filter_all: "All",
        filter_pending: "Pending",
        filter_completed: "Completed",
        // Habits Page
        habits_page_title: "🔥 Daily Habit Tracker",
        habits_page_subtitle: "Build consistent positive habits and track your daily streaks.",
        total_habits: "Total Habits",
        best_streak_label: "Best Streak",
        add_new_habit_title: "➕ Add New Habit",
        label_habit_name: "Habit Name",
        placeholder_habit_name: "e.g., Read 10 pages, Exercise...",
        label_habit_icon: "Icon",
        label_target_days: "Weekly Target (Days)",
        btn_save_habit: "Add Habit",
        habits_list_title: "Your Active Habits",
        weekly_goal: "Weekly Goal:",
        habit_done_btn: "Done Today",
        habit_mark_btn: "Check In Today",
        // Finance Page
        finance_page_title: "💰 Finance & Budget Manager",
        finance_page_subtitle: "Track your income, expenses, and monthly budget accurately.",
        add_tx_title: "➕ Record Transaction",
        label_tx_title: "Description / Item",
        placeholder_tx_title: "e.g., Textbooks, Lunch, Freelance...",
        label_tx_amount: "Amount ($)",
        label_tx_type: "Transaction Type",
        type_expense: "🔻 Expense",
        type_income: "🔺 Income",
        type_income_short: "Income",
        type_expense_short: "Expenses",
        btn_save_tx: "Save Transaction",
        budget_settings_title: "🎯 Monthly Budget & Breakdown",
        btn_update_budget: "Update Budget",
        expenses_by_cat_title: "Expenses by Category:",
        tx_history_title: "Transaction History",
        th_title: "Item",
        th_category: "Category",
        th_date: "Date",
        th_amount: "Amount"
    }
};

let currentLang = 'ar';
let currentTheme = 'dark';

const htmlRoot = document.documentElement;
const langToggleBtn = document.getElementById('lang-toggle');
const langTextSpan = document.getElementById('lang-text');
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIconSpan = document.getElementById('theme-icon');

function switchLanguage(lang) {
    currentLang = lang;
    htmlRoot.setAttribute('lang', lang);
    htmlRoot.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    if (langTextSpan) {
        langTextSpan.textContent = lang === 'ar' ? 'English' : 'عربي';
    }

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.setAttribute('placeholder', translations[lang][key]);
        }
    });

    try {
        localStorage.setItem('life_dashboard_lang', lang);
    } catch (e) {}
}

function switchTheme(theme) {
    currentTheme = theme;
    htmlRoot.setAttribute('data-theme', theme);
    if (themeIconSpan) {
        themeIconSpan.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    try {
        localStorage.setItem('life_dashboard_theme', theme);
    } catch (e) {}
}

// دوال صفحة تسجيل الدخول (Login / Register Helpers)
function switchAuthTab(mode) {
    const loginForm = document.getElementById('form-login');
    const regForm = document.getElementById('form-register');
    const loginBtn = document.getElementById('tab-btn-login');
    const regBtn = document.getElementById('tab-btn-register');
    if (!loginForm || !regForm) return;

    if (mode === 'register') {
        loginForm.classList.add('hidden-form');
        regForm.classList.remove('hidden-form');
        loginBtn.classList.remove('active');
        regBtn.classList.add('active');
    } else {
        regForm.classList.add('hidden-form');
        loginForm.classList.remove('hidden-form');
        regBtn.classList.remove('active');
        loginBtn.classList.add('active');
    }
}

function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈';
    } else {
        input.type = 'password';
        btn.textContent = '👁️';
    }
}

function fillDemoCredentials() {
    const u = document.getElementById('login-username');
    const p = document.getElementById('login-password');
    if (u && p) {
        u.value = 'admin';
        p.value = '1234';
        u.focus();
    }
}

if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        switchLanguage(newLang);
    });
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        switchTheme(newTheme);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    let savedLang = 'ar';
    let savedTheme = 'dark';
    try {
        savedLang = localStorage.getItem('life_dashboard_lang') || 'ar';
        savedTheme = localStorage.getItem('life_dashboard_theme') || 'dark';
    } catch (e) {}

    switchLanguage(savedLang);
    switchTheme(savedTheme);
});
