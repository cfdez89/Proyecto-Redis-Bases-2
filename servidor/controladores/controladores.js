var nohm   = require('nohm').Nohm,
	user   = require('../modelos/modelos'),
	config = require('../conexion/conexion'),
    redis  = require('redis').createClient(config.port, config.host);


/*
	*Save new user into database
*/
module.exports.saveUser = function(socket, message){
	nohm.setClient(redis);
	var user = nohm.factory('User');
	user.p({ username: message.msg, password: message.msg});//falta agregar la propiedad password al objeto

	user.save(function(err){
	    if(err === 'invalid'){
	    	console.log('Properties were invalid: ', user.errors);
	    } 
	    else if(err){
	        console.log(err); 
	    } 
	    else{
	      	console.log('Saved user into redis database!');
	      	socket.emit('sendMsj', message);//se manda lo enviado del front como prueba, se debe hacer un case en el front
	    }
	});
};
/*
	*Get user from database
*/
module.exports.getUser = function(socket, message){
	nohm.setClient(redis);
	user.find(function(err, ids){
    if(err){
    	return next(err);
    }
    var users = [];
    var len = ids.length;
    var count = 0;
    if(len === 0){
      console.log(len);
    }
    ids.forEach(function(id){
    var userFind = nohm.factory('User');
    userFind.load(id, function(err, props){
	    if(err){
	        return next(err);
	    }
	    if(props.password === message.msg){//aca se pregunta por el username, esta asi xq mi base esta sucia 
	        users.push({id: this.id, username: props.username, password: props.password});
	    }  
	    if(++count === len){
	    	if(users.length !== 0){
	    		console.log(users);	
	    	}
	        else{
	        	console.log('Is not exists in database');
	        }
	        //socket.emit('sendMsj', users);// se debe hacer el case en el front para poder enviarlo
    	}
      });
    });
  });


};