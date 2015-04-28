var user       = require('../modelos/modelos'),
	dataAccess = require('../accesoDatos/usuario');

//enviar usuario, password a la capa de acceso a datos para guardar
module.exports.saveUser = function(socket, message){
	var user; 
	var pass;
	for(var i = 0; i < message.msg.length; i++){
	    user = message.msg[i].username;
	    pass = message.msg[i].password;
	}
	dataAccess.saveUser(socket, user, pass);
};
//enviar usuario a la capa de acceso a datos para validar
module.exports.logIn = function(socket, message){
	var user;
	var pass;
	for(var i = 0; i < message.msg.length; i++){
	    user = message.msg[i].username;
	    pass = message.msg[i].password;
	}
	dataAccess.logIn(socket, user, pass);
};

//obtener la historia de mensajes
module.exports.allNotes = function(socket){
	dataAccess.historyNotes(socket);
};


//obtener la historia de mensajes
module.exports.allMessages = function(socket, message){
	var user = message.msg;
	dataAccess.historyMessages(socket, user);
};
//enviar el mensaje a la capa de acceso a datos
module.exports.sendNote = function(socket, message){
	var autor;
	var texto;
	for(var i = 0; i < message.msg.length; i++){
		autor = message.msg[i].autor;
	    texto = message.msg[i].texto;
	}
	dataAccess.saveNote(socket, autor, texto);
};
/*
	*Send message from dataaccess
*/
module.exports.sendMessage = function(socket, message, users){
	var receptors = [];
	var emisor;
	var privateMessage;
	for(var i = 0; i < message.msg.length; i++){
		emisor         = message.msg[i].emisor;
	    privateMessage = message.msg[i].texto;
	}

	for(var i = 0; i < users.length; i++){
	    if(emisor != users[i]){
	    	receptors.push(users[i]);
	    }
	} 
	dataAccess.saveMessage(emisor, receptors, privateMessage);
	socket.broadcast.emit('RESPONSE', message);
};