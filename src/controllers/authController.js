const AuthService = require('../services/authService');

class AuthController {
    static async register(req, res) {
        try {
            const result = await AuthService.register(req.body);
            res.status(201).json({ message: 'Đăng ký thành công', user: result });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const token = await AuthService.loginUser(email, password);
            res.status(200).json({ message: 'Đăng nhập thành công', token });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = {login: AuthController.login, register: AuthController.register};
