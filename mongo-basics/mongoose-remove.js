const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose-connection.js');
const {computer} = require('./../server/models/computer.js');

//remove all records from computer collection but does not return the object
computer.remove({}).then((success)=>{
  console.log({success});
},(err)=>{
  console.log({err});
});

//remove only one record and return the object
computer.findOneAndRemove({password: 1111}).then((success)=>{
  console.log({success});
},(err)=>{
  console.log({err});
});

//remove record by Id and return the object
computer.findOneAndRemove('5a0bfae3070a191834719e38').then((success)=>{
  console.log({success});
},(err)=>{
  console.log({err});
});
