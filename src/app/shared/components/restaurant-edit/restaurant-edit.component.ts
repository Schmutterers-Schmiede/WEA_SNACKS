import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Restaurant } from '../../Entities/Restaurant';
import { RestaurantDataService } from '../../services/restaurant-data-service.service';
import { AuthenticationService } from '../../services/authentication.service';
import { RestaurantRFormErrorMessages } from './restaurant-edit-error-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styleUrls: ['./restaurant-edit.component.scss']
})
export class RestaurantEditComponent {

  restaurant: Restaurant = new Restaurant();
  restaurantEditForm!: FormGroup;
  errors: { [key: string]: string } = {};

  handleChange(){ this.updateErrorMessages(); }

  constructor(
    private fb: FormBuilder,
    private restaurantDataService: RestaurantDataService,
    private authenticationService: AuthenticationService,
    private router:Router
  ) { }

  initForm() {
    this.restaurantEditForm = this.fb.group({
      restaurantName: [
        this.restaurant.name,
        [
          Validators.required,
          Validators.minLength(4)
        ]],
      address: [
        this.restaurant.address,
        [
          Validators.required
        ]
      ],
      latitude: [
        this.restaurant.latitude,
        [
          Validators.required,
          Validators.pattern('^[0-9]{2}\.[0-9]{6}$')
        ]
      ],
      longitude: [
        this.restaurant.longitude,
        [
          Validators.required,
          Validators.pattern('^[0-9]{2}\.[0-9]{6}$')
        ]
      ],
      hours: [
        this.restaurant.hours,
        [
          Validators.required
        ]
      ],
      minOrderTotal: [
        this.restaurant.minOrderTotal,
        [
          Validators.required,
          Validators.pattern('^[0-9]*\.[0-9]{2}$')
        ]
      ],
      offersDelivery: [this.restaurant.offersDelivery ? 'delivery' : 'pickup']
    });
    this.restaurantEditForm.statusChanges.subscribe(() => {this.updateErrorMessages(); console.log('changes detected');})
  }

  updateRestaurant(){
    this.restaurantDataService.updateRestaurant(this.restaurant)
      .subscribe((res:boolean) => {
        if(res){
          window.location.reload();
          console.log('update successful');
        }        
      });
  }

  deleteRestaurant(){
    if(window.confirm('This will permanently delete your Restaurant. Are you sure you want to proceed?')){
      this.restaurantDataService.deleteRestaurant(this.restaurant.id!)
      .subscribe((res:boolean) => {
        if(res){          
          this.router.navigate(['']);          
        }
        else{
          console.log('something went wrong');
        }
      })
    }
  }

  ngOnInit() {
    const username: string = this.authenticationService.getLoggedInUserName();
    if (username) {
      this.restaurantDataService.getRestaurantForUsername(username).subscribe(
        (res) => {
          this.restaurant = res;
          this.initForm();
      });
    }
    //this.initForm();
  }

  updateErrorMessages(){        
    this.errors = {}
    for(const message of RestaurantRFormErrorMessages){
      const control = this.restaurantEditForm.get(message.forControl);      
      
      if (control &&
        control.dirty &&
        control.invalid &&
        control.errors != null &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
