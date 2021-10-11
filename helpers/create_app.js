const express = require('express');

function createApp({
    options = {
        json: express.json(),
    },
    apiLoader = function(app) {

    },
    errorHandler = function(err, req, res, next) {
        return res.status(400).send(err.message);
    },
    serviceName = "",
    db,
}) {
    const app = express();

    // Use options as global middleware
    app.use(options.json);
    app.db = db;

    // Setup API
    app.get(`${serviceName}/ping`, (_, res) => res.send('pong'));
    apiLoader(app);

    // Use option as error handler
    app.use(errorHandler);

    return app;
}

module.exports = createApp;
