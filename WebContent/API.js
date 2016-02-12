function indexToWidth(index) {
		//console.log(index * 4 + '%');
	  return index + '%';
}


function reinitialiser() {
	$('.carte_list').text("");
	$('.tpe_list').text("");
	$('.banque_list').text("");
}

var socket = new WebSocket("ws://192.168.43.233:8080/DemonetikWebService/websocketdemonetik");

socket.onmessage = function(event){
	  
	
	var msg = JSON.parse(event.data);
	console.log(msg);  
	  
	/* Réinitialisation */
	if(msg.numEtat == "0") {
		reinitialiser();
	}
	
	
	  switch(msg.type) {
	    case "Carte":
	  	  $('.carte_list').append("<li>" + msg.libelle + "</li>\n");
	      break;
	    case "TPE":
	  	  $('.tpe_list').append("<li>" + msg.libelle + "</li>\n");
	      break;
	    case "Banque":
	  	  $('.banque_list').append("<li>" + msg.libelle + "</li>\n");
	      break;
	  }
	  
	  
	  //Mise à jour de la barre de chargement
  		$('#BlueBar').css("width", indexToWidth(parseInt(msg.numEtat) * 20));

	 
};

socket.onopen = function(event) {
	console.log("Connecté à la socket");
	//socket.send("Bonjour !");
};

socket.onclose = function(event) {
	console.log("Fermeture de la socket.");
}




