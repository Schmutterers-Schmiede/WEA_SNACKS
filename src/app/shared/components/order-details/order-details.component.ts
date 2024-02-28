import { Component, Input } from '@angular/core';
import { Order } from '../../Entities/Order';
import { OrderDataService } from '../../services/order-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantDataService } from '../../services/restaurant-data-service.service';
import { Location } from '@angular/common';
import { Restaurant } from '../../Entities/Restaurant';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  public order!:Order
  public restaurant!:Restaurant;
  public total:number = 0;

  constructor(
    private orderDataService:OrderDataService,
    private restaurantDataService:RestaurantDataService,
    private route:ActivatedRoute,
    private location:Location
  ){}

  ngOnInit(){
    
    const params = this.route.snapshot.params;
    this.orderDataService.getOrderById(params['id']).subscribe(res => {
      this.order = res;
      // console.log(this.order);
      console.log(res);
      
      this.restaurantDataService.getRestaurantById(this.order.restaurantId).subscribe(res => this.restaurant = res ?? '');
      
      for(let item of this.order.menuItems){
        this.total += item.price ?? 0; 
      }
    });
  }

  goBack(){
    this.location.back();
  }
}
