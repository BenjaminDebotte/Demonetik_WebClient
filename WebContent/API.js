var socket = new WebSocket("ws://192.168.43.233:8080/DemonetikWebService/websocketdemonetik");

socket.onmessage = function(event){
	  var msg = JSON.parse(event.data);
	  
	  
	  switch(msg.type) {
	    case "Carte":
	  	  $('.carte_list').append("<li>" + msg.text + "</li>\n");
	      break;
	    case "TPE":
	  	  $('.tpe_list').append("<li>" + msg.text + "</li>\n");
	      break;
	    case "Banque":
	  	  $('.banque_list').append("<li>" + msg.text + "</li>\n");
	      break;
	  }
	 
};

socket.onopen = function(event) {
	console.log("Connecté à la socket");
	//socket.send("Bonjour !");
};