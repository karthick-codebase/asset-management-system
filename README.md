# 📦 Asset Management System

A full-stack Asset Management System built with React, Node.js, Express, Sequelize, and PostgreSQL. This application helps organizations efficiently manage company assets, employees, categories, and asset allocation.

---

## 🚀 Features

### 📊 Dashboard

- Dashboard overview
- Asset statistics
- Employee statistics
- Recent asset activities

### 📦 Asset Management

- Create Asset
- View Assets
- Update Asset
- Delete Asset
- Search Assets
- Filter by Status
- Pagination
- Asset Details
- Assign Asset to Employee
- Return Asset
- Scrap Asset
- Asset History Timeline

### 👨‍💼 Employee Management

- Create Employee
- View Employees
- Employee Details
- Update Employee
- Delete Employee
- Pagination
- Form Validation

### 🗂 Category Management

- Create Category
- View Categories
- Update Category
- Delete Category

### 📜 Asset History

- Assignment History
- Return History
- Scrap History
- Filter by Action
- Pagination

### ✅ Validation

- Required field validation
- Unique Asset ID validation
- Unique Serial Number validation
- Unique Employee ID validation
- Unique Email validation
- Backend validation with clear error messages
- Toast notifications

### 🎨 UI/UX

- Responsive Design
- Modern Dashboard UI
- Framer Motion Animations
- React Icons
- Toast Notifications
- Custom Confirmation Modal

---

# 🛠 Tech Stack

## Frontend

- React
- React Router DOM
- Tailwind CSS
- Axios
- Framer Motion
- React Toastify
- React Icons

## Backend

- Node.js
- Express.js
- Sequelize ORM

## Database

- PostgreSQL

---

# 📂 Project Structure

```
client/
│
├── components/
├── pages/
├── services/
├── layouts/
└── App.jsx

server/
│
├── config/
├── controllers/
├── models/
├── routes/
├── middleware/
└── server.js
```

---

# ⚙️ Installation

## Configure Environment Variables

Create a `.env` file in the `server` directory and add the following:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=your_neon_database_url
```

## Clone Repository

```bash
git clone https://github.com/yourusername/asset-management-system.git
```

## Backend

```bash
cd server
npm install
npm run dev
```

## Frontend

```bash
cd client
npm install
npm run dev
```

---

# 🔧 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

DB_NAME=asset_management
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
NODE_ENV=development

DATABASE_URL=postgresql://username:password@hostname/database?sslmode=require


```

For production, update:

```env
NODE_ENV=production
```

```

---

# 📚 Future Improvements

- Authentication (JWT)
- Role-Based Access
- Asset Image Upload
- Export to Excel / PDF
- QR Code for Assets
- Email Notifications
- Advanced Reports
- Dark Mode

---

# 👨‍💻 Author

**Your Name**

GitHub: https://github.com/karthick-codebase

---

# 📄 License

This project is licensed under the MIT License.
```
