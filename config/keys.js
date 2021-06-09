//keys.js - Figure out the logic to return proper credentials

if(process.env.NODE_ENV === 'production') {
  //Send PROD Keys
  module.exports = require('./prod');
}
else {
  //Send DEV Keys
  module.exports = require('./dev');
}