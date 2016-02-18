var config = {};

config.webservice = {};
config.webservice.ip = "192.168.43.233";
config.webservice.port = 8080;	
config.webservice.name = "DemonetikWebService";

config.websocket = {};
config.websocket.name = "websocketdemonetik";
config.websocket.address = "ws://" + config.webservice.ip + ":" + config.webservice.port +
							"/" + config.webservice.name + "/" + config.websocket.name;
