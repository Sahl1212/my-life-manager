-- ============================================================================
-- Life Manager Database Schema (SQLite) - v2 (Auth + Multi-User Support)
-- مخطط قاعدة البيانات لتطبيق إدارة حياتي (يدعم تسجيل الدخول وتعدد المستخدمين)
-- ============================================================================

-- 1. Users Table (جدول المستخدمين لتسجيل الدخول)
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,        -- اسم المستخدم (فريد)
    display_name TEXT NOT NULL,           -- الاسم الظاهر في الواجهة
    password_hash TEXT NOT NULL,          -- كلمة المرور المشفرة (SHA-256)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Schedule / Tasks Table (جدول المهام والمواعيد)
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER DEFAULT 1,            -- رقم المستخدم صاحب المهمة
    title TEXT NOT NULL,                  -- عنوان المهمة
    category TEXT DEFAULT 'study',        -- التصنيف: study, coding, sport, personal
    priority TEXT DEFAULT 'medium',       -- الأولوية: high, medium, low
    due_date TEXT DEFAULT '',             -- التاريخ (YYYY-MM-DD)
    due_time TEXT DEFAULT '',             -- الوقت (HH:MM)
    completed INTEGER DEFAULT 0,          -- الحالة: 0 = غير مكتملة، 1 = مكتملة
    notes TEXT DEFAULT '',                -- ملاحظات إضافية
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Habits Table (جدول العادات اليومية)
CREATE TABLE IF NOT EXISTS habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER DEFAULT 1,            -- رقم المستخدم صاحب العادة
    name TEXT NOT NULL,                   -- اسم العادة
    icon TEXT DEFAULT '🔥',               -- أيقونة العادة
    target_days INTEGER DEFAULT 7,        -- الهدف الأسبوعي (أيام في الأسبوع)
    streak INTEGER DEFAULT 0,             -- عدد الأيام المتتالية (Streak)
    completed_today INTEGER DEFAULT 0,    -- هل تم إنجازها اليوم؟ (0 أو 1)
    last_completed_date TEXT DEFAULT '',  -- تاريخ آخر إنجاز
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Finance Transactions Table (جدول المعاملات المالية)
CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER DEFAULT 1,            -- رقم المستخدم صاحب المعاملة
    title TEXT NOT NULL,                  -- وصف المعاملة
    amount REAL NOT NULL,                 -- المبلغ
    tx_type TEXT NOT NULL,                -- النوع: 'income' (دخل) أو 'expense' (مصروف)
    category TEXT DEFAULT 'general',      -- التصنيف: food, study, transport, salary, freelance, entertainment, general
    tx_date TEXT DEFAULT '',              -- تاريخ المعاملة (YYYY-MM-DD)
    notes TEXT DEFAULT '',                -- ملاحظات
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Settings / Budget Table (جدول الإعدادات والميزانية)
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);
