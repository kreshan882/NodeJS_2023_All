const http = require('node:http'); //  core node_module


const server= http.createServer((req,res) => { 
    if(req.url === '/'){  //14 ms(0.014 S)
        res.writeHead(200,{'Content-type':'text/plain'});
        res.write('Home Page');
        res.end();
    }
    else if(req.url === '/slowpage'){  //11.18 S
        res.writeHead(200,{'Content-type':'text/plain'});
        for(let i=0;i<6000000000;i++) {} 
        res.write('Slow Page');
        res.end();
    } 
});
server.listen(3000, ()=> {
    console.log("server running port is 3000 ");
});


//http://localhost:3000/slowpage ---> http://localhost:3000/ 
// both taken 11 Second ----> because of Single thread