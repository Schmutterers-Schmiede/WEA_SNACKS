export class DeliveryCondition{
  id: string;
  distance: number;
  deliveryCost: number;
  minOrderTotal: number;
  FreeDeliveryMinOrderTotal: number;

  constructor(  id: string, 
                distance:number, 
                deliveryCost:number, 
                minOrderTotal:number, 
                FreeDeliveryMinOrderTotal:number
              ){
    this.id = id;
    this.distance = distance;
    this.deliveryCost = deliveryCost;
    this.minOrderTotal = minOrderTotal;
    this.FreeDeliveryMinOrderTotal = FreeDeliveryMinOrderTotal
  }

}

