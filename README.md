🌟 Employee Attendance System — MERN Stack

A fully featured Employee & Manager Attendance Management System built using the MERN stack, offering secure authentication, role-based dashboards, calendar views, attendance analytics, and CSV reporting.

🚀 Features

👨‍💼 Employee Features
🔐 Register & Login
🕒 Mark Attendance (Check-In / Check-Out)
📅 Daily + Monthly Summary
📘 Attendance History (Table + Calendar)
👤 Profile Page
📊 Interactive Dashboard

🧑‍💼 Manager Features

🔐 Manager Login
📊 Dashboard with Team Statistics
👥 View All Employees Attendance
🔍 Filters: Date, Employee ID, Status
🏢 Department-wise Summary Chart
📈 Attendance Trend Line Graph
📅 Team Calendar View (Day-wise detailed attendance)
📤 Export Attendance Reports (CSV)

🏗️ Tech Stack

🎨 Frontend

⚛️ React
🧰 Redux Toolkit
⚡ Vite
🎨 Material UI (MUI)
📅 FullCalendar

🖥️ Backend

🟢 Node.js
🚏 Express.js
🍃 MongoDB + Mongoose
🔑 JWT Authentication
🔐 bcrypt.js

📂 Project Structure
attendance-app/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   └── server.js
│
└── frontend/
    ├── src/
    ├── pages/
    ├── components/
    └── vite.config.js

⚙️ Setup Instructions (Local Development)
1️⃣ Clone the Repository
git clone https://github.com/yourusername/attendance-app.git
cd attendance-app

🗄️ Backend Setup
2️⃣ Navigate to backend
cd backend

3️⃣ Install dependencies
npm install

4️⃣ Create .env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:5173

5️⃣ (Optional) Seed sample users & attendance
node seed/seed.js

6️⃣ Start backend server
npm start


Backend runs at → http://localhost:5000

🎨 Frontend Setup
7️⃣ Navigate to frontend
cd ../frontend

8️⃣ Install dependencies
npm install

9️⃣ Start frontend
npm run dev


Frontend runs at → http://localhost:5173

🌍 Environment Variables
🔧 Backend .env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=long_random_secret
CORS_ORIGIN=http://localhost:5173

🎨 Frontend .env
VITE_API_URL=https://your-backend-url.onrender.com/api

📸 Screenshots

🔐 Login Page
<img width="960" src="https://github.com/user-attachments/assets/b506e615-ebf4-4d4e-9118-9fd3ca17eac0">
👨‍💼 Employee Dashboard
<img width="960" src="https://github.com/user-attachments/assets/ce81e307-1ebb-4d2a-b2ca-fbcd18768b8e">
🧑‍💼 Manager Dashboard (Add screenshot)
📅 Team Calendar View (Add screenshot)

📝 API Endpoints Overview

🔐 AUTH
Method	Endpoint	Description
POST	/api/auth/register	Register User
POST	/api/auth/login	Login
GET	/api/auth/me	Get Logged-in User

👨‍💼 Employee Attendance
Method	Endpoint	Description
POST	/api/attendance/checkin	Check In
POST	/api/attendance/checkout	Check Out
GET	/api/attendance/my-history	My Attendance History
GET	/api/attendance/my-summary	Monthly Summary

🧑‍💼 Manager Attendance
Method	Endpoint	Description
GET	/api/attendance/all	All Employees Attendance
GET	/api/attendance/export	Export CSV
GET	/api/attendance/by-date/:date	Attendance by Date
GET	/api/attendance/calendar-summary	Month Summary

🔧 Seed Data Info

👥 6 Employees (EMP001–EMP007)
🧑‍💼 3 Managers
🗓️ 7 days sample attendance

🙌 Author

POLURU GEYAMRUTHA
Full-stack Developer
📧 Email: geyamruthapoluru@gmail.com

🌐 Portfolio: https://geyamrutha-lookbook.onrender.com

🔗 LinkedIn: https://www.linkedin.com/in/geyamrutha-poluru

💻 GitHub: https://github.com/geyamrutha16
