const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
};

exports.register = async (req, res) => {
    const { name, email, password, role, employeeId, department } = req.body;
    console.log('=== REGISTER ATTEMPT ===');
    console.log('Request body:', req.body);

    try {
        if (!name || !email || !password || !employeeId || !department) {
            console.log('❌ MISSING REQUIRED FIELDS:', {
                name: !!name,
                email: !!email,
                password: !!password,
                employeeId: !!employeeId,
                department: !!department
            });
            return res.status(400).json({ message: 'All fields are required' });
        }

        console.log('📧 Checking if email exists:', email);
        let user = await User.findOne({ email });
        if (user) {
            console.log('❌ EMAIL ALREADY EXISTS:', email);
            return res.status(400).json({ message: 'Email already exists' });
        }

        console.log('🆔 Checking if employeeId exists:', employeeId);
        user = await User.findOne({ employeeId });
        if (user) {
            console.log('❌ EMPLOYEE ID ALREADY EXISTS:', employeeId);
            return res.status(400).json({ message: 'Employee ID already exists' });
        }

        console.log('🔐 Hashing password...');
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        console.log('💾 Creating user in database...');
        user = await User.create({
            name,
            email,
            password: hashed,
            role: role || 'employee',
            employeeId,
            department
        });

        console.log('✅ USER CREATED SUCCESSFULLY:', user.email);

        const token = generateToken(user);
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.log('💥 REGISTRATION ERROR:', err);
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        console.log('=== LOGIN ATTEMPT ===');
        console.log('Request body:', req.body);

        const { email, password } = req.body;

        if (!email || !password) {
            console.log('❌ MISSING EMAIL OR PASSWORD');
            return res.status(400).json({ message: 'Email and password are required' });
        }

        console.log('📧 Looking for user in database:', email);

        const user = await User.findOne({ email });
        console.log('🔍 User search result:', user ? 'User found' : 'User NOT found');

        if (!user) {
            console.log('❌ USER NOT FOUND IN DATABASE');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log('✅ User found, checking password...');
        console.log('🔑 Provided password:', password);
        console.log('💾 Stored hash:', user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('🔐 Password match result:', isMatch);

        if (!isMatch) {
            console.log('❌ PASSWORD MISMATCH');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log('🎉 LOGIN SUCCESSFUL for:', email);

        const token = generateToken(user);
        console.log('🔐 Token generated successfully');

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.log('💥 LOGIN ERROR:', err);
        res.status(500).json({ message: err.message });
    }
};

exports.me = async (req, res) => {
    res.json(req.user);
};

exports.updateProfile = async (req, res) => {
    try {
        const user = req.user;
        const updates = req.body;

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(user._id, updates, {
            new: true,
        });

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};