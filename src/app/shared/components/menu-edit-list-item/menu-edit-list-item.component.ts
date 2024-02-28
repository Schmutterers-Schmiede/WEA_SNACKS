import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from '../../Entities/MenuItem';
import { MenuDataService } from '../../services/menu-data-service.service';

@Component({
  selector: 'app-menu-edit-list-item',
  templateUrl: './menu-edit-list-item.component.html',
  styleUrls: ['./menu-edit-list-item.component.scss']
})
export class MenuEditListItemComponent {
  @Input() menuItem:MenuItem = new MenuItem();
  @Input() categories:string[] = [];
  @Output() deleteMenuItemEvent = new EventEmitter();
  @Output() updateMenuItemEvent = new EventEmitter();
  
  constructor(
    private menuDataService:MenuDataService
  ){}

  handleUpdateClick(){
    this.menuDataService.updateMenuItem(this.menuItem).subscribe((res:boolean) =>{
      if(res){
        this.updateMenuItemEvent.emit();
      }
    })
  }

  handleDeleteClick(){
    this.menuDataService.deleteMenuItem(this.menuItem.id!).subscribe((res:boolean) => {
      if(res){
        this.updateMenuItemEvent.emit(this.menuItem.id);
      }
    });
  }  

}
