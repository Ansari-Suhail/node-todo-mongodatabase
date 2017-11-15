var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose-connection.js');
var {Todo} = require('./models/todo.js');
var {computer} = require('./models/computer.js');

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

// post method
app.post('/computer', (req, res)=>{
  var newComputer = new computer({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  newComputer.save().then((result)=>{
    res.send(result);
    console.log(`response ==>> ${result}`);
  }, (err)=>{
    res.status(400).send(err);
  });
});

//get method
  app.get('/computer', (req, res)=>{
    computer.find({password: 123456}).then((computer)=>{ //it will return all the data in computer collection inside robomongo
      res.send({computer});
      console.log(computer);
    }, (err)=>{
      res.status(400).send(err);
      console.log(err);
    });
  });

app.listen(3000, ()=>{
  console.log('listening on port 3000');
});
