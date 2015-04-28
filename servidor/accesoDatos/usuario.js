var nohm             = require('nohm').Nohm,
	user             = require('../modelos/modelos'),
	commentHystory   = require('../modelos/historiaMensajes'),
	noteHistory      = require('../modelos/nota'),
	redis            = require('redis').createClient(),
	db               = require('./conexion');

//guardar un nuevo usuario en la bd
module.exports.saveUser = function(socket, username, pass){
	redis.select(db.database());
	nohm.setClient(redis);
	var user = nohm.factory('User');
	user.p({ username: username, password: pass});

	user.save(function(err){
	    if(err === 'invalid'){
	    	console.log('Properties were invalid: ', user.errors);
	    	socket.emit('ERROR', {msg: "Username are invalid"});
	    } 
	    else if(err){
	        console.log(err); 
	        socket.emit('ERROR', {msg: "Database connexion refused"});
	    } 
	    else{
	      	console.log('Saved user into redis database!');
	      	var message = {msgType: 'SAVE_USER', msg: 'Ha sido registrado de forma exitosa'}
	      	socket.emit('RESPONSE', message);
	    }
	});
};
//validar usuario en la bd
module.exports.logIn = function(socket, username, pass){
	redis.select(db.database());
	nohm.setClient(redis);
	user.find(function(err, ids){
	    if(err){
	    	return next(err);
	    }
	    var validUser = false;
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
		    if((props.username === username) && (props.password === pass)){
		        validUser = true;
		    }  
		    if(++count === len){
		    	if(validUser === true){
		    	    socket.emit('RESPONSE', {msgType: 'LOG_IN', msg: username});
		    	}
		        else{
		        	socket.emit('ERROR', {msg: "El usuario no esta regitrado!"});
		        }
	    	}
	      });
	    });
    });
};
//obtner la historia de mensajes de la bd
module.exports.historyMessages = function(socket, username){
	redis.select(db.database());
	nohm.setClient(redis);
	commentHystory.find(function(err, ids){
	    if(err){
	    	return next(err);
	    }
	    var allComments = [];
	    var len = ids.length;
	    var count = 0;
	    if(len === 0){
	      console.log(len);
	    }
	    ids.forEach(function(id){
	    var commentsFind = nohm.factory('Message');
	    commentsFind.load(id, function(err, props){
		    if(err){
		        return next(err);
		    }
		    if(props.receptor === username){
		        allComments.push({emisor: props.emisor, texto: props.comment});
		    }  
		    if(++count === len){
		    	if(allComments.length !== 0){
		    	    socket.emit('RESPONSE', {msgType: 'HISTORY_MESSAGES', msg: allComments});
		    	}
		        else{
		        	console.log('Does not exist comments  in the database for this user');
		        }
	    	}
	      });
	    });
    });
};
//guardar un nuevo mensaje en la bd
module.exports.saveMessage = function(emisor, receptors, comment){

	for(var i = 0; i < receptors.length; i++){
		redis.select(db.database());
		nohm.setClient(redis);
		var message = nohm.factory('Message');
		message.p({ comment: comment, receptor: receptors[i], emisor: emisor});

		message.save(function(err){
		    if(err === 'invalid'){
		    	console.log('Properties were invalid: ', message.errors);
		    	socket.emit('ERROR', {msg: "Comment are invalid"});
		    } 
		    else if(err){
		        console.log(err); 
		        socket.emit('ERROR', {msg: "Database connexion refused"});
		    } 
		    else{
		      	console.log('Saved comment into redis database!');
		    }
		});
	}
};

//guardar un nueva nota en la bd
module.exports.saveNote = function(socket, user, description){
	redis.select(db.database());
	nohm.setClient(redis);
	var note = nohm.factory('Note');
	note.p({ autor: user, note: description});

	note.save(function(err){
	    if(err === 'invalid'){
	    	console.log('Properties were invalid: ', note.errors);
	    	socket.emit('ERROR', {msg: "Note are invalid"});
	    } 
	    else if(err){
	        console.log(err); 
	        socket.emit('ERROR', {msg: "Database connexion refused"});
	    } 
	    else{
	    	console.log(note);
	      	console.log('Saved note into redis database!');
	    }
	});
};

//obtner la historia de notas de la bd
module.exports.historyNotes = function(socket){
	redis.select(db.database());
	nohm.setClient(redis);
	noteHistory.find(function(err, ids){
	    if(err){
	    	return next(err);
	    }
	    var allNotes = [];
	    var len = ids.length;
	    var count = 0;
	    if(len === 0){
	      console.log(len);
	    }
	    ids.forEach(function(id){
	    var notesFind = nohm.factory('Note');
	    notesFind.load(id, function(err, props){
		    if(err){
		        return next(err);
		    }
		    if(props.done === false){
		        allNotes.push({autor: props.autor, texto: props.note}); 
		    }
		    if(++count === len){
		    	if(allNotes.length !== 0){
		    	    socket.emit('RESPONSE', {msgType: 'HISTORY_NOTES', msg: allNotes});
		    	}
		        else{
		        	console.log('Does not exist notes in the database for this user');
		        }
	    	}
	      });
	    });
    });
};