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
module.exports.allMessages = function(socket, message){
	var user = message.msg;
	dataAccess.historyMessages(socket, user);
};
/*
	*Get user from dataaccess
*/
module.exports.getUser = function(socket, message){
	var user = message.msg;
	dataAccess.getUser(socket, user);
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