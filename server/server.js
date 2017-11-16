const {ObjectID} = require('mongodb');

var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose-connection.js');
var {Todo} = require('./models/todo.js');
var {computer} = require('./models/computer.js');

var app = express();

const port = process.env.PORT || 3000;

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

//passing dynamic id
  app.get('/computer/:id', (req, res)=>{
    var id = req.params.id;
    // console.log("id===>>"+id);

    if(!ObjectID.isValid(id)){
      console.log(`${id} is not valid id`);
      return res.send(`${id} is not a valid id`);
    }

    computer.findById(id).then((success)=>{
      res.send({success});
      console.log({success});
    }, (err)=>{
      res.send({err});
      console.log({err});
    });
  });

app.listen(port, ()=>{
  console.log(`listening on port ${port}`);
});
