//dependencias de la aplicacion
var express       = require("express"),
	redis         = require("./servidor/conexion/conexion.js"),
    app           = express(),
    server        = require('http').Server(app),
    bodyParser    = require('body-parser'),
    controlador_1 = require('./servidor/controladores/controladores.js'),
    io            = require('socket.io').listen(server);  



app.use(bodyParser.urlencoded({ 
	extended: false 
}));
app.use(bodyParser.json());

//recibe una solicitud y envia la pagina por defecto como respuesta
app.get('/', function (req, res){
	res.sendFile(__dirname + '/cliente/vistas/index.html');
});

//app.post('/hola', controlador_1.create);
//app.get('/hola2', controlador_1.list);
app.use('/', express.static(__dirname + '/cliente/'));

server.listen(3000, function (){
	console.log('Escuchando en el puerto 3000...');
})

io.on('connection', function (socket) {
	socket.on('sendMsj', controlador_1.create);
});
