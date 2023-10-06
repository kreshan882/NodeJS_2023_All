const math= require('./3_math');
const {add,sub}= require('./3_math');  // destructure (default expoer can use different name {addFunK})


//6) hello world
console.log("lll");

//10/11) can pass the patameter
(function(msg) {
    const superHero="rajani";
    console.log(msg,superHero);
})("Hello:");

(function(msg) {
    const superHero="kamal";
    console.log(msg,superHero);
})("Hi:");

//12) module wrapper constant
(function(exports,require,module,__filename,__dirname) {
    const superHero="kamal";
    console.log(__filename,superHero);
})("Hi:");

//13) Module Caching
//    store variable value in class varuable
const subuperhero=require("./superhero"); //----> spider
const batman=new subuperhero("kreshan");
//const BB=require("./superhero"); //----> kreshan
console.log("cashing val-----:"+batman.getName());  //----> kreshan

//14) Import Export Patterns...................
console.log(math.add(2,5));
console.log(add(2,6));

//15) import(required) & export(module.export)

//16) ES Modules [.MJS]

//17) Importing JSON and Watch Mode
console.log("17) Importing JSON and Watch Mode.................................");
const data=require("./data.json");
console.log(data);


