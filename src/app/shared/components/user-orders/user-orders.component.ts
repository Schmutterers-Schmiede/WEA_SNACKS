import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Order } from '../../Entities/Order';
import { RestaurantDataService } from '../../services/restaurant-data-service.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent {
  constructor(
    private authenticationService:AuthenticationService,
    private restaurantDataService:RestaurantDataService){}

  orders:Order[] = [];

  ngOnInit(){
    this.restaurantDataService.getOrdersForUser(this.authenticationService.getLoggedInUserName())
      .subscribe((res:Order[]) => {
        this.orders = res;
      });
  }
}
