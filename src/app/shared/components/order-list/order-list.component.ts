import { Component, Input } from '@angular/core';
import { Order } from '../../Entities/Order';
import { OrderDataService } from '../../services/order-data.service';
import { AuthenticationService } from '../../services/authentication.service';
import { RestaurantDataService } from '../../services/restaurant-data-service.service';
import { Restaurant } from '../../Entities/Restaurant';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {
  public orders: Order[] = [];
  @Input() mode = 'user';

  constructor(
    private orderDataService: OrderDataService,
    private authenticationService: AuthenticationService,
    private restaurantDataService: RestaurantDataService
  ) { }

  ngOnInit() {
    console.log(this.mode);
    
    if (this.mode === 'owner') {
      this.restaurantDataService.getRestaurantForUsername(this.authenticationService.getLoggedInUserName()).subscribe((restaurant: Restaurant) => {
        console.log(restaurant);        
        this.orderDataService.getOrdersForRestaurant(restaurant.id!).subscribe((orders: Order[]) => {
          this.orders = orders;          
          console.log(orders);
          
        });
      });
    }
    else {
      this.orderDataService.getOrdersForUser(
        this.authenticationService.getLoggedInUserName() ?? ''
      ).subscribe(res => this.orders = res);
    }
  }
}
