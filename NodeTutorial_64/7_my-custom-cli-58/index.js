#!/usr/bin/env node

const inquirer =require("inquirer");

//const yargs=require("yargs");
//const {argv} = yargs(process.argv);

console.log("Kre CLI pokeapi.co Test");
//console.log("Parameter: "+process.argv);
const printFiveMoves= async(pokemanName)=>{
    const response= await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemanName}`
    );
    const pokemon= await response.json();
    const moves_const =pokemon.moves.map(({move})=>move.name);
    console.log(moves_const.slice(0,5));
};

//get  seq ask question
const prompt= inquirer.createPromptModule();
prompt([{
    type:"input",
    name:"pokemon",
    message:"Enter function name(charmander|mew) to run?"
}])
.then((anser) => {
    const pokemon=anser.pokemon;
    console.log("-------------->"+pokemon);
    printFiveMoves(pokemon);
})


//printFiveMoves("charmander");
//printFiveMoves(argv.pokemon);  // run time parameter pass(>> kre-pokedex --pokemon=charmander )


