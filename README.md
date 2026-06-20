# Bookstore RESTful API

A robust, enterprise-grade RESTful API built with Node.js, Express, and MongoDB to manage a bookstore inventory. This project implements full CRUD functionality, global error handling, data persistence, schema validations, and advanced filtering capabilities.

## 🚀 Features Implemented
- **Full CRUD Operations**: Create, Read, Update, and Delete book entries.
- **Data Validation & Security**: Incoming requests are validated using `express-validator` to ensure data integrity.
- **Advanced Query Filters (Bonus Challenge)**: Case-insensitive search functionality across book titles and authors.
- **Pagination (Bonus Challenge)**: Automated dataset pagination with custom metadata output parameters (`totalBooks`, `currentPage`, `totalPages`).
- **Production-Safe Error Handling**: Catches invalid database ObjectIDs and operational errors safely.

## 🛠️ Tech Stack
- **Runtime Environment**: Node.js
- **Backend Framework**: Express.js
- **Database**: MongoDB Atlas (Cloud)
- **Object Data Modeling (ODM)**: Mongoose
- **Input Validation**: Express-Validator
- **Development Tooling**: Nodemon, Dotenv

---

## 💻 Local Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/AliFaizan-git/bookstore-api
cd bookstore-api