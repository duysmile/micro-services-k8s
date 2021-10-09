const { Router } = require('express');
const memberController = require('./controller');

const router = Router();

router.get('/members', memberController.getMembers);
router.post('/members', memberController.createMember);

module.exports = router;
