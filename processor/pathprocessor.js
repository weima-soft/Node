var url = require('url');
var fs = require('fs');
var path = require('path');
var zlib = require('zlib');

var c_app = require('../config/appconfig.js');


var p_error = require('./errorprocessor.js');
var p_header = require('./headerprocessor.js');

exports.staticResources = function (request, response) {
	var pathname = url.parse(request.url).pathname;
	if (pathname.slice(-1) === "/") {
		pathname = pathname + c_app.Welcome.file;
	}
	var realPath = path.join("./web", path.normalize(pathname.replace(/\.\./g, "")));

	pathHandler(realPath,request, response);
}

var fileHandler = function (path,request, response) {
	var ext = p_header.ExtensionHandler(path);
	
	var raw = fs.createReadStream(path);
	var acceptEncoding = request.headers['accept-encoding'] || "";
	var matched = ext.match(c_app.Compress.match);
	if (matched && acceptEncoding.match(/\bgzip\b/)) {
		response.writeHead(200, "Ok", {
			'Content-Encoding' : 'gzip'
		});
		raw.pipe(zlib.createGzip()).pipe(response);
	} else if (matched && acceptEncoding.match(/\bdeflate\b/)) {
		response.writeHead(200, "Ok", {
			'Content-Encoding' : 'deflate'
		});
		raw.pipe(zlib.createDeflate()).pipe(response);
	} else {
		response.writeHead(200, "Ok");
		raw.pipe(response);
	}
}

var pathHandler = function (path,request, response) {
	fs.stat(path, function (err, stats) {
		if (err) {
			p_error.NotFound(response, path);
		} else {
			if (stats.isDirectory()) {
				path = path.join(path, "/", c_app.Welcome.file);
				pathHandler(path,request, response);
			} else {
				var useCached = p_header.CommonHeaderHandler(path,stats,request, response);
				
				if(!useCached) fileHandler(path,request, response);
			}
		}
	});
};
