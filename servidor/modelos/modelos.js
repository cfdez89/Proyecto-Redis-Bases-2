var nohm = require('nohm').Nohm;
  
module.exports = nohm.model('User', {
    properties:{
    	username:{
        type: 'string',
        unique: true
      },
      password: {
        type: 'string'
      }
    }
});


