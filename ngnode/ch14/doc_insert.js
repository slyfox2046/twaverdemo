var MongoClient = require('mongodb').MongoClient;
function addObject(collection,object) {
    collection.insertOne(object,function (err,result) {
        if(!err){
            console.log("Inserted:");
            console.log(result);
        }

    });

}
var url = "mongodb://localhost:27017/"
MongoClient.connect(url,function (err,client) {
    var myDB = client.db("astro");
    myDB.dropCollection("nebulae");
    myDB.createCollection("nebulae",function (err,nebulae) {
        addObject(nebulae,{ngc:"NGC 7293",name:"Helix",type:"planetary",location:"Aquila"});
        addObject(nebulae,{ngc:"NGC 6543",name:"Cat's Eye",type:"planetary",location:"Draco"});
        addObject(nebulae,{ngc:"NGC 1952",name:"Crab",type:"supernova",location:"Taurus"});

    });
    setTimeout(function () {
        client.close();

    },3000)

})
