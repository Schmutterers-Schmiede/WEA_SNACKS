import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { RestaurantDataService } from '../../services/restaurant-data-service.service';
import { Restaurant } from '../../Entities/Restaurant';
import { DeliveryCondition } from '../../Entities/DeliveryCondition';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-delivery-condition-edit',
  templateUrl: './delivery-condition-edit.component.html',
  styleUrls: ['./delivery-condition-edit.component.scss']
})
export class DeliveryConditionEditComponent {

  restaurant:Restaurant = new Restaurant();
  newDeliverycondition:DeliveryCondition = new DeliveryCondition();
  
  errors:string[] = [];

  constructor(
    private authenticationService:AuthenticationService,
    private restaurantDataService:RestaurantDataService
    ){}

    updateHandler(dc:DeliveryCondition){
      console.log('parent update handler');
      const username:string = this.authenticationService.getLoggedInUserName();
      this.restaurantDataService.updateDeliveryCondition({delConDto:dc, apiKey:username}).subscribe((res) => {
        if(res){
          const updateIndex = this.restaurant.deliveryConditions!.findIndex(delcon => delcon.id === dc.id);
          this.restaurant.deliveryConditions![updateIndex] = dc;
        }
      });
    }

    deleteHandler(dcid:string){      
      this.restaurantDataService.deleteDeliveryCondition(dcid).subscribe((res:boolean) =>{
        if(res){
          const deleteIndex = this.restaurant.deliveryConditions!.findIndex(dc => dc.id === dcid);
          this.restaurant.deliveryConditions?.splice(deleteIndex, 1);
        }
      });
    }

    addFormHasInputErrors():boolean{
      return this.errors.length > 0;
    }

    updateErrors(){
      this.errors = [];
      
      if( this.newDeliverycondition.distance !== undefined)
        this.errors.push('You must specify a distance');  
      
      if(this.newDeliverycondition.deliveryCost !== undefined)
        this.errors.push('You must specify a delivery cost');              
        
    }

    addClickHandler(){
      console.log(this.newDeliverycondition);      
      const username:string = this.authenticationService.getLoggedInUserName();
      if(!this.addFormHasInputErrors()){
        this.restaurantDataService.createDeliveryCondition(this.newDeliverycondition, this.restaurant.id!, username).subscribe((res:boolean) => {
          if(res){
            this.ngOnInit();            
          }
        });
      }
    }
    
    ngOnInit(){
      const username: string = this.authenticationService.getLoggedInUserName();
      this.restaurantDataService.getRestaurantForUsername(username)
        .subscribe((res) => {
          this.restaurant = res;  
          this.newDeliverycondition = new DeliveryCondition('00000000-0000-0000-0000-000000000000',this.restaurant.id,0,0,0,0);    

          console.log(this.restaurant);
        });
    }
}
