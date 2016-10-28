var http = require("http");
var url = require("url");
var querystring = require("querystring")

var com = function(response, args, datamsg ) {
	http.request({
		hostname: "www.acfun.tv",
		port: "80",
		path: "/comment/content/web/list?contentId="+args.id+"&pageNo=1&pageSize=20&cd=1&name=sanae",
		method: "GET"
	}, function(res) {
		var data = "";
		res.on("data", function(chunks) {
			data += chunks
		});
		res.on("end", function() {
			// response.end(params.callback+"("+data+")");
			var obj = {};
			var arr = data.split("=");

			var str = "{msg:" + datamsg +",com:"+ arr[1] +"}";

			// console.log(obj)

			response.end( args.callback+"("+str+")" )

		})
	}).on("error", function(e) {
		
	}).end()
}

exports.com = com;
