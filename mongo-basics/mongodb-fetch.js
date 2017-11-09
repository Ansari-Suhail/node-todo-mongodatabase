const {MongoClient,ObjectID} = require('mongodb');

//code to connect to mongodb
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log('Unable to connect to mongodb server');
  }
    console.log('Successfully connected to mongodb server');

    db.collection('Todo').find({
      _id: new ObjectID('5a02faa3fe3fc63790ea5272')
    }).toArray().then((success)=>{
      console.log(JSON.stringify(success, undefined, 2));
    }, (err)=>{
      console.log(err);
    });

    db.collection('user').find().count().then((success)=>{
      console.log(`Total Count : ${success}`);
    }, (err)=>{
      console.log(err);
    });

    db.close();
});
