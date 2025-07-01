const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


class AuthService {
    static async register(userData) {
        const { username, email, phone, password, role } = userData;

        // Check if email already exists
        const existing = await User.findOne({ where: { email } });
        if (existing) {
            throw new Error('Email đã tồn tại');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            username,
            email,
            phone,
            password: hashedPassword,
            role: role || 'user',
        });

        return {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
        };
    }
    static async loginUser(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error('Tài khoản không tồn tại');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Mật khẩu không đúng');
        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET || 'secret123', // luu trong env
            { expiresIn: '1h' }
          );
        return { token, email: user.email };
    }
}

module.exports = { loginUser : AuthService.loginUser, register: AuthService.register };

