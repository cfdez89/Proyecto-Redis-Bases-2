app.controller('ctlMensajes', ['$scope', '$http', 'socket', function ($scope, $http, socket){
	$scope.mensajes = [];
	
	socket.on('getRes', function(message){
    	console.log(message);
    });	
    socket.on('getUser', function(message){
    	var res = [];
    	for(var i = 0; i < message.total.length; i++){
    		 $scope.mensajes.push(message.total[i]);
    	}

    });	

	$scope.enviarMensaje = function(){
		socket.emit('CONNECT', {msgType: 'saveUser', msg: $scope.mensaje, msg2: $scope.password});


		$scope.mensaje = '';
		$scope.password = '';

	};	

	$scope.getMensaje = function(){
		socket.emit('CONNECT', {msgType: 'getUser', msg: $scope.buscar});

	};		
}]);

