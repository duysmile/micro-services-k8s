const { Router } = require('express');
const reportController = require('./controller');

const router = Router();

router.get('/reports', reportController.getReports);
router.post('/reports', reportController.createReport);

module.exports = router;
