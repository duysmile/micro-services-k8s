class TaskController {
    createTask(req, res, next) {
        return res.send('create task');
    }

    getTasks(req, res, next) {
        return res.send('get tasks');
    }
}

module.exports = new TaskController();
