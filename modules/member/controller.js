class MemberController {
    createMember(req, res, next) {
        return res.send('create member');
    }

    getMembers(req, res, next) {
        return res.send('get members');
    }
}

module.exports = new MemberController();
