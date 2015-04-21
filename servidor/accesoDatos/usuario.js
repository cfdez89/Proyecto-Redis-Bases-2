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
	    	socket.emit('ERROR', {type: "Username are invalid"});
	    } 
	    else if(err){
	        console.log(err); 
	        socket.emit('ERROR', {type: "Database connexion refused"});
	    } 
	    else{
	      	console.log('Saved user into redis database!');
	      	socket.emit('RESPONSE', {msgType: 'saveUser', msg: username});
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
		    	    socket.emit('RESPONSE', {msgType: 'getUser', msg: users});
		    	}
		        else{
		        	console.log('Does not exist in the database');
		        	socket.emit('ERROR', {type: "Does not exist in the database"});
		        }
	    	}
	      });
	    });
    });
};