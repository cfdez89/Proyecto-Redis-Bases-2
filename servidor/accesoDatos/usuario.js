var nohm  = require('nohm').Nohm,
	user  = require('../modelos/modelos'),
	redis = require('redis').createClient(),
	db    = require('./conexion');



/*
	*Save new user into database
*/
module.exports.saveUser = function(socket, username, pass){
	redis.select(db.database());
	nohm.setClient(redis);
	var user = nohm.factory('User');
	user.p({ username: username, password: pass});

	user.save(function(err){
	    if(err === 'invalid'){
	    	console.log('Properties were invalid: ', user.errors);
	    } 
	    else if(err){
	        console.log(err); 
	    } 
	    else{
	      	console.log('Saved user into redis database!');
	      	//socket.emit('sendMsj', message);//se manda lo enviado del front como prueba, se debe hacer un case en el front
	    }
	});
};
/*
	*Get user from database
*/
module.exports.getUser = function(socket, username){
	redis.select(db.database());
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
		    if(props.username === username){
		        users.push({id: this.id, username: props.username, password: props.password});
		    }  
		    if(++count === len){
		    	if(users.length !== 0){
		    		console.log(users);	
		    	    //socket.emit('sendMsj', users);// se debe hacer el case en el front para poder enviarlo
		    	}
		        else{
		        	console.log('Does not exist in the database');
		        }
	    	}
	      });
	    });
    });
};