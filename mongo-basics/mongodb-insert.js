const MongoClient = require('mongodb').MongoClient;

//code to connect to mongodb 
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log('Unable to connect to mongodb server');
  }
    console.log('Successfully connected to mongodb server');

    db.collection('Todo').insertOne({
      name: 'suhail',
      surname: 'ansari',
      dept: 'computer',
      age: 24,
      completed: false
    }, (err, result)=>{
      if(err){
        return console.log('Unable to insert record'+err);
      }
      console.log(JSON.stringify(result.ops, undefined, 2));
    });

    db.collection('user').insertOne({
      name: 'anas',
      age: 22,
      location: 'dubai'
    },(err, result)=>{
      if(err){
        return console.log(err);
      }
      console.log(JSON.stringify(result.ops, undefined, 2));
    })

    db.close();
});
