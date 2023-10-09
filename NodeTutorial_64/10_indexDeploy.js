const http = require('http'); 

const server= http.createServer((req,res) => { 
    if(req.url === '/'){
        res.writeHead(200,{'Content-type':'text/plain'});
        res.write('Node Deployment 10_indexDeploy.js success....');
        res.end();
    }
});

server.listen(3000, ()=> {
    console.log("server running port is 3000 [http://localhost:3000/ ]");
});