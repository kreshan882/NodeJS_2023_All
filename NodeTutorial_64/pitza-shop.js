const EventEmitter= require('events');

class PitzaShop extends EventEmitter{
    constructor(){
        super();
        this.orderNumber=0;
    }

    order(topping,size){
        this.orderNumber++;
        this.emit('order',topping,size);
    }

    displayOrderNumber(){
        console.log(`Curr Order Number ${this.orderNumber}`);
    }
}

module.exports = PitzaShop;