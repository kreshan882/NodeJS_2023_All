const path=require("node:path");
const os= require('os');
const EventEmitter= require('events'); //  core node_module
const fs=require('node:fs'); //  core node_module
const fs_p=require('node:fs/promises'); //  core node_module
const fs_zlib=require('node:zlib'); //  core node_module
const http=require('http'); //  core node_module

//18) Built-in Modules
console.log(__filename);
console.log(__dirname);
    
console.log("-----2-----");
console.log(os.type());
console.log(os.version());
console.log(os.homedir());


console.log("--------1------------------------------");
console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));
console.log(path.parse(__filename));  // full file detail json

console.log(path.join("myDir","files","data.txt")); // myDir\files\data.txt
console.log(path.resolve("myDir","files","data.txt")); // [currentFilder]\myDir\files\data.txt


console.log("--------2------------------------------");

function great(name){
    console.log(`Helle ${name}`)
}

function higherorderFunction(callBack){
    const name="kreshna";
    callBack(name);
}

higherorderFunction(great);  //Helle kreshna

//20.1 SynChronous callback
    let number=[1,2,6,4,5];
    number.sort((a,b)=> a-b);
    console.log(number);

    number.filter(n => n%2 ===0);
    console.log(number);

    number.map(n=> n/2);
    console.log(number);

//20.2 AsynChronous callback [with old jav script]
/*
function callBackAA(){
    document.getElementById("demo").innerHTML="hello world";
}
document.getElementById("btn").addEventListener("click",callBackAA);

//JS
$.get("url",function(data){
    $(".result").html(data);
    alert("loaded success");
})

*/

//21) multi event trigeres, then responce from callback function
const emitter = new EventEmitter(); //object
emitter.on('order-pizza', (a,b) => {
    console.log(`Event trigger loaded==> ${a} : ${b}`)
})

emitter.on('order-pizza', (a) => {  //even listners
    if(a==="chicken"){
        console.log('Spicei Checken called')
    }
})

emitter.emit('order-pizza',"chicken", "mediam");

//22)  Extending from EventEmitter............................
console.log("------22-Extending from EventEmitter.............");
const PitzaShop=require("./pitza-shop.js");
const DrinkMatchine=require("./pitza-drink-matchine.js");
const { error } = require("node:console");

const pitzaShop=new PitzaShop();
const drinkMatchine=new DrinkMatchine();

pitzaShop.on('order', (topping,size) => {
    console.log(`Extending.EventEmitter loaded==> ${topping} : ${size}`)
    drinkMatchine.sarveDrink("large");
})

pitzaShop.order("chicken", "mediam");
pitzaShop.displayOrderNumber();

//23/24) Stream & Buffer
console.log("------24-Stream & Buffer.............");
const buffer=new Buffer.from("kreshann","utf-8");
buffer.write("AAA");
console.log(buffer.toString()); //AAAshann  (buffer size not changed, overide happent)
console.log(buffer);  //<Buffer 41 41 41 73 68 61 6e 6e>
console.log(buffer.toJSON());

//25) Asynchronous javaScript
//JS: Run A, then only Run B [Synchronous | blocking |Single thread ]
//    So JS have issue 
//    NodeJs resolved that(node js support Asynchronous | non-blocking)
function A(){
    console.log("Run A");
}
function B(){
    console.log("Run B"); // b blocked until A completed
}
A();
B();

//26) fs
//26.1) js Sync type not good for app, because blocking (slow)
const fileContains=fs.readFileSync('./logs/log_read.txt'); //Sync + buffer 
const fileContains_sync=fs.readFileSync('./logs/log_read.txt','UTF-8'); //Sync + buffer +encoded
console.log("Sync-read:"+fileContains_sync);//<Buffer 41 41 41 73 68 61 6e 6e> ---> fdfdfdgfdg

//26.2) read file Async
fs.readFile('./logs/log_read.txt','UTF-8',(error, data) => {
    if(error){
        console.log("Async-read:"+error);
    }else{
        console.log("Async-read:"+data);// ---> fdfdfdgfdg
    } 
}); 
console.log("Async-read: Test asynchronous."); //nodejs, without blocking first print this

//26.3) write Sync | Async
fs.writeFileSync('./logs/log_write.txt' ,"Hello World"); // not good blocking

fs.writeFile('./logs/log_write.txt' ,"Hello kreshan",{flag:'a'}, (err) =>{
    if(err){
        console.log("Async-write:"+err);
    }else{
        console.log("Async-write success...");
    } 
});

//26.4 (27) fs promize(with promize)
console.log("fs-promizes start"); 
fs_p.readFile('./logs/log_read.txt','UTF-8')
  .then(data=>console.log("fs-promizes data:"+data))
  .catch(error => console.log("fs-promizes error:"+error));
console.log("fs-promizes end"); 

//26.5 (27) fs promize(with async function)
console.log("fs-promizes2 start"); 
async function readFile(){
    try{
        const data= await fs_p.readFile('./logs/log_read.txt','UTF-8');
        console.log("fs-promizes2 data:"+data);
    }catch(err){
        console.log("fs-promizes2 error:"+error);
    }
}
readFile();
console.log("fs-promizes2 end"); 

//28) Stream
const readStream= fs.createReadStream('./logs/log_read.txt',
{encoding:'utf8',highWaterMark:2} ); // 2 char in one chunk
const writeStream= fs.createWriteStream('./logs/log_write.txt');
// chunk streaming
readStream.on('data',(chunk) => {
    console.log("Stream chunk:"+chunk); //transfer chunk 2 by 2 (finalt full file transfered)
    writeStream.write(chunk)
})

//29) pipe streaming ==> readStream.pipe(zipthe file).pipe(writeStream); can do modification
readStream.pipe(writeStream);

//zip the file (transform)
const gzip = fs_zlib.createGzip();
const writeStream_zip= fs.createWriteStream('./logs/log_write.txt.zip');
readStream.pipe(gzip).pipe(writeStream_zip);
