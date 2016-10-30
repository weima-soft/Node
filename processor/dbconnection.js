var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/test';

exports.Select = function (collectionName, where, callback) {
	MongoClient.connect(DB_CONN_STR, function (err, db) {
		console.log("Select: Connected to Database");
		var collection = db.collection(collectionName);
		collection.find(where).toArray(function (err, result) {
			if (err) {
				console.log('Error:' + err);
				return;
			}
			callback(result);
		});
	});
}

exports.Insert = function (collectionName, data, callback) {
	MongoClient.connect(DB_CONN_STR, function (err, db) {
		console.log("Insert: Connected to Database");
		var collection = db.collection(collectionName);
		collection.insert(data, function (err, result) {
			if (err) {
				console.log('Error insert:' + err);
				return;
			}
			callback(result);
		});
	})
}
