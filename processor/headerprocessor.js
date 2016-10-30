var c_app = require('../config/appconfig.js');
var c_mime = require('../config/mimeconfig.js').MimeType;

var p_util = require('./utilprocessor.js');

exports.CommonHeaderHandler = function (filePath,stats,request,response) {
	var ext = p_util.GetExtension(filePath);
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
		return true;
	}
		
	return false;
}