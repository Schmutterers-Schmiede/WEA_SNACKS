import { Component, Input } from '@angular/core';
import { Restaurant } from '../../Entities/Restaurant';

@Component({
  selector: 'app-restaurant-list-item',
  templateUrl: './restaurant-list-item.component.html',
  styleUrls: ['./restaurant-list-item.component.scss']
})
export class RestaurantListItemComponent {
  @Input() restaurant:Restaurant = new Restaurant();

  constructor() {}
}
