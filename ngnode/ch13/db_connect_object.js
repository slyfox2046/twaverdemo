console.log("Shanghai");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/testDB"
MongoClient.connect(url,
//     {
//     db: {w: 1, native_parser: false},
//     server: {
//         poolSize: 5,
//         socketOptions: {
//             connectTimeoutMS: 500
//         },
//         auto_reconnect: true
//     }, replSet: {},
//     mongos: {}
//
// },
    function (err,client) {
        if(err){
            console.log("Connection Failed Via Connection String.");
        }else{
            // console.log("Connected Via Connection String ...");
            // var adminDB = client.db("admin");
            // adminDB.adminCommand( { listDatabases: 1 } )
            // adminDB.listDatabases(function (err,databases) {
            //     console.log(databases);
            //
            // })

            // var db =client.db("testDB");
            // var cursor = db.collection("newCollection").find();
            // // console.log(cursor);
            // cursor.forEach(function (doc) {
            //     // console.log(JSON.stringify(doc,null,4));
            // })
            // client.close();
// var a = client.admin();
            var db = client.db("testDB");
            var adminDB = db.admin();
            adminDB.serverStatus(function (err,status) {
                // console.log(status);
            })
            adminDB.listDatabases(function (err,databases) {
                console.log(databases);

            })
            db.collections(function (err,collNames) {
                console.log(collNames);
                // console.log(collNames.databases);
            })
            // db.collection('inventory').insertOne({
            //     item: "canvas123",
            //     qty: 100,
            //     tags: ["cotton"],
            //     size: { h: 28, w: 35.5, uom: "cm" }
            // }).then(function(result) {
            //     // process result
            //     console.log("插入成功");
            // })
            // db.collection('inventory').insertMany([
            //     { item: "journal",
            //         qty: 25,
            //         size: { h: 14, w: 21, uom: "cm" },
            //         status: "A"},
            //     { item: "notebook123",
            //         qty: 50,
            //         size: { h: 8.5, w: 11, uom: "in" },
            //         status: "A"},
            //     { item: "paper",
            //         qty: 100,
            //         size: { h: 8.5, w: 11, uom: "in" },
            //         status: "D"},
            //     { item: "planner",
            //         qty: 75, size: { h: 22.85, w: 30, uom: "cm" },
            //         status: "D"},
            //     { item: "postcard",
            //         qty: 45,
            //         size: { h: 10, w: 15.25, uom: "cm" },
            //         status: "A"}
            // ],{order:false})
            //     .then(function(result) {
            //         // process result
            //         console.log(result);
            //     }) .catch(err => { //捕捉插入重复抛出的异常
            //     console.log(err.toString())
            // });
        }
})
