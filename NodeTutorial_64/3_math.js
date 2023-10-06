
//way 1
// const add= (a,b) => a+b;
// const sub= (a,b) => a-b;
// module.exports = {add,sub}; //more good -de-Structure the functions


//way 2
exports.add= (a,b) => {
    return a+b;
}
exports.sub= (a,b) => a-b;


// //way 3
// export default (a,b) => {
//     return a*b;
// }

//way4
//export default add;