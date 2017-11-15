var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {comp} = require('./models/computer.js');

var app = express();

app.use(bodyParser.json());

// app.post('/todos', (req, res)=>{
//   var newTodo = new Todo({
//     text: req.body.text
//   });
//
//   newTodo.save().then((result)=>{
//     res.send(result);
//   }, (err)=>{
//     res.status(400).send(err)
//   });
// });

app.post('/computers', (req, res)=>{
  var newComp = new comp({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  newComp.save().then((result)=>{
    res.send(result);
    console.log(`response ==>> ${result}`);
  }, (err)=>{
    res.status(400).send(err);
  });
});

app.listen(3000, ()=>{
  console.log('listening on port 3000');
});
