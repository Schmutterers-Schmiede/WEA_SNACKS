import { DeliveryCondition } from "./DeliveryCondition";

export class Restaurant{
  id:string;
  name:string;
  address:string;
  latitude:number;
  longitude:number;
  hours:string;
  minOrderTotal:number;
  logo:string;
  offersDelivery:boolean;
  deliveryConditions:DeliveryCondition[];

  constructor(  id:string,
                name:string,
                address:string,
                latitude:number,
                longitude:number,
                hours:string,
                minOrderTotal:number,
                logo:string,
                offersDelivery:boolean,
                deliveryCoditions:DeliveryCondition[]
    ){
    this.id = id;
    this.name = name;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
    this.hours = hours;
    this.minOrderTotal = minOrderTotal;
    this.logo = logo;
    this.offersDelivery = offersDelivery;
    this.deliveryConditions = deliveryCoditions;
  }
}