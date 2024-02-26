export class DeliveryCondition{

  constructor(  public id?: string, 
                public restaurantId?:string,
                public distance?:number, 
                public deliveryCost?:number, 
                public minOrderTotal?:number, 
                public FreeDeliveryMinTotal?:number
              ){
    
  }

}

