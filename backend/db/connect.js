const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  console.log('MongoDB Connection String:', process.env.MONGO_URL); // Debugging statement
  MongoClient.connect(process.env.MONGO_URL)
    .then((client) => {
      _db = client.db(process.env.DB_NAME); // Select specific database
      console.log(`Connected to database: ${process.env.DB_NAME}`); // Debugging statement
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
