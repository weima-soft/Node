exports.NotFound = function (response, filename) {
	response.writeHead(404, "Not Found", {
		'Content-Type' : 'text/plain'
	});

	response.write("This request URL " + filename + " was not found on this server.");

	response.end();
}
