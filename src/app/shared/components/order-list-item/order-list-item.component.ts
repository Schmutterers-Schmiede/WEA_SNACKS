import { Component, Input } from '@angular/core';
import { Order } from '../../Entities/Order';
import { RestaurantDataService } from '../../services/restaurant-data-service.service';
import { Router } from '@angular/router';
import { OrderDataService } from '../../services/order-data.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-order-list-item',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['./order-list-item.component.scss']
})
export class OrderListItemComponent {
  @Input() order!:Order;
  @Input() mode = 'user'
  public restaurantName!:string;
  public orderStates:string[] = ['In Preparation', 'On the way', 'Ready for Pickup', 'Finished', 'Canceled']
  constructor(
    private restaurantDataService:RestaurantDataService,
    private orderDataService:OrderDataService,
    private router:Router,
    private authenticationService: AuthenticationService
  ){}

  handleDetailsClick(){
    this.router.navigate(['/userOrders/', this.order.id])
  }

  handleUpdateClick(){    
    this.orderDataService.updateOrderStatus(
      this.order.id, 
      this.orderStates.indexOf(this.order.status) + 1, 
      this.authenticationService.getLoggedInUserName()
    ).subscribe((res:boolean) => {
      if(res)
        this.ngOnInit();
    });
    
  }

  ngOnInit(){    
    this.restaurantDataService.getRestaurantById(this.order.restaurantId)
      .subscribe(res => this.restaurantName = res.name ?? '');
  }
}
