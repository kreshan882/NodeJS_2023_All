const date = require('date-and-time');

//52) Using Packages
function greet(name){
    console.log('Publish to npm Registery');
    const now = new Date();
    console.log("DataK: "+date.format(now, 'YYYY/MM/DD HH:mm:ss'));
}

greet("kreshan");
module.exports = greet;

