const { Router } = require('express');
const taskController = require('./controller');

const router = Router();

router.get('/tasks', taskController.getTasks);
router.post('/tasks', taskController.createTask);

module.exports = router;
