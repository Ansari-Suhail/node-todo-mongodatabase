var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log("unable to connect to mongodb server");
  }
  console.log("successfully connected to mongodb");
});
