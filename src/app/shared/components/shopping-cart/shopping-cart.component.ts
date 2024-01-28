import { Component } from '@angular/core';
import { MenuDataService } from '../../services/menu-data-service.service';
import { MenuItem } from '../../Entities/MenuItem';
import { ShoppingCartItem } from '../../interfaces/ShoppingCartItem';
import { Location, } from '@angular/common'
import { Router } from '@angular/router';
import { RestaurantDataService } from '../../services/restaurant-data-service.service';
import { Restaurant } from '../../Entities/Restaurant';
import { MockAuthenticationService } from '../../services/mock-authentication.service';
import { OrderMenuItem } from '../../Entities/OrderMenuItem';
import { Order } from '../../Entities/Order';
import { OrderDataService } from '../../services/order-data.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {

  constructor(
    private location:Location,
    private restaurantDataService:RestaurantDataService,
    private authenticationService:MockAuthenticationService,
    private orderDataService:OrderDataService
  ){}

  public shoppingCartItems:ShoppingCartItem[] = [];
  public cartIsEmpty:boolean = false;
  public restaurant:Restaurant = new Restaurant();
  public totalPrice:number = 0;
  public address:string = '';
  public errors:string[] = []

  handleRemoveItemEvent(index:number){
    this.removeItemFromCart(index);
    this.calculateTotalPrice();
  }

  handlePriceChangeEvent(){
    this.calculateTotalPrice();
  }

  refreshCart(){
    this.shoppingCartItems = JSON.parse(localStorage.getItem('snacks.shoppingCart') ?? '[]');
    
    if(this.shoppingCartItems.length === 0){
      this.cartIsEmpty = true;
    }
    this.calculateTotalPrice();
  }
  
  ngOnInit(){
    this.refreshCart();
    const rid:string = this.shoppingCartItems[0].restaurantId ?? '';
    this.restaurantDataService.getRestaurantById(rid).subscribe(res => this.restaurant = res);
    this.calculateTotalPrice();
  }

  goBack(){
    this.location.back();
  }

  removeItemFromCart(index:number){    
    this.shoppingCartItems.splice(index, 1)
    localStorage.setItem('snacks.shoppingCart',JSON.stringify(this.shoppingCartItems));
    if(this.shoppingCartItems.length == 0) 
      this.cartIsEmpty = true;
  }

  calculateTotalPrice(){
    this.totalPrice = 0;
    for (const cartItem of this.shoppingCartItems){
      const price = cartItem.item.price ?? 0;
      this.totalPrice += price * cartItem.amount;
    }
  }

  submitOrder(){
    let menuItems:OrderMenuItem[] = [];

    for(let item of this.shoppingCartItems){
      menuItems.push(new OrderMenuItem(
        item.item.id ?? '',
        item.item.name ?? '',
        item.item.category ?? '',
        item.item.description ?? '',
        item.item.price ?? 0,
        item.amount ?? ''
      ))
    }

    if(this.address.length > 0){
      let order:Order = new Order(
          '',
          this.restaurant.id ?? '',
          this.authenticationService.getAccessToken() ?? '',
          this.address,
          'In Preparation',
          new Date(),
          menuItems
      )
      this.orderDataService.placeOrder(order).subscribe(
        res => console.log(res)
      );
    }
    else{
      this.errors = [];
      this.errors.push('Address is required');
    }
  }
}
