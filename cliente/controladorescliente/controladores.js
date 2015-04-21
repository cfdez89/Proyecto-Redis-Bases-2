/*
  *Controlador de la pagina
*/
app.controller('indexController', ['$scope', '$http', 'socket', function ($scope, $http, socket){
  $scope.mensajes = [];
  $scope.verRegistro = false;
  $scope.verSesion = false;
  $scope.conectado = false;
  
  socket.on('ERROR', function(message){
    console.log(message);
  });

  socket.on('RESPONSE', function(message){
    if(message.msgType == 'saveUser'){
      console.log(message.msg);
      socket.emit('SOLICITUDE', {msgType: 'connected', msg: message.msg});
    }
    if(message.msgType == 'getUser'){
      var res = [];
      for(var i = 0; i < message.msg.length; i++){
        $scope.mensajes.push(message.msg[i]);
      }
    }
  });

	$scope.registrarUsuario = function(){
		socket.emit('SOLICITUDE', {msgType: 'saveUser', msg: $scope.modUsuario, msg2: $scope.modPassword});

    $scope.modNombre   = '';
    $scope.modApellido = '';
    $scope.modUsuario  = '';
		$scope.modPassword = '';
    $scope.modVerificarPassword  = '';


    $scope.conectado = true;
    $scope.verRegistro = !$scope.verRegistro;


	};	

  $scope.iniciarSesion = function(){
    $scope.modLoguinaUser  = '';
    $scope.modLoguinPass = '';

    $scope.conectado = true;
    $scope.verSesion = !$scope.verSesion;


  };  


	$scope.getMensaje = function(){
		socket.emit('SOLICITUDE', {msgType: 'getUser', msg: $scope.buscar});

	};

  $scope.mostrarRegistro = function(){
    if($scope.conectado != true){
      $scope.verRegistro = !$scope.verRegistro;
    }
  };

  $scope.mostrarSesion = function(){
    if($scope.conectado != true){
      $scope.verSesion = !$scope.verSesion;
    }
  };	
  
  	
}]);

