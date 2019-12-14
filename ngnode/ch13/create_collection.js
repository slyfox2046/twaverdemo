var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/testDB"
MongoClient.connect(url,function (err,client) {
    var db = client.db("testDB");
    db.createCollection("creCollTest",function (err,collection) {
        console.log(collection.collectionName);
        db.dropCollection("creCollTest",function (err,results) {
            console.log(results);

        })

    })


})
