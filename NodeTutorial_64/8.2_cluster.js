const cluster=require("node:cluster");
const http = require('node:http'); 
const OS = require('node:os'); 

if(cluster.isMaster){ //MASTER Responce is call Worker(Child) Node
    console.log(`Master process ${process.pid} is running...`);
    for(let k=1;k<OS.cpus().length;k++){ //12 cpu
        cluster.fork();
    }
    
 
}
else{ //WORKER doing req activity
    console.log(`Worker process ${process.pid} is running...`);
    
    const server= http.createServer((req,res) => { 
        if(req.url === '/'){  //14 ms(0.014 S)
            console.log("Worker home start");
            res.writeHead(200,{'Content-type':'text/plain'});
            res.end('Home Page');
            console.log("Worker home end");
        }
        else if(req.url === '/slowpage'){  //11.18 S
            console.log("Worker Slow start");
            res.writeHead(200,{'Content-type':'text/plain'});
            for(let i=0;i<6000000000;i++) {} 
            res.end('Slow Page');
            console.log("Worker Slow end");
        } 
    });
    server.listen(8000, ()=> {
        console.log("Worker running port is 8000 ");
    });

}