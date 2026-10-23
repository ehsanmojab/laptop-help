# 💻 Laptop Consultation & Community Q&A Platform

A modern, responsive full-stack platform designed for personalized laptop purchasing advice, hardware comparisons, and interactive community discussions.

## 🚀 Key Features

- **Community Forum & Q&A:** Ask targeted questions, get expert purchasing guidance, and exchange feedback.
- **Lightweight Authentication:** Streamlined sign-up with a unique username, full name, and password (no SMS/email verification required). Scoped exclusively to the forum.
- **User Question Quota:** Enforced backend limit allowing up to 7 questions per user account, complete with real-time visual progress indicators.
- **Image Attachments:** Attach up to 3 pictures per question (max 3MB each) with thumbnail previews, drag-and-drop support, and an interactive full-screen lightbox.
- **Dynamic Theming:** Seamless Dark Mode / Light Mode toggle with rich glassmorphism aesthetics and native RTL typography.
- **Production-Ready Architecture:** Modular NestJS REST API with TypeORM (supports both zero-setup SQLite locally and PostgreSQL for production VPS deployment).

## 🛠️ Tech Stack

- **Frontend:** Vue 3 (Composition API), Vite, Pinia, Vue Router, Lucide Icons
- **Backend:** NestJS, TypeScript, TypeORM, Multer, Passport & JWT
- **Database:** SQLite (local development) / PostgreSQL (VPS production)
