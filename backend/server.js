const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

const morgan = require('morgan');
dotenv.config();

const allowedOrigins = [
    "http://localhost:5173",                  // local frontend (Vite)
    "http://localhost:3000",                  // optional
    process.env.CORS_ORIGIN,                  // Render frontend URL
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("CORS blocked: " + origin));
            }
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(morgan('dev'));

connectDB(process.env.MONGO_URI);

app.get('/', (req, res) => res.send('Attendance API'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/dashboard', require('./routes/dashboard'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
