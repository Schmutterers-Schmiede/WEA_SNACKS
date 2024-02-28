import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { RestaurantDataService } from '../../services/restaurant-data-service.service';
import { MenuDataService } from '../../services/menu-data-service.service';
import { Restaurant } from '../../Entities/Restaurant';
import { MenuItem } from '../../Entities/MenuItem';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})
export class MenuEditComponent {
  constructor(
    private authenticationService:AuthenticationService,
    private restaurantDataService:RestaurantDataService,
    private menuDataService:MenuDataService
    ){}

  restaurant:Restaurant = new Restaurant();
  menu:MenuItem[] = [];
  categories:string[] = [];
  newMenuItem:MenuItem = new MenuItem();
  errors:string[] = [];

  eventHandler(){
    this.ngOnInit();
  }

  addClickHandler(){
    console.log(this.newMenuItem);
    
    this.updateErrors();
    if(!this.addFormHasInputErrors()){
      this.menuDataService.CreateMenuItem(this.newMenuItem, this.restaurant.id!).subscribe((res:boolean) => {
        if(res){
          console.log(res);
          
          this.ngOnInit();
        }
      })
    }
  }

  addFormHasInputErrors():boolean{
    return this.errors.length > 0;
  }


  updateErrors(){
    this.errors = [];
    if(this.newMenuItem.category === undefined) 
      this.errors.push('You must specify a category');
    if(this.newMenuItem.name === undefined) 
      this.errors.push('You must specify a name');
    if(this.newMenuItem.price === undefined) 
      this.errors.push('You must specify a price');
  }

  ngOnInit(){
    this.menuDataService.getCategoryNames().subscribe((res:string[]) =>{
      this.categories = res;
      console.log(res);
      
    })
    this.restaurantDataService.getRestaurantForUsername(
      this.authenticationService.getLoggedInUserName())
      .subscribe((res:Restaurant) => {
        this.restaurant = res;
        this.menuDataService.getAllForRestaurantId(res.id!).subscribe((res:MenuItem[]) => {
          this.menu = res;
        });
    });
  }
}
