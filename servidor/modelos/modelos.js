var nohm = require('nohm').Nohm;
  
module.exports = nohm.model('User', {
    properties: {
      usuario: {
        type: 'string',
        unique: true
      },
      password: {
        type: 'string',
        unique: true,
      }
    }
});


