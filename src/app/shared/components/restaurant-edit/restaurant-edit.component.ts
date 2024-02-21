import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Restaurant } from '../../Entities/Restaurant';
import { RestaurantDataService } from '../../services/restaurant-data-service.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styleUrls: ['./restaurant-edit.component.scss']
})
export class RestaurantEditComponent {
  public restaurant!:Restaurant;

  restaurantEditForm: FormGroup = this.fb.group({
    restaurantName: [''],
    address: [''],
    latitude: [''],
    longitude: [''],
    hours: [''],
    minOrderTotal: [''],
    offersDelivery: [''],
    deliveryConditions: ['']
  });

  constructor(
    private fb:FormBuilder,
    private restaurantDataService:RestaurantDataService,
    private authenticationService:AuthenticationService
    ){}

  ngOnInit(){        
    const username:string = this.authenticationService.getLoggedInUserName();
    this.restaurantDataService.getRestaurantForUsername(username).subscribe(
      (res) => {
        this.restaurant = res;              
        
        this.restaurantEditForm = this.fb.group({
          restaurantName: this.restaurant.name,
          address: this.restaurant.address,
          latitude: this.restaurant.latitude,
          longitude: this.restaurant.longitude,
          hours: this.restaurant.hours,
          minOrderTotal: this.restaurant.minOrderTotal,
          offersDelivery: this.restaurant.offersDelivery,
          deliveryConditions: this.restaurant.deliveryConditions
        })
      }
    )
  }
}
