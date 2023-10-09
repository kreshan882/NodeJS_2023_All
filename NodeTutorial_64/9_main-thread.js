const http = require('node:http'); //  core node_module
const {Worker}=require("node:worker_threads");

const server= http.createServer((req,res) => { 
    if(req.url === '/'){  //14 ms(0.014 S)
        res.writeHead(200,{'Content-type':'text/plain'});
        res.write('Home Page');
        res.end();
    }
    else if(req.url === '/slowpage'){  //11.18 S
        const worker=new Worker("./9_worker-thread.js");
        worker.on("message:",(j)=>{
            res.writeHead(200,{'Content-type':'text/plain'});
            res.write(`Slow Page: ${j}`);
            res.end();
        })

        
    } 
});
server.listen(4000, ()=> {
    console.log("server running port is 4000 ");
});