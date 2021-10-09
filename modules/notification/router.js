const { Router } = require('express');
const notificationController = require('./controller');

const router = Router();

router.post('/notifications', notificationController.push);
router.post('/notifications/schedule', notificationController.schedule);

module.exports = router;
