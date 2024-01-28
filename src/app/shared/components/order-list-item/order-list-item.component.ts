import { Component, Input } from '@angular/core';
import { Order } from '../../Entities/Order';
import { RestaurantDataService } from '../../services/restaurant-data-service.service';

@Component({
  selector: 'a.app-order-list-item',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['./order-list-item.component.scss']
})
export class OrderListItemComponent {
  @Input() order!:Order;
  public restaurantName!:string;

  constructor(
    private restaurantDataService:RestaurantDataService,
  ){}

  
  ngOnInit(){
    this.restaurantDataService.getRestaurantById(this.order.restaurantId)
      .subscribe(res => this.restaurantName = res.name ?? '');

      
  }
}
