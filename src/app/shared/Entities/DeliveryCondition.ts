export class DeliveryCondition{

  constructor(  public id?: string, 
                public distance?:number, 
                public deliveryCost?:number, 
                public minOrderTotal?:number, 
                public FreeDeliveryMinOrderTotal?:number
              ){
    
  }

}

