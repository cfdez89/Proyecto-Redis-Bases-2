app.factory('socket', function(){
	var socket = io.connect('http://localhost:3000');
	return socket;
});


app.controller('controlador_1', ['$scope', '$http', 'socket', function ($scope, $http, socket){
	$scope.prueba = [
		{usuario: "usuario default"}
	],
		
	$scope.funcion_1 = function(){
		var temp ={};
		temp.msj = $scope.modelo_1.text;

		socket.emit('sendMsj', $scope.modelo_1.text);
		//socket.emit('sendMsj', JSON.stringif({usuario: $scope.modelo_1.text});
        $scope.modelo_1 = ' ';

/*
			.success(function(res){
			$scope.modelo_1 = ' ';
			//$scope.prueba.push({usuario: res});
		});
*/
		    //console.log($scope.modelo_1);
		    /*
			$http.post('hola', $scope.modelo_1).success(function(res){
				//$scope.obtener();
					console.log(res);
					$scope.modelo_1= '';
					//$scope.prueba.name= res;
					$scope.prueba.push({name : res});
			});*/
	}		
 }]);