const http= require('http');
let server =http.createServer((req,res)=>{
    let str ="";
    req.on('data',data=>{
        console.log("aaaaaaa");
        str +=data;
    })
    req.on('end',()=>{
        console.log(str);
        res.end();
    });
});
server.listen(8080);
