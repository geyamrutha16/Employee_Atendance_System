<h1 align="center">🌟 Employee Attendance System — MERN Stack</h1>

<p align="center">
A fully featured <b>Employee & Manager Attendance Management System</b> built using the <b>MERN stack</b>, offering secure authentication, analytics, dashboards, calendars, and CSV reporting.
</p>

<hr/>

<h2>🚀 Features</h2>

<h3>👨‍💼 Employee Features</h3>
<ul>
  <li>🔐 Register & Login</li>
  <li>🕒 Mark Attendance (Check-In / Check-Out)</li>
  <li>📅 Daily + Monthly Summary</li>
  <li>📘 Attendance History (Table + Calendar)</li>
  <li>👤 Profile Page</li>
  <li>📊 Interactive Dashboard</li>
</ul>

<h3>🧑‍💼 Manager Features</h3>
<ul>
  <li>🔐 Manager Login</li>
  <li>📊 Dashboard with Team Statistics</li>
  <li>👥 View All Employees Attendance</li>
  <li>🔍 Filters: Date, Employee ID, Status</li>
  <li>🏢 Department-wise Summary Chart</li>
  <li>📈 Attendance Trend Line Graph</li>
  <li>📅 Team Calendar View</li>
  <li>📤 Export Attendance Reports (CSV)</li>
</ul>

<hr/>

<h2>🏗️ Tech Stack</h2>

<h3>🎨 Frontend</h3>
<ul>
  <li>⚛️ React</li>
  <li>🧰 Redux Toolkit</li>
  <li>⚡ Vite</li>
  <li>🎨 Material UI (MUI)</li>
  <li>📅 FullCalendar</li>
</ul>

<h3>🖥 Backend</h3>
<ul>
  <li>🟢 Node.js</li>
  <li>🚏 Express.js</li>
  <li>🍃 MongoDB + Mongoose</li>
  <li>🔐 JWT Authentication</li>
  <li>🔑 bcrypt.js</li>
</ul>

<hr/>

<h2>📂 Project Structure</h2>

<pre>
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
</pre>

<hr/>

<h2>⚙️ Setup Instructions (Local Development)</h2>

<h3>1️⃣ Clone the Repository</h3>
<pre>
git clone https://github.com/yourusername/attendance-app.git
cd attendance-app
</pre>

<h2>🗄 Backend Setup</h2>

<h3>2️⃣ Navigate to backend</h3>
<pre>cd backend</pre>

<h3>3️⃣ Install dependencies</h3>
<pre>npm install</pre>

<h3>4️⃣ Create .env</h3>
<pre>
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:5173
</pre>

<h3>5️⃣ (Optional) Seed sample users</h3>
<pre>node seed/seed.js</pre>

<h3>6️⃣ Start backend</h3>
<pre>npm start</pre>

<p>Backend runs at → <b>http://localhost:5000</b></p>

<hr/>

<h2>🎨 Frontend Setup</h2>

<h3>7️⃣ Navigate to frontend</h3>
<pre>cd ../frontend</pre>

<h3>8️⃣ Install dependencies</h3>
<pre>npm install</pre>

<h3>9️⃣ Start frontend</h3>
<pre>npm run dev</pre>

<p>Frontend runs at → <b>http://localhost:5173</b></p>

<hr/>

<h2>🌍 Environment Variables</h2>

<h3>🔧 Backend .env</h3>
<pre>
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=long_random_secret
CORS_ORIGIN=http://localhost:5173
</pre>

<h3>🎨 Frontend .env</h3>
<pre>
VITE_API_URL=https://your-backend-url.onrender.com/api
</pre>

<hr/>

<h2>📸 Screenshots</h2>

<h3>🔐 Login Page</h3>
<img width="960" height="472" alt="image" src="https://github.com/user-attachments/assets/0c2d269e-5b2e-4c4a-bd65-bd449fad15e8" />

<h3>👨‍💼 Employee Dashboard</h3>
<img width="960" src="https://github.com/user-attachments/assets/ce81e307-1ebb-4d2a-b2ca-fbcd18768b8e"/>

<h3>🧑‍💼 Manager Dashboard</h3>
<img width="960" alt="image" src="https://github.com/user-attachments/assets/9f1eefb0-7cf6-45dd-addf-be7540888cde" />

<h3>📅 Team Calendar</h3>
<img width="960" alt="image" src="https://github.com/user-attachments/assets/0a0a5e75-1a8e-4005-8765-43d518ecfaca" />

<hr/>

<h2>📝 API Endpoints Overview</h2>

<h3>🔐 AUTH</h3>
<table>
<tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
<tr><td>POST</td><td>/api/auth/register</td><td>Register User</td></tr>
<tr><td>POST</td><td>/api/auth/login</td><td>Login</td></tr>
<tr><td>GET</td><td>/api/auth/me</td><td>Get Logged-in User</td></tr>
</table>

<h3>👨‍💼 Employee Attendance</h3>
<table>
<tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
<tr><td>POST</td><td>/api/attendance/checkin</td><td>Check In</td></tr>
<tr><td>POST</td><td>/api/attendance/checkout</td><td>Check Out</td></tr>
<tr><td>GET</td><td>/api/attendance/my-history</td><td>My Attendance History</td></tr>
<tr><td>GET</td><td>/api/attendance/my-summary</td><td>Monthly Summary</td></tr>
</table>

<h3>🧑‍💼 Manager Attendance</h3>
<table>
<tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
<tr><td>GET</td><td>/api/attendance/all</td><td>All Employees Attendance</td></tr>
<tr><td>GET</td><td>/api/attendance/export</td><td>Export CSV</td></tr>
<tr><td>GET</td><td>/api/attendance/by-date/:date</td><td>Attendance by Date</td></tr>
<tr><td>GET</td><td>/api/attendance/calendar-summary</td><td>Monthly Summary</td></tr>
</table>

<hr/>

<h2>🔧 Seed Data Info</h2>
<ul>
  <li>👥 6 Employees (EMP001–EMP007)</li>
  <li>🧑‍💼 3 Managers</li>
  <li>🗓️ 7 days sample attendance</li>
</ul>

<hr/>

<h2>🙌 Author</h2>

<b>POLURU GEYAMRUTHA</b>  
<br/>Full-stack Developer  

<p>College Name : Narayana Engineering College, Gudur</p>

<p>
📧 Email: <a href="mailto:geyamruthapoluru@gmail.com">geyamruthapoluru@gmail.com</a><br/>
🌐 Portfolio: <a href="https://geyamrutha-lookbook.onrender.com">https://geyamrutha-lookbook.onrender.com</a><br/>
🔗 LinkedIn: <a href="https://www.linkedin.com/in/geyamrutha-poluru">linkedin.com/in/geyamrutha-poluru</a><br/>
💻 GitHub: <a href="https://github.com/geyamrutha16">github.com/geyamrutha16</a>
</p>
