# Project Setup and Execution Instructions

## 🔧 System Requirements
- **Node.js**: v22.9.0  
- **npm**: v10.8.3  

---

## 📦 Step 1: Install Dependencies

To install all necessary Node.js packages, run the following command:

```bash
npm install
```

---

## 🚀 Step 2: Start the Application

To start the Node.js server:

```bash
node server.js
```

---

## 🗄️ Step 3: Database Configuration

Ensure MySQL is running and configured as follows:

1. Create a database named:

   ```
   test
   ```

2. Use the following credentials to access the database:

   - **Username**: `root`
   - **Password**: `123123`

3. Reference `.env` variables:

   ```
   PORT        = 3000
   DB_HOST     = localhost
   DB_USER     = root
   DB_PASSWORD = 123123
   DB_NAME     = test
   ```

---

## 🧪 Step 4: API Usage

### ✅ Create Tables and Insert Sample User Data

Use this endpoint to create the necessary tables and insert sample data:

- **Method**: `GET`  
- **Endpoint**: `http://0.0.0.0:3000/insert`

### 📄 Fetch User Data by ID

To Retrieve all the users details

- **Method**: `GET`  
- **Endpoint**: `http://0.0.0.0:3000/users`

To Retrieve a specific user's full details by ID:

- **Method**: `GET`  
- **Endpoint**: `http://0.0.0.0:3000/users?id=1`

Replace `1` with any other user ID as needed.