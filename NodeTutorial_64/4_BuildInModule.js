const path=require("node:path");
const os= require('os');


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
    let number=[1,2,3,4,5];
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

//21) 