const fs = require('fs');
//Sync

// fs.writeFileSync("./FS,http,express_modules/fsfilewrite.txt","Hello from Sync.");

//Async

// fs.writeFile("./FS,http,express_modules/fsfilewrite.txt","Hello, from Async",(err)=>{
//     if(err){
//         console.log("Error: ", err);
//     }
//     else{
//         console.log("Async write complete.");
//     }
// })

//Sync Read

// const dataSync=fs.readFileSync("./FS,http,express_modules/fsfilewrite.txt","utf8");
// console.log("File is readed Sync:",dataSync);

//Async Read

// fs.readFile("./FS,http,express_modules/fsfilewrite.txt","utf-8",(err,result)=>{
//     if(err){
//         console.log("Error: ", err);
//     }
//     else{
//         console.log("Data of Async Read:",result);
//     }
// })

//Append Async
// fs.appendFile("./FS,http,express_modules/fsfilewrite.txt","Hello from append Async\n",(err)=>{
//     if(err){
//         console.log("Error: ", err);
//     }
//     else{
//         console.log("Append Async write complete.");
//     }
// })

//Append Sync
// fs.appendFileSync("./FS,http,express_modules/fsfilewrite.txt","Hello from Append Sync\n");

// make the folder Sync
// fs.mkdirSync("Mkdir/a/b",{recursive:true})

// make the copy in other file
// fs.cpSync("./FS,http,express_modules/fsfilewrite.txt","./text.txt")

// status/info of file
// console.log(fs.statSync("./FS,http,express_modules/fsfilewrite.txt"));

