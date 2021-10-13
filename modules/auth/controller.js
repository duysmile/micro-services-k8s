const { postApi } = require('./helpers/call-api');

class AuthController {
    login(req, res, next) {
        return res.send('login');
    }

    async register(req, res, next) {
        const memberService = process.env.MEMBER_SERVICE;
        await postApi(`${memberService}/member/members`, req.body);
        return res.send('register');
    }

}

module.exports = new AuthController();
