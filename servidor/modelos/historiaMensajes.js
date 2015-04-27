var nohm = require('nohm').Nohm;
//modelo mensajes de usuario
module.exports = nohm.model('Message', {
    properties:{
    	comment:{
        type: 'string'
      },
      receptor: {
        type: 'string'
      },
      emisor: {
        type: 'string'
      }
    }
});