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
	if(msg.etat.numEtat == "0") {
		reinitialiser();
	}
	
	
	  switch(msg.etat.type) {
	    case "Carte":
	  	  $('.carte_list').append("<li>" + msg.etat.labelEtat + "</li>\n");
	      break;
	    case "TPE":
	  	  $('.tpe_list').append("<li>" + msg.etat.labelEtat + "</li>\n");
	      break;
	    case "Banque":
	  	  $('.banque_list').append("<li>" + msg.etat.labelEtat + "</li>\n");
	      break;
	  }
	  
	  
	  //Mise à jour de la barre de chargement
  		$('#BlueBar').css("width", indexToWidth(parseInt(msg.etat.numEtat) * (100 / 8)));

	 
};

socket.onopen = function(event) {
	console.log("Connecté à la socket");
};

socket.onclose = function(event) {
	console.log("Fermeture de la socket.");
}

socket.onerror = function(event) {
	$('.container').append("<div class=\"alert alert-danger\" role=\"alert\">Une erreur est survenue avec la WebSocket.</div>");
}



