const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const lodash = require('lodash');
const bcrypt = require('bcrypt');

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

userAuthSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();

  return lodash.pick(userObject, ['_id','email']);
}

userAuthSchema.methods.generateAuthToken = function(){
  var userAuth = this;
  var access = 'auth';
  var token = jwt.sign({_id: userAuth._id.toHexString(), access}, 'abc123').toString();

  userAuth.tokens.push({access, token});

  return userAuth.save().then(()=>{
    return token;
  });
};

userAuthSchema.statics.findByToken = function(token){
  var user = this;
  var decoded;

  try{
    decoded = jwt.verify(token , 'abc123');
  }catch(e){
    return new Promise((resolve, reject)=>{
      reject();
    });
  }

  return user.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

userAuthSchema.pre('save', function(next){
  var user = this;

  if(user.isModified('password')){
    bcrypt.genSalt(10, (err, salt)=>{
      bcrypt.hash(user.password, salt, (err, res)=>{
        user.password = res;
        next();
      });
    });
  }else{
    next();
  }
});

userAuthSchema.statics.findByCredentials = function(email, password){
  var user = this;

  return user.findOne({email}).then((success)=>{
    if(!success){
      return Promise.reject();
    }

    return new Promise((resolve, reject)=>{
      //comparision
      bcrypt.compare(password, success.password, (err, res)=>{
        if(res){
          resolve(success);
        }else{
          reject();
        }
      });
    });
  });
}

userAuthSchema.methods.removeToken = function(token){
  var user = this;

  return user.update({
    $pull:{
      tokens: {token}
    }
  });
};

var UserAuth = mongoose.model('UserAuth', userAuthSchema);

module.exports = {
  UserAuth: UserAuth
}
