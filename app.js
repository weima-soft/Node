var http = require('http');

var c_app = require('./config/appconfig.js');
var p_path = require('./processor/pathprocessor.js');
var p_log = require('./processor/logprocessor.js');

var p_data = require('./processor/dataprocessor.js');

var server = http.createServer(function (request, response) {
		if (request.method === 'POST') {
			var postData = "";
			request.on("data", function (data) {
				postData += data;
			});
			request.on('end', function () {
				p_data.Process(request.url, JSON.parse(postData), response);
			});
		} else {
			p_path.staticResources(request, response);
		}
	});

server.listen(c_app.ServerPort);

p_log.log("Server launched in port:" + c_app.ServerPort);
