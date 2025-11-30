const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

connectDB(process.env.MONGO_URI);

app.get('/', (req, res) => res.send('Attendance API'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/dashboard', require('./routes/dashboard'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
