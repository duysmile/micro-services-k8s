class AuthController {
    login(req, res, next) {
        return res.send('login');
    }

    register(req, res, next) {
        return res.send('register');
    }
}

module.exports = new AuthController();
