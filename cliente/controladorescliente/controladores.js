'use strict';
app.factory('socket', function(){
	var socket = io.connect('http://localhost:3000');
	return socket;
});


app.controller('controlador_1', ['$scope', '$http', 'socket', function ($scope, $http, $socket){
	$scope.prueba = [{usuario: 'carlos'}];

	$scope.funcion_1 = function(){
		var mensaje={};
		mensaje.msg= 'noexiste';
		mensaje.msgType= 'getUser';
		$socket.emit('CONNECT', mensaje);

		$socket.on('Msj', function(res){
        	console.log(res);
          
        	$scope.prueba.push({usuario: res.msg});
        });
		//$scope.connect();

	//	$scope.prueba.push({usuario: 'tata'});
      
		
		//$scope.prueba = ' ';
        //$scope.password = ' ';

		//console.log($scope.modelo_2.text);
		//socket.emit('sendMsj', JSON.stringif({usuario: $scope.modelo_1.text});
      

       // socket.send("setMsj", JSON.stringify({usuario: $scope.modelo_1.text}));
       /*
        $socket.on('getMsj', function(res){
        	valor= res;
        	alert(res);
          
        	//$scope.prueba.push({usuario: res});
        })
        $scope.prueba.push({usuario: valor});
        */



/*
			.success(function(res){
			$scope.modelo_1 = ' ';
			//$scope.prueba.push({usuario: res});
		});
*/
		    //console.log($scope.modelo_1);
		    /*
			$http.post('/crear', $scope.modelo_1.text).success(function(res){
				//$scope.obtener();
					console.log(res);
					$scope.modelo_1= '';
					//$scope.prueba.name= res;
					$scope.prueba.push({name : res});
			});*/
	};

	$scope.funcion_2 = function(){

	}		
 }]);

