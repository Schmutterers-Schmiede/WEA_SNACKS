import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IShoppingCartItem } from '../../interfaces/IShoppingCartItem'
import { MenuItem } from '../../Entities/MenuItem';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent {
  
  @Input() cartItem:IShoppingCartItem = {restaurantId:'', item: new MenuItem(), amount:0};
  @Output() removeItemEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() priceChangeEventEvent:EventEmitter<void> = new EventEmitter<void>();
  
  public price:number = 0;

  onPlusClick(){
    let cart:IShoppingCartItem[] = JSON.parse(localStorage.getItem('snacks.shoppingCart') ?? '[]');
    let index = cart.findIndex(item => item.item.id === this.cartItem.item.id);
    
    this.cartItem.amount++;
    cart[index].amount = this.cartItem.amount;
  
    localStorage.setItem('snacks.shoppingCart',JSON.stringify(cart));
    this.priceChangeEventEvent.emit();
    this.calculatePrice();
  }
  
  onMinusClick(){
    let cart:IShoppingCartItem[] = JSON.parse(localStorage.getItem('snacks.shoppingCart') ?? '[]');
    let index = cart.findIndex(item => item.item.id === this.cartItem.item.id);

    if(this.cartItem.amount == 1){
      this.removeItemEvent.emit(index);
    }
    else{
      this.cartItem.amount--;
      cart[index].amount = this.cartItem.amount;
      localStorage.setItem('snacks.shoppingCart',JSON.stringify(cart));
      this.priceChangeEventEvent.emit();
      this.calculatePrice();
    }
  }
  
  calculatePrice(){
    this.price = (this.cartItem.item.price ?? 0) * this.cartItem.amount;
  }


  onDeleteClick(){
    let cart:IShoppingCartItem[] = JSON.parse(localStorage.getItem('snacks.shoppingCart') ?? '[]');
    let index = cart.findIndex(item => item.item.id === this.cartItem.item.id);
    this.removeItemEvent.emit(index);
  }

  ngOnInit(){
    this.calculatePrice();
  }
  
}
