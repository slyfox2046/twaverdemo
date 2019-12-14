var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost"
MongoClient.connect(url, function (err, client) {
    var myDB = client.db("astro");
    myDB.collection("nebulae", function (err, nebulae) {
        nebulae.find({type: "planetary"}, function (err, items) {
            items.toArray(function (err, itemArr) {
                console.log("Before Update:");
                console.log(itemArr);
                nebulae.update(
                    {type: "planetary", $isolated: 1},
                    {$set: {type: "Planetary", update: true}},
                    {upset: false, multi: true, w: 1},
                    function (err, results) {
                        nebulae.find({type: 'Planetary'}, function (err, items) {
                            items.toArray(function (err, itemArr) {
                                console.log("After Update:");
                                console.log(itemArr);
                                client.close();
                            })
                        })
                    }
                )
            })
        })
    })
})
