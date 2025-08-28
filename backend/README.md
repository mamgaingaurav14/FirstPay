
# FirstPay API

A simple backend payment system that allows user account creation, balance management, and secure transactions between accounts.

---

## 🚀 Features
- User Registration & Login (with planned bcrypt password hashing)
- Account Balance Management
- Transaction Handling
- Future Support for:
  - Transaction Logging
  - Admin Log Audits

---

## 📂 Project Structure
```
firstpay-api/
│
├── db.js            # MongoDB connection & schema definitions
├── index.js         # Entry point for the application
├── routes/          # API routes
├── middleware.js    # auth middleware
└── README.md        # Documentation
```

---

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/mamgaingaurav14/firstpay-api.git
cd firstpay-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create `.env` File
Create a `.env` file in the root directory with the following content:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string?retryWrites=true&w=majority
JWT_SECRET=your_secret_key
```

### 4. Run the Server
```bash
npx nodemon index.js
```

---

## 📌 API Endpoints

### **User**
- `POST /api/user/signup` – Register a new user  
- `POST /api/user/signin` – Login existing user  

### **Account **
- `GET /api/account/balance` – Get account balance  
- `POST /api/account/transfer` – Transfer balance between accounts  

---

## 🛠 Tech Stack
- **Node.js** – Backend runtime
- **Express.js** – Web framework
- **MongoDB** – Database
- **Mongoose** – ODM for MongoDB
- **JWT** – Authentication
- **Nodemon** – Development server

---

## 📜 Future Enhancements
- **Password Hashing** using bcrypt
- **Transaction Logs** for all account activity
- **Admin Log Audit Panel**

---

## 🏆 Author
**Gaurav Mamgain**  
GitHub: [mamgaingaurav14](https://github.com/mamgaingaurav14)
