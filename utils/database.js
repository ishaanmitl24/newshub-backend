const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoclient = (callback) => {
  MongoClient.connect(
    "mongodb+srv://alpha:alpha@cluster0.yswgde5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((client) => {
      callback(client);
      _db = client.db();
      console.log("Connected");
    })
    .catch((err) => {
      console.log("Database not connected!");
      throw new Error(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database connected";
};

exports.mongoclient = mongoclient;
exports.getDb = getDb;
