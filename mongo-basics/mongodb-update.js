const MongoClient = require('mongodb').MongoClient;

//code to connect to mongodb
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log('Unable to connect to mongodb server');
  }
    console.log('Successfully connected to mongodb server');

    //findOneAndUpdate it takes 3 arguments 1.specifying  ie name=asad or id=objId 2.which row should update ie $set age=50 3.return returnOriginal=false means it returns the updated values not original
    db.collection('Todo').findOneAndUpdate({
      name: 'asad'
    }, {
      $set: {
        dept: 'network'
      },
      $inc: {
        age: 5,
      }
    }, {
      returnOriginal : false
    }).then((result)=>{
      console.log(result);
    }, (err)=>{
      console.log(err);
    });

    db.close();
});
