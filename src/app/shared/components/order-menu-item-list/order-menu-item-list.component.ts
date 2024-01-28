import { Component, Input } from '@angular/core';
import { MenuItem } from '../../Entities/MenuItem';

@Component({
  selector: 'app-order-menu-item-list',
  templateUrl: './order-menu-item-list.component.html',
  styleUrls: ['./order-menu-item-list.component.scss']
})
export class OrderMenuItemListComponent {
  @Input() menuItems:MenuItem[] = [];

  constructor(){}

  ngOnInit(){
    console.log(this.menuItems);
    
  }
}
