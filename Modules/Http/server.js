const fs = require('fs');
const http = require('http');
const url = require('url');
const server=http.createServer((req,res)=>{
   const log=`${Date.now()}: ${req.url} new Request Received\n`;
   fs.appendFile("./log.txt",log,(err,data)=>{
    const myUrl=url.parse(req.url,true);
    
        switch(myUrl.pathname){
            case "/":
                res.end("Home Page");
            break;
            case "/about":
                const username=myUrl.query.myname;
                res.end(`Hello, I am ${username}.`);
            break;
            case "/project":
                res.end("NodeJs Server Making");
            break;
            default:
                res.end("404 Error Not Found!!")
        }
   })
})
server.listen(8000,()=>{
    console.log("Listening on Port: 8000");
})