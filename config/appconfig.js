exports.ServerPort = 8306;

exports.UnknownFilePath = "unknown";

exports.Expires = {

    fileMatch: /^(gif|png|jpg|js|css)$/ig,

    maxAge: 60*60*24*365

};

exports.Compress = {

    match: /css|js|html/ig

};

exports.Welcome = {

    file: "index.html"

};