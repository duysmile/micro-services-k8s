const createApp = require('./helpers/create_app');
const { connectMongo } = require('./helpers/connect_db');
const reportRouter = require('./router');

function apiLoader(app) {
    app.use(reportRouter);
}

async function run(db) {
    const app = createApp({
        apiLoader,
        db,
    });

    const port = process.env.PORT || 3003;
    app.listen(port, () => {
        console.log(`Server start at port ${port}`);
    });
}

connectMongo({
    url: process.env.MONGO_URL || 'mongodb://localhost:27017',
    database: process.env.MONGO_DB || 'report',
})
    .then(run)
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
