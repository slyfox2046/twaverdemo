const http = require('http');
let server = http.createServer((req,res)=>{
    console.log("asdf");
    switch (req.url) {
        case "/aaa" :
            res.write('abc');
            break;
        case "/bbb":
            res.write("bbb");
        default :
            res.write("cccc");
            ;
    }
    res.end();


})
server.listen(8080)

