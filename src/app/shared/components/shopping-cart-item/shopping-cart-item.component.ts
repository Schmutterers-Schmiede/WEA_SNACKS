import { Component, Input } from '@angular/core';
import { ShoppingCartItem } from '../../interfaces/ShoppingCartItem'
import { MenuItem } from '../../Entities/MenuItem';
import { MenuDataService } from '../../services/menu-data-service.service';
@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent {

  @Input() cartItem:ShoppingCartItem = {restaurantId:'', item: new MenuItem(), amount:0};


}
