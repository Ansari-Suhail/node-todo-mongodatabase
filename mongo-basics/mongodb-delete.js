const {MongoClient,ObjectID} = require('mongodb');

//code to connect to mongodb
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log('Unable to connect to mongodb server');
  }
    console.log('Successfully connected to mongodb server');

    //deleteOne
    db.collection('Todo').deleteOne({name: 'suhail'}).then((result)=>{
      console.log(result.n);
    }, (err)=>{
      console.log(`error ==>> ${err}`);
    });

    //deleteMany
    db.collection('user').deleteMany({age: 22}).then((result)=>{
      console.log(result.n);
    }, (err)=>{
      console.log(`error ==>> ${err}`);
    });

    //findOneAndDelete, it delete one record and also give the object back
    db.collection('user').findOneAndDelete({age: 22}).then((result)=>{
      console.log(result);
    }, (err)=>{
      console.log(`error ==>> ${err}`);
    });

    db.close();
});
