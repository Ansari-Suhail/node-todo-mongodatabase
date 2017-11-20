const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

var userAuthSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: function(value){
        return validator.isEmail(value)
      },
      message: `{VALUE} is not a valid email`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens:[{
    access:{
      type: String,
      required: true
    },
    token: {
      type:  String,
      required: true
    }
  }],
});

userAuthSchema.methods.generateAuthToken = function(){
  var userAuth = this;
  var access = 'auth';
  var token = jwt.sign({_id: userAuth._id.toHexString(), access}, 'abc123').toString();

  userAuth.tokens.push({access, token});

  return userAuth.save().then(()=>{
    return token;
  });
};

var UserAuth = mongoose.model('UserAuth', userAuthSchema);

module.exports = {
  UserAuth: UserAuth
}
