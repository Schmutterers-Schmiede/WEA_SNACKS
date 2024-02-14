import { Component } from '@angular/core';
import { Order } from '../../Entities/Order';
import { OrderDataService } from '../../services/order-data.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {
  public orders:Order[] = [];

  constructor(
    private orderDataService:OrderDataService,
    private authenticationService:AuthenticationService
  ){}

  ngOnInit(){
    console.log(`access token: ${this.authenticationService.getLoggedInUserName()}`);
    
    this.orderDataService.getOrdersForUserAccessToken(
      this.authenticationService.getLoggedInUserName() ?? ''
    ).subscribe(res => this.orders = res)
    
  }
}
