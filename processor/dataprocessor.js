var p_mongo = require('./dbconnection.js');

exports.ListAll = function (categoryName, response) {
	p_mongo.Select(categoryName, {}, function (result) {
		processResult(response, result)
	});
}

exports.FindByCondition = function (categoryName, condition, response) {
	p_mongo.Select(categoryName, condition, function (result) {
		processResult(response, result)
	});
}

exports.CreateNew = function(data,response){
	p_mongo.Insert('tb2', data, function (result) {
		processResult(response,result);
	})
}

var processResult = function (response, result) {
	response.setHeader("Content-Type", "application/json");
	response.write(JSON.stringify(result));
	response.end();
}
