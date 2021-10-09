const { MongoClient } = require('mongodb');

exports.connectMongo = async ({
    url,
    database,
    options = {},
}) => {
    // const mongoClient = new MongoClient(url, {
    //     useUnifiedTopology: true,
    //     ...options,
    // });

    // const db = mongoClient.db(database);
    // return mongoClient.connect().then(() => db);
    return database;
};
