var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017"
MongoClient.connect(url,function (err,client) {
    var myDB = client.db("astro");
    myDB.collection("nebulae",function (err,nebulae) {
        nebulae.find(function (err,items) {
            items.toArray(function (err,itemArr) {
                console.log("Document Array:");
                console.log(itemArr);
                console.log("=======================================================");
            })
        });


        nebulae.find(function (err,items) {
            // console.log(items);
            items.forEach(function (item) {
                if(item){
                    console.log("Singular Document:");
                    console.log(item);

                }
            })

        })

        nebulae.findOne({type:"planetary"},function (err,item) {
            console.log("=======================================================");
            console.log("Found One:");
            console.log(item);
        })

    })
})
