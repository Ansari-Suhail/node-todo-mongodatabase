var {UserAuth} = require('./../models/userAuth.js');

var authenticate = (req, res, next)=>{
  var token = req.header('x-auth');
  console.log(`token ==>> ${token}`);

  UserAuth.findByToken(token).then((success)=>{
    if(!success){
      return Promise.reject();
    }

    req.success = success;
    req.token = token;
    next();
  }).catch((e)=>{
    res.status(401).send('Invalid user');
  });
};

module.exports = {authenticate};
