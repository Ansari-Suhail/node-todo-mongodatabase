var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp').then((success)=>{
  console.log("successfully connected to mongodb server");
}, (err)=>{
  console.log("error in connecting mongodb server");
});


/*mongoose.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log("unable to connect to mongodb server");
  }
  console.log("successfully connected to mongodb");
});*/
