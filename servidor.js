//dependencias de la aplicacion
require('./servidor/modelos/mensaje');
var express       = require("express"),
    app           = express(),
    server        = require('http').createServer(app),
    bodyParser    = require('body-parser'),
    controller    = require('./servidor/controladores/controladores.js'),
    io            = require('socket.io').listen(server);  


app.use(bodyParser.urlencoded({ 
	extended: false 
}));
app.use(bodyParser.json());

//recibe una solicitud y envia la pagina por defecto como respuesta
app.get('/', function(req, res){
	res.sendFile(__dirname + '/cliente/vistas/index.html');
});

app.use('/', express.static(__dirname + '/cliente/'));

server.listen(3000, function(){
	console.log('Listening at port 3000...');
})
//lista de clientes conectados
clients = [];
//manejo de los clientes y sus peticiones
io.sockets.on('connection', function(socket){	
	socket.on('SOLICITUDE', function(message){

		if(message.msgType == 'connected'){
           clients.push(message.msg);
           socket.username = message.msg;
        }
        if(message.msgType == 'saveUser'){
            controller.addUser(socket, message);
        }
        if(message.msgType == 'getUser'){
           controller.getUser(socket, message);
        }
	});
	
	socket.on('disconnect', function(code, reason){
		if(!socket.username){
			return;
		}
		if(clients.indexOf(socket.username) > -1){
			clients.splice(clients.indexOf(socket.username), 1);
		}
		console.log('Online username are:' + clients);
	});	
});
