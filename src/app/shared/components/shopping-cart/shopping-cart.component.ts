import { Component } from '@angular/core';
import { MenuDataService } from '../../services/menu-data-service.service';
import { MenuItem } from '../../Entities/MenuItem';
import { ShoppingCartItem } from '../../interfaces/ShoppingCartItem';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  constructor(
    private menuDataService: MenuDataService
  ){}

  public shoppingCartItems:{item: MenuItem, amount:number}[] = [];
  
  ngOnInit(){
    let cart:ShoppingCartItem[] = JSON.parse(localStorage.getItem('snacks.shoppingCart') ?? '[]');
    for (let cartItem of cart){
      if(cartItem.item.id !== null){
        let itemId:string = cartItem.item.id ?? '';
        if(itemId !== ''){
          this.menuDataService.getById(itemId)
            .subscribe(res => this.shoppingCartItems.push({
              item: res,
              amount: cartItem.amount
            }));
        }
      }
    }
  }
}
