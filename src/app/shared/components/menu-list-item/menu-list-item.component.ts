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

  addToCart(){
    const data = localStorage.getItem('snacks.shoppinCart') || '[]';
    const items: ShoppingCartItem[] = JSON.parse(data);
    const index:number = items.findIndex(item => item.id !== this.menuItem.id);
    if(index === -1){
      items.push({id: this.menuItem.id, amount: 0});
    }
    else{
      items[index].amount++;
    }
    localStorage.setItem('snacks.shoppingCart', JSON.stringify(items));
  }
  constructor(){}
}
