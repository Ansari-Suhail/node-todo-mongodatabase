const {ObjectID} = require('mongodb');

var express = require('express');
var bodyParser = require('body-parser');
var lodash = require('lodash');

var {mongoose} = require('./db/mongoose-connection.js');
var {Todo} = require('./models/todo.js');
var {computer} = require('./models/computer.js');
var {UserAuth} = require('./models/userAuth.js');
var {authenticate} = require('./middleware/authenticate.js')

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

/*app.post('/todos', (req, res)=>{
  var newTodo = new Todo({
    text: req.body.text
  });

  newTodo.save().then((result)=>{
    res.send(result);
  }, (err)=>{
    res.status(400).send(err)
  });
});

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

//passing dynamic id with get method
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

//passing dynamic id and removing records with delete method
  app.delete('/remove/:id', (req, res)=>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
      console.log(`${id} is not a valid id`);
      return res.send(`${id} is not a valid id`);
    }

    computer.findByIdAndRemove(id).then((success)=>{
      res.send({success});
    }, (err)=>{
      res.send({err});
    });
  });

//passing dynamic updates to computer collection with patch method
  app.patch('/patch/:id', (req, res)=>{
    var id = req.params.id;
    var body = lodash.pick(req.body, ['name','email','password']);

    computer.findByIdAndUpdate(id,
      {
        $set: body
      },
      {
        new : true
      }
    ).then((success)=>{
      res.send({success});
    }, (err)=>{
      res.send({err});
    });
  });*/

//==================================================================================================
app.post('/userAuth/signup', (req, res)=>{
  var body = lodash.pick(req.body, ['email','password']);
  var newUserAuth = new UserAuth(body);

  newUserAuth.save().then(()=>{
    return newUserAuth.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth', token).send(newUserAuth);
  }).catch((e)=>{
    res.status(400).send("Sign Up faliled - User with this email already exists");
  });
});


app.get('/userAuth/verify', authenticate, (req, res)=>{
  res.send(req.success);
});

app.post('/userAuth/login', (req, res)=>{
  var body = lodash.pick(req.body, ['email', 'password']);

  UserAuth.findByCredentials(body.email, body.password).then((success)=>{
    return success.generateAuthToken().then((token)=>{
      res.header('x-auth', token).send(success)
    });
  }).catch((e)=>{
    res.status(400).send("Login Failed");
  })
});

app.delete('/userAuth/verify/logout', authenticate, (req, res)=>{
  req.success.removeToken(req.token).then(()=>{
    res.status(200).send('Logout Successfully');
  },()=>{
    res.status(400).send('Failed to Logout');
  });
});
//==================================================================================================



app.listen(port, ()=>{
  console.log(`listening on port ${port}`);
});
