import { Component } from '@angular/core';
import { RestaurantDataService } from '../../services/restaurant-data-service.service';
import { Restaurant } from '../../Entities/Restaurant';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-management',
  templateUrl: './restaurant-management.component.html',
  styleUrls: ['./restaurant-management.component.scss']
})
export class RestaurantManagementComponent {
  constructor(
    private restaurantDataService:RestaurantDataService,
    private authenticationService:AuthenticationService,
    private router:Router,
    private route:ActivatedRoute
    ){

  }

  restaurant!:Restaurant;

  navigateToMenu(route:string){
    this.router.navigate([route], {relativeTo: this.route})
  }

  ngOnInit(){
    this.restaurantDataService.getRestaurantForUsername(this.authenticationService.getLoggedInUserName())
      .subscribe((res) => {
        this.restaurant = res;
        
      });

  }
}
