class subuperhero{
    constructor (name){
        this.name=name;
    }

    getName(){
        return this.name;
    }

    setName(name){
        this.name=name;
    }

}

//module.exports= new subuperhero("batman");
module.exports= subuperhero;