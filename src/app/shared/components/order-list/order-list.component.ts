import { Component } from '@angular/core';
import { Order } from '../../Entities/Order';
import { OrderDataService } from '../../services/order-data.service';
import { MockAuthenticationService } from '../../services/mock-authentication.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {
  public orders:Order[] = [];

  constructor(
    private orderDataService:OrderDataService,
    private authenticationService:MockAuthenticationService
  ){}

  ngOnInit(){
    console.log(`access token: ${this.authenticationService.getAccessToken()}`);
    
    this.orderDataService.getOrdersForUserAccessToken(
      this.authenticationService.getAccessToken() ?? ''
    ).subscribe(res => this.orders = res)
    
  }
}
