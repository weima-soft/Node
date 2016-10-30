var path = require('path');
var url = require('url');

var c_app = require('../config/appconfig.js');

exports.GetPath = function(request)
{
	var pathname = url.parse(request.url).pathname;
	if (pathname.slice(-1) === "/") {
		pathname = pathname + c_app.Welcome.file;
	}
	return path.join("./web", path.normalize(pathname.replace(/\.\./g, "")));
}

exports.GetExtension = function(filePath)
{
	var ext = path.extname(filePath);
	ext = ext ? ext.slice(1) : c_app.UnknownFilePath;
	
	return ext;
}