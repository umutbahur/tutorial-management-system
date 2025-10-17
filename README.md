# 📚 Tutorial Management System

[![React](https://img.shields.io/badge/Frontend-React-61DBFB?logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Style-TailwindCSS-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/API-Express-000000?logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> A full-stack, role-based tutorial platform that allows users to create, manage, and explore tutorials.  
> Built with **React**, **Node.js**, **Express**, **PostgreSQL**, and **TailwindCSS** — with a secure authentication system and elegant admin dashboard.

---

## 🚀 Features

### 👥 User & Auth
- Secure JWT-based authentication  
- Role-based access (`admin`, `user`)
- Registration & login pages with form validation

### 📘 Tutorials
- Create, edit, delete, and publish tutorials  
- Browse all tutorials (public)  
- Manage personal tutorials (protected)

### 🧑‍💼 Admin Dashboard
- Manage users and tutorials visually  
- Elegant modals for editing and deleting  
- Sidebar + top navbar layout with responsive design

### UI/UX
- Modern TailwindCSS interface  
- Smooth animations and transitions  
- Mobile-friendly responsive layout

---

## 🏗️ Project Structure

tutorial-management-system/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Pages (Home, Login, Admin, etc.)
│ │ ├── context/ # Auth context
│ │ └── services/ # API calls via Axios
│ └── package.json
│
├── server/ # Node.js backend
│ ├── controllers/ # Business logic
│ ├── middlewares/ # Auth & validation
│ ├── models/ # Sequelize/PostgreSQL models
│ ├── routes/ # Express routes
│ ├── config/ # Database & environment setup
│ └── server.js
│
├── .gitignore
├── README.md
└── package.json



---

## ⚙️ Installation & Setup

### 1. Clone the repository
```
git clone https://github.com/<umutbahur>tutorial-management-system.git
cd tutorial-management-system

```


### 🔧 2. Backend setup
```
cd server
npm install
```
#### Create a .env file inside server/:
```
PORT=5000
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/tutorialdb
JWT_SECRET=your_jwt_secret
```
#### Run the backend:
`node server.js`

### 🎨 3. Frontend setup
```
cd ../client
npm install
npm run dev
```
Visit the app at 👉 http://localhost:5173


## 🧑‍💻 Usage
| Role    | Capabilities                                       |
| ------- | -------------------------------------------------- |
| **user**  | Create, view, and manage own tutorials             |
| **admin** | Manage all users and tutorials through admin panel |


## 🧱 Tech Stack
| Layer        | Technologies               |
| ------------ | -------------------------- |
| **Frontend** | React, Vite, TailwindCSS   |
| **Backend**  | Node.js, Express           |
| **Database** | PostgreSQL (Sequelize ORM) |
| **Auth**     | JWT-based                  |
| **Styling**  | TailwindCSS + Lucide Icons |

## 🔗 API Overview

| Method | Endpoint             | Description                  |
| ------ | -------------------- | ---------------------------- |
| GET    | `/api/tutorials`     | Get all tutorials            |
| GET    | `/api/tutorials/:id` | Get one tutorial             |
| GET    | `/api/tutorials/my`  | Get current user’s tutorials |
| POST   | `/api/tutorials`     | Create tutorial              |
| PUT    | `/api/tutorials/:id` | Update tutorial              |
| DELETE | `/api/tutorials/:id` | Delete tutorial              |


## 🧑‍🎨 Author

👤 Umut Bahur
💼 Software Developer