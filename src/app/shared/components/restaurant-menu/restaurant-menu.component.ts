import { Component, Input } from '@angular/core';
import { Restaurant } from '../../Entities/Restaurant';
import { RestaurantDataService } from '../../services/restaurant-data-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from '../../Entities/MenuItem';
import { MenuDataService } from '../../services/menu-data-service.service';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.scss']
})
export class RestaurantMenuComponent {
  
  @Input() restaurant: Restaurant = new Restaurant();
  menu:MenuItem[] = [];

  constructor(
    private restaurantDataService: RestaurantDataService,
    private menuDataService:MenuDataService,
    private route: ActivatedRoute
    ){}

  ngOnInit(){
    const params = this.route.snapshot.params;

    this.restaurantDataService.getRestaurantById(params['id'])
      .subscribe(res => this.restaurant = res);

    this.menuDataService.getAllForRestaurantId(params['id'])
      .subscribe(res => this.menu = res);
  }
}
