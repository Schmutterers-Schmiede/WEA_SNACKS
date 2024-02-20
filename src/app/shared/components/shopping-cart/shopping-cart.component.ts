import { Component } from '@angular/core';
import { MenuDataService } from '../../services/menu-data-service.service';
import { MenuItem } from '../../Entities/MenuItem';
import { IShoppingCartItem } from '../../interfaces/IShoppingCartItem';
import { Location, } from '@angular/common'
import { Router } from '@angular/router';
import { RestaurantDataService } from '../../services/restaurant-data-service.service';
import { Restaurant } from '../../Entities/Restaurant';
import { OrderMenuItem } from '../../Entities/OrderMenuItem';
import { Order } from '../../Entities/Order';
import { OrderDataService } from '../../services/order-data.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ILocation } from '../../interfaces/ILocation';
import { convertDistance, getDistance } from 'geolib';
import { DeliveryCondition } from '../../Entities/DeliveryCondition';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {


  constructor(
    private location: Location,
    private restaurantDataService: RestaurantDataService,
    private authenticationService: AuthenticationService,
    private orderDataService: OrderDataService
  ) { }

  public shoppingCartItems: IShoppingCartItem[] = [];
  public cartIsEmpty: boolean = false;
  public restaurant: Restaurant = new Restaurant();
  public address: string = '';
  public errors: string[] = []
  
  
  userLocation!:ILocation;
  public totalPrice: number = 0;
  public itemsPrice: number = 0;
  public deliveryCost: number = 0;

  getUserLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLocation = {
          latitude : position.coords.latitude,
          longitude : position.coords.longitude
        }
        console.log(position);
      });
    } else {
      console.log('geolocation not supported');      
    }
  }

  handleRemoveItemEvent(index: number) {
    this.removeItemFromCart(index);
    this.refreshCart();
  }

  handlePriceChangeEvent() {
    this.refreshCart();
    
  }

  refreshCart() {
    this.shoppingCartItems = JSON.parse(localStorage.getItem('snacks.shoppingCart') ?? '[]');

    if (this.shoppingCartItems.length === 0) {
      this.cartIsEmpty = true;
    }
    this.calculatePriceItemsOnly();
    this.calculateDeliveryCost();
    this.calculatePriceTotal();
  }

  ngOnInit() {
    this.refreshCart();
    const rid: string = this.shoppingCartItems[0].restaurantId ?? '';
    this.restaurantDataService.getRestaurantById(rid).subscribe(res => {
      this.restaurant = res;
      this.calculatePriceItemsOnly();
      this.calculateDeliveryCost();
      this.calculatePriceTotal();
    });
    this.getUserLocation();
  }

  goBack() {
    this.location.back();
  }

  removeItemFromCart(index: number) {
    this.shoppingCartItems.splice(index, 1)
    localStorage.setItem('snacks.shoppingCart', JSON.stringify(this.shoppingCartItems));
    if (this.shoppingCartItems.length == 0)
      this.cartIsEmpty = true;
  }

  calculatePriceItemsOnly() {
    this.itemsPrice = 0;
    for (const cartItem of this.shoppingCartItems) {
      const price = cartItem.item.price ?? 0;
      this.itemsPrice += price * cartItem.amount;
    }
    console.log('item price: ', this.itemsPrice);    
  }

  calculateDeliveryCost(){
    if(!this.restaurant.offersDelivery) {
      this.deliveryCost = 0;
      return;
    }

    let distance:number = convertDistance(getDistance(
      this.userLocation,
      {latitude: this.restaurant.latitude!, longitude: this.restaurant.longitude!}
    ), 'km');
    
    for (const dc of this.restaurant.deliveryConditions!){
      if(distance >= dc.distance!) 
        this.deliveryCost = dc.deliveryCost!
      else break;
    }    
    console.log('delivery cost: ', this.deliveryCost);    
  }

  calculatePriceTotal(){
    if(!this.restaurant.offersDelivery) 
      this.totalPrice = this.itemsPrice;
    else 
      this.totalPrice = this.itemsPrice + this.deliveryCost;    
    console.log('total:', this.totalPrice);
    
  }

  submitOrder() {
    if (this.authenticationService.isLoggedIn()) {
      if(this.itemsPrice > this.restaurant.minOrderTotal!){

      
        let menuItems: OrderMenuItem[] = [];

        for (let item of this.shoppingCartItems) {
          menuItems.push(new OrderMenuItem(
            item.item.id ?? '',
            item.item.name ?? '',
            item.item.category ?? '',
            item.item.description ?? '',
            item.item.price ?? 0,
            item.amount ?? ''
          ))
        }

        if (this.address.length > 0) {
          let order: Order = new Order(
            '',
            this.restaurant.id ?? '',
            this.authenticationService.getLoggedInUserName() ?? '',
            this.address,
            'In Preparation',
            new Date(),
            menuItems
          )
          this.orderDataService.placeOrder(order).subscribe(
            res => console.log(res)
          );
        }
        else {
          this.errors = [];
          this.errors.push('Address is required');
        }
      }else{
        const error:string = 'Your Order must be at least ' + this.restaurant.minOrderTotal + 'EUR'
        if(!this.errors.includes(error))
          this.errors.push(error);
      }
    }else{
      this.errors = [];
      this.errors.push('You must be logged in to place an order.');
    }
  }
}
