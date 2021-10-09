class NotificationController {
    push(req, res, next) {
        return res.send('push noti');
    }

    schedule(req, res, next) {
        return res.send('schedule noti');
    }
}

module.exports = new NotificationController();
