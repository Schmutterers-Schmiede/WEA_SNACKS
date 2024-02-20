import { DeliveryCondition } from "./DeliveryCondition";

export class Restaurant{  
  distance?:number;
  constructor(  public id?:string,
                public name?:string,
                public address?:string,
                public latitude?:number,
                public longitude?:number,
                public hours?:string,
                public minOrderTotal?:number,
                public logo?:string,
                public offersDelivery?:boolean,
                public deliveryConditions?:DeliveryCondition[]
    ){}
}