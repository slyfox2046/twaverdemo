const http= require('http');
const common = require('./common');

let server =http.createServer((req,res)=>{
    let arr =[];
    req.on('data',data=>{
        // console.log("bbbb");
        arr.push(data)
    })
    req.on('end',()=>{
        let data =Buffer.concat(arr);
        // console.log(data);
        console.log("==================================");
        // console.log(data.toString() );


        // data -------------------------------------------------
        // 解析二进制上传数据
        let post={};
        let files={};
        if(req.headers['content-type']){
            let str = req.headers['content-type'].split("; ")[1];
            if (str){
                let boundary ="--"+ str.split("=")[1];

            //    1.用分隔符切分整个数据
                let arr=data.split(boundary);
                // console.log(arr);

            //    2. 丢弃头尾两个数据
                arr.shift();
                arr.pop();

            //    3. 丢弃掉每个数据头尾的"\r\n"
                arr = arr.map(buffer=>buffer.slice(2,buffer.length-2));
                // console.log(arr.map(b=>b.toString()))

            //    4. 每个数据在第一个“\r\n\r\n”处切成两半
            //     let post ;

                arr.forEach(buffer=>{
                    let n = buffer.indexOf("\r\n\r\n");
                    let disposion = buffer.slice(0,n);
                    let connent = buffer.slice(n+4);

                    disposion=disposion.toString();
                    if(disposion.indexOf("\r\n\r\n")==-1){
                        content = connent.toString();
                        console.log(disposion.toString());
                        console.log("wwwwwwwwwwww");
                        let name = disposion.split('; ')[1].split('=')[1];
                        console.log(name.toString());
                        name = name.substring(1,name.length-1);

                        post[name]=content;


                    }else{
                        console.log("disposion value:");
                        console.log(disposion);
                        let [line1,line2]=disposion.split('\r\n');
                        let [,name,filename] = line1.split('; ');
                        console.log("line2:",line2);
                        let type = line2.split(": ")[1];

                        name = name.split('=')[1];
                        name = name.substring(1,name.length-1)
                        filename = filename.split('=')[1];
                        filename = filename.substring(1,name.length-1);

                        let path=`upload/uuid().replace(/\-/g,"")`;
                        fs.writeFile(path,connent,err=>{
                            if(err){
                                console.log("文件写入失败",err);
                            }else{
                                console.log("文件开始写入");
                                files[name]={filename,path,type};
                                console.log(files);
                            }
                        })

                        console.log(name,filename);
                        console.log(connent);

                    }
                });

                // 5. 完成
                console.log("---------------Done------------------------");
                console.log(post);

            }

        }



        res.end();
    });
});
server.listen(8080);
