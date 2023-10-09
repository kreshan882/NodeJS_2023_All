const http = require('node:http'); //  core node_module
const fs=require('node:fs');
const crypto=require('node:crypto');

const server= http.createServer((req,res) => { 
    if(req.url === '/'){
        res.writeHead(200,{'Content-type':'text/plain'});
        res.write('welcomeserber root page ss');
        res.end();
    }
    else if(req.url === '/htmlRes'){
        res.writeHead(200,{'Content-type':'text/html'});
        res.write('<h1>Html page</h1>');
        res.end();
    }
    else if(req.url === '/jsonRes'){
        const user={"name":"kreshan", "age":33}
        res.writeHead(200,{'Content-type':'application/json'});
        res.write(JSON.stringify(user));
        res.end();
    }
    else if(req.url === '/load'){
        // res.writeHead(200,{'Content-type':'text/html'});
        // const readStream= fs.createReadStream('index.html');  //read file stream the index file and load to WEB
        // readStream.pipe(res);

        const childName="kowsik"; //pass vatiable to index.html
        res.writeHead(200,{'Content-type':'text/html'});
        let html= fs.readFileSync('index.html','utf-8');  //Sync: must read, before res.end() | let: can modified
        html=html.replace("{{childName}}",childName);
        res.end(html);
    }else{
        res.writeHead(404);
        res.end("page not found");
    }
});

//server.listen(3000);
server.listen(3000, ()=> {
    console.log("server running port is 3000 ");
});


//39/40) Lib-UV THREAD POOL| Thread Pool Size
//39.1 without libuv| Sync | blocking | more times
const start=Date.now();
crypto.pbkdf2Sync("password","salt",100000,512,"sha512"); // 806 ms
crypto.pbkdf2Sync("password","salt",100000,512,"sha512"); //1855 ms
crypto.pbkdf2Sync("password","salt",100000,512,"sha512"); //2702 ms
console.log('Hash time ', Date.now()-start);

//39.2 with libuv| Async | non-blocking |less time
process.env.UV_THREADPOOL_SIZE = 6; //6< OS.cpus().length
const start2=Date.now();
for (let i=0; i<1;i++){ //base on time==>4+4+2 (libuv thread pool have 4 thread default)
    crypto.pbkdf2("password","salt",100000,512,"sha512", () => {
        console.log('libuv-Hash time ', Date.now()-start2); //842 -> 1162 -> 1400 
    }); 
}

//41 Network I/O
//    lib-uv handel in 2 different Way 
       // 1) Native Async machanicium -----> [https]
       // 2) Thread Pool ------> [crypto]
const https=require("node:https");
const start3=Date.now();
for (let i=0; i<14;i++){ //base on time==>4+4+2 (libuv thread pool have 4 thread default)
    https
        .request("https://www.google.com",(res) =>{
            res.on("data",() => {});
            res.on("end",() => {
                // all in same time, not using thered pool (with 4 batch)
                console.log("io-time:",Date.now()-start3); 
            });
        })
        .end();
}  

//42 even loop
console.log("First"); // print in call stack
fs.readFile("./logs/log_read.txt",()=>{  //send to lib-uv for Async 
    console.log("Seconf");
})
console.log("Third"); // print in call stack