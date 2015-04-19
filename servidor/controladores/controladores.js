var user       = require('../modelos/modelos'),
	dataAccess = require('../accesoDatos/usuario');
/*
	*Send user to dataaccess
*/
module.exports.addUser = function(socket, message){
	var user   = message.msg;
	var pass   = message.msg2;
	dataAccess.saveUser(socket, user, pass);
};
/*
	*Get user from dataaccess
*/
module.exports.getUser = function(socket, message){
	var user = message.msg;
	dataAccess.getUser(socket, user);
};