# 🛍️ ShopVerse — Full-Stack E-Commerce Web Application

A complete, colorful e-commerce web app built with the **MERN-style stack** (MongoDB, Express, React, Node.js) featuring product catalog, cart, checkout, mock payments, order tracking, and role-based Admin/User access. All prices are in **Indian Rupees (₹)**.

---

## ✨ Features

- 🔐 **User Authentication** — Signup/Login with JWT, passwords hashed with bcrypt
- 👤 **Role-Based Access** — Separate User and Admin experiences
- 🛒 **Product Catalog** — 15 seeded products across 7 categories, search & category filters
- 🧺 **Cart** — Add/remove/update quantity, persisted in localStorage
- 📦 **Checkout Flow** — Shipping address → Payment (Card / UPI / COD, simulated) → Order confirmation
- 🚚 **Order Tracking** — Visual status timeline (Placed → Confirmed → Shipped → Out for Delivery → Delivered)
- 🧾 **Order History** — Users can view all past orders
- 🛠️ **Admin Panel** — Dashboard stats, full product CRUD, order status management
- 🎨 **Colorful UI** — Gradient theme, Tailwind CSS, responsive design, toast notifications
- 🗄️ **Database** — MongoDB with Mongoose (schema for Users, Products, Orders)

---

## 📁 Project Structure

```
ecommerce-app/
├── backend/                 # Node.js + Express + MongoDB API
│   ├── config/db.js
│   ├── models/               (User, Product, Order)
│   ├── controllers/          (auth, product, order logic)
│   ├── routes/                (auth, product, order routes)
│   ├── middleware/           (JWT auth, admin guard, error handler)
│   ├── seed/                 (15 sample products + seed script)
│   ├── server.js
│   └── .env.example
│
└── frontend/                 # React + Vite + Tailwind CSS
    ├── src/
    │   ├── api/axios.js
    │   ├── context/          (AuthContext, CartContext)
    │   ├── components/       (Navbar, ProductCard, Footer, route guards)
    │   ├── pages/             (Home, Login, Signup, Cart, Checkout, Payment,
    │   │                       OrderTracking, OrderHistory, Admin pages...)
    │   └── App.jsx
    └── .env.example
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/try/download/community) running locally, **or** a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1️⃣ Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and set your `MONGO_URI` (local or Atlas) and a strong `JWT_SECRET`.

Seed the database with 15 products + demo accounts:

```bash
npm run seed
```

This creates:
- **Admin login:** `admin@shopverse.com` / `admin123`
- **User login:** `user@shopverse.com` / `user1234`

Start the backend server:

```bash
npm run dev
```

Backend runs at **http://localhost:5000**

### 2️⃣ Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs at **http://localhost:5173**

### 3️⃣ Use the App

1. Visit `http://localhost:5173`
2. Sign up for a new account, or use the demo Admin/User logins on the Login page (click "Use Admin Demo" / "Use User Demo" to auto-fill)
3. Browse products → Add to Cart → Checkout → Pay (Card/UPI/COD — all simulated, no real payment gateway) → Track your order
4. Log in as Admin to manage products and update order statuses

---

## 🔌 API Endpoints

| Method | Endpoint                     | Description                    | Access       |
|--------|-------------------------------|---------------------------------|--------------|
| POST   | /api/auth/register             | Register new user               | Public       |
| POST   | /api/auth/login                | Login                            | Public       |
| GET    | /api/auth/me                   | Get logged-in user               | Private      |
| GET    | /api/products                  | List products (search/filter)   | Public       |
| GET    | /api/products/:id              | Get single product               | Public       |
| POST   | /api/products                  | Create product                   | Admin        |
| PUT    | /api/products/:id              | Update product                   | Admin        |
| DELETE | /api/products/:id              | Delete product                   | Admin        |
| POST   | /api/orders                    | Place new order                  | Private      |
| GET    | /api/orders/myorders           | Get logged-in user's orders     | Private      |
| GET    | /api/orders/:id                | Get order details                | Private/Admin|
| GET    | /api/orders                    | List all orders                  | Admin        |
| PUT    | /api/orders/:id/status         | Update order status              | Admin        |

---

## 🛠️ Tech Stack

**Frontend:** React 18, Vite, React Router, Tailwind CSS, Axios, React Icons, React Hot Toast
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt.js
**Currency:** All prices displayed in Indian Rupees (₹)

---

## 📝 Notes

- Payment is **simulated** (no real gateway integrated) — perfect for learning/demo purposes.
- To switch to MySQL/PostgreSQL instead of MongoDB, you'd replace the Mongoose models with an ORM like Sequelize/Prisma — the route/controller structure would stay largely the same.
- This project is designed as a hands-on learning exercise for building a full-stack app with authentication, role-based access, REST APIs, and database integration.
