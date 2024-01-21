import { Component } from '@angular/core';
import { MenuDataService } from '../../services/menu-data-service.service';
import { MenuItem } from '../../Entities/MenuItem';
import { ShoppingCartItem } from '../../interfaces/ShoppingCartItem';
import { Location, } from '@angular/common'
import { Router } from '@angular/router';
import { RestaurantDataService } from '../../services/restaurant-data-service.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  constructor(
    private location:Location,
    private restaurantDataService:RestaurantDataService
  ){}

  public shoppingCartItems:ShoppingCartItem[] = [];
  public cartIsEmpty:boolean = false;
  public restaurantName:string = '';
  public totalPrice:number = 0;

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
    this.restaurantDataService.getRestaurantById(rid).subscribe(res => this.restaurantName = res.name ?? '');
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
}
