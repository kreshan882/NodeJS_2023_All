//node --watch .\5_EventLoop.js
//43) Microtask Queues
//43.1) process.nextTick() Q -> Promise.resolve() Q
console.log("First"); //1
Promise.resolve().then(()=> console.log("Second Promise.resolve()") );// 4- pass to nextTick Q
process.nextTick(()=> console.log("Second process.nextTick()") );// 3- pass to nextTick Q
setTimeout(()=>console.log("Second Timeout() Q 1000"),1000); //5  setTimeout Q
setTimeout(()=>console.log("Second Timeout() Q 500"),500); //5  setTimeout Q
setTimeout(()=>console.log("Second Timeout() Q 0"),0); //5  setTimeout Q
console.log("Third"); //2