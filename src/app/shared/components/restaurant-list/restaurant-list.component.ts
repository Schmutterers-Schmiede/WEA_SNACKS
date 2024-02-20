import { Component, EventEmitter, Output } from '@angular/core';
import { Restaurant } from '../../Entities/Restaurant';
import { RestaurantDataService } from '../../services/restaurant-data-service.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent {
  restaurants: Restaurant[] = [];

  @Output() showDetailsEvent = new EventEmitter<Restaurant>();

  constructor(private restaurantDataService: RestaurantDataService){}

  ngOnInit(){
    
    this.restaurantDataService.getAllRestaurants().subscribe(res => this.restaurants = res);
    console.log(this.restaurants);
    
  }

  showDetails(restaurant: Restaurant){
    this.showDetailsEvent.emit(restaurant);
  }
}
