var mongoose = require('mongoose');

var comp = mongoose.model('computer', {
  name:{
    required: true,
    type: String,
    trim: true,
    minlength: 4
  },
  email:{
    type: String,
    required: true,
    default: 'ansari@gmail.com'
  },
  password:{
    type: Number,
    required: true,
  }
});

module.exports = {
  comp
}
