/* ################################################################################################# */
/* ######################## C O N F I G U R A T I O N ############################################## */
/* ################################################################################################# */


var config = {};

config.webservice = {};
config.websocket = {};
config.scenario = {};



//Configuration autour du scénario
config.scenario.step_count = 7;						//Nombres d'étapes dans la cinématique

//Configuration du WebServices
config.webservice.ip = "192.168.43.233"; 			//IP du WebService
config.webservice.port = 8080;						//Port du WebService
config.webservice.name = "DemonetikWebService";		//Nom du WebService

//Configuration de la WebSocket
config.websocket.name = "websocketdemonetik";		//Nom de la socket
config.websocket.address = "ws://" + config.webservice.ip + ":" + config.webservice.port +
							"/" + config.webservice.name + "/" + config.websocket.name;
config.websocket.alertTimeOut = 3500;				//Timeout des alertes

/* ################################################################################################# */
/* ################################################################################################# */
/* ################################################################################################# */
/* ################################################################################################# */


function indexToWidth(index) {
		//console.log(index * 4 + '%');
	  return index + '%';
}


function decode_utf8(s) {
  return decodeURIComponent(escape(s));
}

function includeJS(incFile)
{
   document.write('<script type="text/javascript" src="'+ incFile+ '"></script>');
}

function reinitialiser() {
	$('.carte_list').text("");
	$('.tpe_list').text("");
	$('.banque_list').text("");
	
	$('#BlueBar').css("width", indexToWidth(0));
	$('#GreenBar').css("width", indexToWidth(0));
	$('#RedBar').css("width", indexToWidth(0));
}

var socket = new WebSocket(config.websocket.address);
$('.footer').append("<div class=\"col-md-6 col-md-offset-3 alert alert-info \" role=\"alert\">Connexion à la socket " + config.websocket.address + " .</div>");

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
		content += "<p class=\"list-group-item-text\"> Montant reçu : " + msg.montant + "€</p>";
	}
	
	if(msg.hasOwnProperty("porteurTransaction")) {
		content += "<p class=\"list-group-item-text\"> Prénom : " + msg.porteurTransaction.prenom + "</p>";
		content += "<p class=\"list-group-item-text\"> Nom : " + msg.porteurTransaction.nom + "</p>";
		content += "<p class=\"list-group-item-text\"> Numéro Carte : " + msg.porteurTransaction.numCarte + "</p>";
	}
	
	if(msg.hasOwnProperty("pin")) {
		var enciphered_pin = (Math.abs(msg.pin)).toString(16).toUpperCase();
		while(enciphered_pin.length < 8 ) enciphered_pin = "0" + enciphered_pin;
		content += "<p class=\"list-group-item-text\"> PIN Chiffré : [" + enciphered_pin + "]</p>";
	}
	
	if(msg.hasOwnProperty("resultat")) {
		content += "<p class=\"list-group-item-text\"> Résultat : " + (msg.resultat == 1 ? "Autorisé" : "Refusé") + "</p>";
	}
	
	
	content += "\n</li>\n";

	  
	//Mise à jour de la barre de chargement
	var percent = parseInt(msg.numEtat) * (100 / config.scenario.step_count);
	if(percent < 100){
		$('#BlueBar').css("width", indexToWidth(percent));
	} else {
		$('#BlueBar').css("width", indexToWidth(0));
		$('#GreenBar').css("width", indexToWidth(100));
	}

	$(columnClass).append(content);
	
};

function clearAlerts() {
	$('.footer').html("");
}

socket.onopen = function(event) {
	console.log("Connecté à la socket");
	$('.footer').append("<div class=\"col-md-6 col-md-offset-3 alert alert-success \" role=\"alert\">Connexion à la socket réussie.</div>");
	window.setTimeout(clearAlerts,config.websocket.alertTimeOut);
};

socket.onclose = function(event) {
	console.log("Fermeture de la socket.");
	$('.footer').append("<div class=\"col-md-6 col-md-offset-3 alert alert-info \" role=\"alert\">Fermeture de la socket.</div>");
	window.setTimeout(clearAlerts,config.websocket.alertTimeOut);
}

socket.onerror = function(event) {
	$('.footer').append("<div class=\"col-md-6 col-md-offset-3 alert alert-danger\" role=\"alert\">Une erreur est survenue lors de la connexion avec la WebSocket.</div>");
	window.setTimeout(clearAlerts,config.websocket.alertTimeOut);
}



