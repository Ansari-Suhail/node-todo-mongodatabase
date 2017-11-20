// const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

/*var message = "suhail@12345";
var hash = SHA256(message).toString();
console.log(`message ==>> ${message}`);
console.log(`hash ==>> ${hash}`);*/

var data = {
  id: 101
}

var token = jwt.sign(data, 'abc123');
console.log(`encoded data`, token);

var decoded = jwt.verify(token, 'abc123');
console.log('decoded data', decoded);
