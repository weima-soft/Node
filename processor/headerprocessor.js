var path = require('path');

var c_app = require('../config/appconfig.js');
var c_mime = require('../config/mimeconfig.js').MimeType;

var extensionHandler = function(filePath)
{
	var ext = path.extname(filePath);
	ext = ext ? ext.slice(1) : 'unknown';
	
	return ext;
}
exports.ExtensionHandler = extensionHandler;

exports.CommonHeaderHandler = function (filePath,stats,request,response) {
	var ext = extensionHandler(filePath);
	var contentType = c_mime[ext] || "text/plain";
	response.setHeader("Content-Type", contentType);

	var lastModified = stats.mtime.toUTCString();
	var ifModifiedSince = "If-Modified-Since".toLowerCase();
	response.setHeader("Last-Modified", lastModified);

	if (ext.match(c_app.Expires.fileMatch)) {
		var expires = new Date();
		expires.setTime(expires.getTime() + c_app.Expires.maxAge * 1000);
		response.setHeader("Expires", expires.toUTCString());
		response.setHeader("Cache-Control", "max-age=" + c_app.Expires.maxAge);
	}
	if (request.headers[ifModifiedSince] && lastModified == request.headers[ifModifiedSince]) {
		response.writeHead(304, "Not Modified");
		response.end();
		console.log("File" + filePath + " not modified, no need refresh")
		return true;
	}
		
	return false;
}