const fs = require('fs');
const os = require('os');
const EventEmitter = require('events');

class Logger extends EventEmitter{
    log(message){
        this.emit("message",{message});
    }
}

const logger=new Logger();
const logFile="./logFile.txt";

// LISTENER REGISTER
logger.on("message",(event)=>{
    const logMessage=`${new Date().toISOString()} - ${event.message}\n`;

    fs.appendFile(logFile,logMessage,(error)=>{
        if(error) console.log(error);
    });
});

// EMIT EVENTS
logger.log("Application Started");
logger.log("Application Event Occured");

setInterval(()=>{
    const memory=((os.totalmem()-os.freemem())/os.totalmem())*100;
    console.log("Current Memory Usage:",memory.toFixed(2));
},3000);
