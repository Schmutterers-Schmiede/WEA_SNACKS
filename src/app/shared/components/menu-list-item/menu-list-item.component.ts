import { Component, Input } from '@angular/core';
import { MenuItem } from '../../Entities/MenuItem';
import { ShoppingCartItem } from '../../interfaces/ShoppingCartItem'
@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss']
})
export class MenuListItemComponent {
  @Input() menuItem:MenuItem = new MenuItem()
  @Input() restaurantId?:string = '';
  @Input() buttonVisible:boolean = true;

  addToCart(){
    const data = localStorage.getItem('snacks.shoppingCart') || '[]';
    const cart: ShoppingCartItem[] = JSON.parse(data);

    //if item is from different restaurant than the others, show error and return
    if(!(cart.length === 0)){
      if(this.restaurantId !== cart[0].restaurantId){
        alert("you can only order from one restaurant at a time.");
        return;
      }
    }
    
    //if item is already in cart, increase amount, else add to cart
    const index:number = cart.findIndex(cartItem => cartItem.item.id === this.menuItem.id);
    if(index === -1){
      cart.push({
        restaurantId: this.restaurantId, 
        item: this.menuItem, 
        amount: 1
      });
    }
    else{
      cart[index].amount++;
    }

    

    localStorage.setItem('snacks.shoppingCart', JSON.stringify(cart));
  }

  ngOnInit(){
    console.log(this.menuItem);
    
  }
  constructor(){}
}
