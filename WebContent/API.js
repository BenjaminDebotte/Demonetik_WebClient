function indexToWidth(index) {
		//console.log(index * 4 + '%');
	  return index + '%';
}


function decode_utf8(s) {
  return decodeURIComponent(escape(s));
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
	
	var columnClass;
	var content = "";
	

	switch(msg.type) {
	    case "Carte":
	    	columnClass = ".carte_list";
		    break;
	    case "TPE":
	    	columnClass = ".tpe_list";
		    break;
	    case "Banque":
	    	columnClass = ".banque_list";
		    break;
	  }
	
	content += "<li class=\"list-group-item\">\n";
	
	content += "<h5 class=\"list-group-item-heading\">\n";
	content += decode_utf8(msg.labelEtat);
	content += "  <span class=\"glyphicon glyphicon-ok-circle\" style=\"color: green; float: right;\"></span>";

	content += "\n</h5>\n";

	
	/* Gestion des propriétés ponctuelles */
	
	if(msg.hasOwnProperty("montant")) {
		content += "<p class=\"list-group-item-text\"> Montant reçu : " + msg.montant + "</p>";
	}
	
	if(msg.hasOwnProperty("porteurTransaction")) {
		content += "<p class=\"list-group-item-text\"> Prénom : " + msg.porteurTransaction.prenom + "</p>";
		content += "<p class=\"list-group-item-text\"> Nom : " + msg.porteurTransaction.nom + "</p>";
		content += "<p class=\"list-group-item-text\"> Numéro Carte : " + msg.porteurTransaction.numCarte + "</p>";
	}
	
	if(msg.hasOwnProperty("pin")) {
		content += "<p class=\"list-group-item-text\"> PIN : " + msg.pin + "</p>";
	}
	
	if(msg.hasOwnProperty("resultat")) {
		content += "<p class=\"list-group-item-text\"> Résultat : " + (msg.resultat == 1 ? "Autorisé" : "Refusé") + "</p>";
	}
	
	
	content += "\n</li>\n";

	  
	//Mise à jour de la barre de chargement
	$('#BlueBar').css("width", indexToWidth(parseInt(msg.numEtat) * (100 / 7)));

	 
	$(columnClass).append(content);
	
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



