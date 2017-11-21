// const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

var password = 'abcd1234*';

  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(password, salt, (err, hash)=>{
     console.log('hashed password',hash);
  })
});

bcrypt.compare(password, '$2a$10$25QldPRAoZ32CiVWA7e.QOHnRFM/yOrLan5nkNFNp3.wU9CN1/pVC', (err, res)=>{
  console.log(res);
})
