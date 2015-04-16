var nohm = require('nohm').Nohm;
var User = require('../modelos/modelos');
var redis = require('redis').createClient();


module.exports.create = function(req, res){
   console.log(req);
  //var mensaje = req.body.text;
   nohm.setClient(redis);
   var user = nohm.factory('User');
   user.p({
    usuario: req,
    password: 'req@example.com'
   });

   user.save(function(err){
      if (err === 'invalid'){
         console.log('properties were invalid: ', user.errors);
      } 
      else if(err){
         console.log(err); // database or unknown error
      } 
      else{
      console.log('saved user! :-)');
      }
   });



/*

 user.findAndLoad({name: req.body.text}, function(err, users) {
        if (err) {
          console.dir(err);
          t.done();
        }
       console.log(users);

      });*/

 //res.send('llego');


/*
  user.load("i8icw2v857duzz7wf15o", function (err, properties) {
  if (err) {
    // err may be a redis error or "not found" if the id was not found in the db.
  } else {
    console.log(properties);
    // you could use this.allProperties() instead, which also gives you the 'id' property
  }
});
 /*var otherUser = nohm.factory('User', "i8icw2v857duzz7wf15o", function (err) {
    if (err === 'not found') {
      console.log('no user with id 522 found :-(');
    } else if (err) {
      console.log(err); // database or unknown error
    } else {
      console.log(otherUser.allProperties());
    }
  });*/
  /*
user.find(function (err, ids) {
    // ids = array of ids
    console.log(ids);
  });
  nohm.connect([{
  model: User,
  blacklist: ['salt']
}]);*/
};

module.exports.list = function (req, res) {
  	
};
