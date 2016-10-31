var p_mongo = require('./dbconnection.js');

exports.Process = function (url, data, response) {
	for (var categoryName in data) {
		if (url === "/select") {
			findByCondition(categoryName, data[categoryName], response);
		} else if (url === "/insert") {
			createNew(categoryName, data[categoryName], response)
		} else {
			//
		}
	}
}

var findByCondition = function (categoryName, condition, response) {
	p_mongo.Select(categoryName, condition, function (result) {
		processResult(response, result)
	});
}

var createNew = function (categoryName, data, response) {
	p_mongo.Insert(categoryName, data, function (result) {
		processResult(response, result);
	})
}

var processResult = function (response, result) {
	response.setHeader("Content-Type", "application/json");
	response.write(JSON.stringify(result));
	response.end();
}
