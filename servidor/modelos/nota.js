var nohm = require('nohm').Nohm;
//modelo de notas
module.exports = nohm.model('Note', {
    properties:{
    	autor:{
        type: 'string'
      },
      note:{
        type: 'string'
      },
      done:{
        type: 'boolean'
      }
    }
});