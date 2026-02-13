const fs = require('fs');
const os = require('os');
const EventEmitter=require('events');

class Logger extends EventEmitter{
    log(message){
        this.emit("message",{message});
    }
}
const logger=new Logger();
const filePath="./loggerData.txt";

const fileLog=(event)=>{
    const logMessage=`${new Date().toISOString()} - ${event.message}\n`
    fs.appendFile(filePath,logMessage,(err)=>{
        if(err){
            console.log("Error Message",err);
        }
    })
}
logger.on("message",fileLog);


setInterval(()=>{
    const memoryUsage=((os.totalmem()-os.freemem())/os.totalmem())*100;
    logger.log(`Current Memory usage: ${memoryUsage.toFixed(2)}%`);
},3000)

logger.log("Application Started!");
logger.log("Application event occured");