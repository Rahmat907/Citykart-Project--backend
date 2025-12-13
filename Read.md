# Citykart – Backend

A **production-ready ecommerce backend** built with Node.js, focused on clean API design, security, and real-world integrations like payments, media uploads, and AI.

This project is inspired by a real local mall use case and demonstrates how a scalable backend system is designed, configured, and debugged in a production-like environment.

---

## 🚀 Features

* User authentication using **JWT** (login, logout, protected routes)
* **Role-based access control** (Admin / User)
* Product & category management (Admin APIs)
* Cart and order management
* **PayPal payment gateway** integration
* **AI-powered chatbot** using Groq API
* Image upload & management using **Cloudinary**
* Centralized error handling
* Secure environment-based configuration

---

## 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB** with Mongoose
* **JWT Authentication**
* **Cloudinary** (media storage)
* **PayPal SDK** (payments)
* **Groq AI API**
* RESTful API architecture

---

## 🧠 Architecture Overview

The backend follows a **modular MVC-style architecture**:

* **Routes** handle request mapping
* **Controllers** contain business logic
* **Models** manage database schemas
* **Config layer** initializes third-party services safely

Special care is taken to:

* Load environment variables before initializing SDKs
* Avoid top-level risky initializations
* Keep secrets out of the codebase

---

## 🔐 Environment Variables

Create a `.env` file in the project root using the template below:

```env
PORT=5000
MONGODB_PASSWORD=
GROQ_API_KEY=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
```

> ⚠️ The `.env` file is ignored from GitHub to protect sensitive credentials.

---

## ▶️ Running the Project Locally

```bash
npm install
npm run dev
```

The server will start on the port defined in the `.env` file.

---

## 🧪 What This Project Demonstrates

* Real-world backend development (not a toy project)
* Secure handling of environment variables
* Third-party API integrations (AI, payments, media)
* Debugging production-level crashes caused by module load order
* Clean and scalable API design

---

## 📌 Use Cases

* Ecommerce platforms
* Admin dashboards
* Payment-based applications
* AI-assisted customer support systems

---

## 👨‍💻 Author

**Rahmat**
Backend Developer | Node.js | MongoDB | REST APIs

---

## ⭐ Notes

This project is built with a strong focus on **backend engineering practices**, real-world problem solving, and production-readiness rather than tutorial-based implementation.
