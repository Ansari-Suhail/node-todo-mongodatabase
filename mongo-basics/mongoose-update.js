const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose-connection.js');
const {computer} = require('./../server/models/computer.js');

var id = '5a0d437c498ec547f0341008';

computer.findByIdAndUpdate(id,
  {
    $set: {
      name: "chotu"
    },
    $inc: {
      password: 10
    },
  },

  {
    new : true
  },
).then((success)=>{
  console.log({success});
}, (err)=>{
  console.log({err});
});
