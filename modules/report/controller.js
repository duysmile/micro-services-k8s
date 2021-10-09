class ReportController {
    createReport(req, res, next) {
        return res.send('create report');
    }

    getReports(req, res, next) {
        return res.send('get report');
    }
}

module.exports = new ReportController();
