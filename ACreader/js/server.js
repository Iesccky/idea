var http = require("http");
var fs = require("fs");
var url = require("url");
var querystring = require("querystring");

var com = require("./com.js");


http.createServer(function(req, res) {
	req.setEncoding("utf-8");
	
	// 地址url
	var pathname = url.parse(req.url).pathname;
	// 参数
	var params = url.parse(req.url).query;

	params = querystring.parse(params);
	
	switch(pathname) {
		case "/index":
		case "/work":
		case "/cartoon":
		case "/comics":
		case "/game":
			getdata(res, params);
			break;
		case "/detail":
			getdetail(res, params);
			break;
	}
}).listen(1206);

function getdata(response, params){
	http.request({
		hostname: "api.aixifan.com",
		port: "80",
		path: "/searches/channel?sort="+params.sort+"&pageNo="+params.pageNo+"&pageSize=15&recommendSize=6&channelIds="+params.channelIds,
		method: "GET",
		headers: {
			deviceType: 2
		}
	}, function(res) {
		var data = "";
		res.on("data", function(chunks) {
			data += chunks;
		})
		res.on("end", function() {
			response.end(params.callback+"("+data+")");
		})
	}).on("error", function(e) {
		console.log(e)
	}).end()
}

function getdetail(response, params){
	http.request({
		hostname: "api.aixifan.com",
		port: "80",
		path: "/contents/"+params.id,
		method: "GET",
		headers: {
			deviceType: 2
		}
	}, function(res) {
		var data = "";
		res.on("data", function(chunks) {
			data += chunks;
		})
		res.on("end", function() {
			// response.end(params.callback+"("+data+")");
			com.com(response, params, data )
		})
	}).on("error", function(e) {
		console.log(e)
	}).end()
}
