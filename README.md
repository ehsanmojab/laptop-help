# وب‌سایت تخصصی مشاوره خرید لپتاپ + تالار گفتگو (Monorepo)

یک پلتفرم کامل مشاوره و راهنمایی تخصصی انتخاب لپتاپ به همراه **تالار گفتگو (Forum)**، سیستم **احراز هویت کاربران (JWT Auth)** و بکند **NestJS**.

---

## ساختار مونو‌ریپو (Monorepo Structure)

```
laptop/
├── frontend/             # اپلیکیشن فرانت‌اند (Vue 3 + Vite + Tailwind + Pinia + GSAP)
│   ├── src/
│   │   ├── api/client.ts # کلاینت API با پشتیبانی توکن احراز هویت Bearer
│   │   ├── stores/       # استورهای Pinia (auth, forum, advisor)
│   │   ├── components/   # کامپوننت‌های Navbar, AuthModal, CreatePostModal
│   │   └── views/        # صفحات اصلی، تالار گفتگو (/forum)، مشاهده پرسش (/forum/:id)
├── backend/              # سرویس بکند (NestJS + TypeORM + PostgreSQL / SQLite)
│   ├── src/
│   │   ├── auth/         # ماژول احراز هویت (ثبت‌نام، ورود، JWT، bcryptjs)
│   │   ├── users/        # ماژول مدیریت کاربران
│   │   ├── posts/        # ماژول پرسش‌ها و فیلترهای تالار گفتگو
│   │   ├── comments/     # ماژول پاسخ‌ها و دیدگاه‌ها
│   │   └── database/     # سیدر اولیه داده‌ها (پاسخ‌های مشاور و نمونه پرسش‌ها)
├── package.json          # روت مونو‌ریپو با npm workspaces
└── README.md
```

---

## نحوه اجرا در حالت توسعه (Development)

برای اجرای همزمان فرانت‌اند و بکند با یک دستور، در ریشه پروژه دستور زیر را بزنید:

```bash
npm run dev
```

- **فرانت‌اند:** [http://localhost:5173](http://localhost:5173)
- **بکند API:** [http://localhost:3000/api](http://localhost:3000/api)
- **مستندات تعاملی Swagger:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

## اتصال دیتابیس (Local SQLite vs VPS PostgreSQL)

فایل تنظیمات در مسیر `backend/.env` قرار دارد:

### ۱. اجرای تستی روی لوکال (پیش‌فرض - بدون نیاز به نصب هیچ دیتابیسی):
```env
DB_TYPE=sqlite
```
بکند به طور خودکار از نسخه WebAssembly اسکیولایت استفاده می‌کند و تمام اطلاعات را درون فایل `backend/data/forum.sqlite` ذخیره می‌کند.

### ۲. اتصال به دیتابیس PostgreSQL روی سرور مجازی (VPS):
کافیست در `backend/.env` مشخصات سرور VPS خود را تنظیم کنید:
```env
DB_TYPE=postgres
DB_HOST=123.45.67.89      # آی‌پی سرور مجازی شما
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_strong_password
DB_NAME=laptop_forum
DB_SSL=false
```
بکند بلافاصله به سرور PostgreSQL شما وصل شده و جداول را خودکار هماهنگ (`synchronize: true`) می‌سازد.

---

## دستورات بیلد و تست (Build & Scripts)

| دستور | توضیح |
|---|---|
| `npm run dev` | اجرای همزمان فرانت‌اند و بکند با watch mode |
| `npm run build` | بیلد کامل هر دو پروژه برای پروداکشن |
| `npm run dev:frontend` | اجرای تکی فرانت‌اند |
| `npm run dev:backend` | اجرای تکی بکند |
| `npm run build:frontend` | کامپایل و بیلد فرانت‌اند |
| `npm run build:backend` | کامپایل و بیلد بکند |
