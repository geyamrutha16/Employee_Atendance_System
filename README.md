📌 Employee Attendance System

A complete MERN-based attendance tracking system with separate Employee and Manager dashboards.

🚀 Features

👨‍💼 Employee

Register & Login
Mark Attendance (Check-In / Check-Out)
Daily status tracking
Monthly summary (Present/Absent/Late/Hours)
Attendance history (table + calendar)
Profile page
Interactive dashboard

🧑‍💼 Manager

Login
Dashboard with team stats
View all employees attendance
Filters: date, employee, status
Department summary
Attendance trend chart
Export CSV Reports
Team Calendar View (day wise details)

[🏗️ Tech Stack

Frontend
React
Redux Toolkit
Vite
MUI
FullCalendar
Backend
Node.js
Express.js
MongoDB (Mongoose ORM)
JWT Authentication
bcrypt

📂 Project Structure
attendance-app/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── seed/
│   └── server.js
│
└── frontend/
    ├── src/
    ├── components/
    ├── pages/
    └── vite.config.js](https://github.com/geyamrutha16)

⚙️ Setup Instructions (Local)
1️⃣ Clone Repository
git clone https://github.com/yourusername/attendance-app.git
cd attendance-app

🗄️ Backend Setup
2️⃣ Go to backend
cd backend

3️⃣ Install dependencies
npm install

4️⃣ Create .env file
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:5173

5️⃣ Seed sample data (Optional)
node seed/seed.js

6️⃣ Start server
npm start


Backend running at:
👉 http://localhost:5000

🎨 Frontend Setup
7️⃣ Go to frontend
cd ../frontend

8️⃣ Install dependencies
npm install

9️⃣ Start frontend
npm run dev


Frontend running at:
👉 http://localhost:5173

🌍 Environment Variables

Create .env inside backend:

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=long_random_secret
CORS_ORIGIN=http://localhost:5173


For frontend, create .env:

VITE_API_URL=https://your-backend-url.onrender.com/api

🚀 Deployment Guide
⭐ Backend (Render – Web Service)

Root Directory: ./backend

Build Command: npm install

Start Command: node server.js

Environment Variables: (same as local)

⭐ Frontend (Render – Static Site)

Root Directory: ./frontend

Build Command:

npm install && npm run build


Publish Directory:

dist

📸 Screenshots
🔐 Login Page
👨‍💼 Employee Dashboard
🧑‍💼 Manager Dashboard
📅 Team Calendar View
📝 API Endpoints Overview

Auth
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login
GET	/api/auth/me	Get logged-in user
Employee Attendance
Method	Endpoint	Description
POST	/api/attendance/checkin	Check In
POST	/api/attendance/checkout	Check Out
GET	/api/attendance/my-history	History
GET	/api/attendance/my-summary	Monthly summary
Manager Attendance

| GET | /api/attendance/all | All employees |
| GET | /api/attendance/export | Download CSV |
| GET | /api/attendance/by-date/:date | Day-wise detail |
| GET | /api/attendance/calendar-summary | Monthly calendar view |

🧪 Seed Data Info

Users created:

6 employees (EMP001–EMP007)

3 managers

7 days sample attendance

🙌 Author

POLURU GEYAMRUTHA
Full-stack Developer
📧 geyamruthapoluru@gmail.com
https://geyamrutha-lookbook.onrender.com/
https://www.linkedin.com/in/geyamrutha-poluru/
https://github.com/geyamrutha16
