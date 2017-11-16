const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose-connection.js');
const {computer} = require('./../server/models/computer.js');

var id = '5a0bfae3070a191834719e38';

// if(!ObjectId.isValid(id)){
//     console.log("ID not valid");
// }

computer.findById(id).then((success)=>{
  console.log(`successfully id found ==>> ${success}`);
}, (err)=>{
  console.log(`id not found ==>> ${err}`);
})
