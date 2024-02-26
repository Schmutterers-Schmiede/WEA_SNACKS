import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { authConfig } from './auth.config';
import { AuthenticationService } from './shared/services/authentication.service';
import { RestaurantDataService } from './shared/services/restaurant-data-service.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SNACKS';
  isLoggedIn!: boolean;
  username!: string;
  hasRestaurant: boolean = false;

  constructor(
    private restaurantDataService: RestaurantDataService,
    private oauthService: OAuthService,
    private authenticationService: AuthenticationService,
    private router:Router
  ) {
    this.configureWithNewConfigApi();    
  }

  handleLoginClick() {
    this.authenticationService.login();
    this.isLoggedIn = this.authenticationService.isLoggedIn();
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.ngOnInit();
      }
    })
  }

  handleLogoutClick() {
    this.authenticationService.logout();
    this.isLoggedIn = false;
    this.hasRestaurant = false;
    this.username = '';
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  private handleTokenReceived() {
    this.isLoggedIn = this.authenticationService.isLoggedIn();
    this.username = this.authenticationService.getLoggedInUserName();
    if (this.isLoggedIn) {
      this.restaurantDataService.restaurantExistsForUser(this.username).subscribe((res) => {
        this.hasRestaurant = res;
      });
    }
  }
  
  ngOnInit() {    
    
    let name = this.authenticationService.getLoggedInUserName();    
    this.username = name
    this.isLoggedIn = this.authenticationService.isLoggedIn();
    if (this.isLoggedIn) {
      this.restaurantDataService.restaurantExistsForUser(this.username).subscribe((res) => {
        this.hasRestaurant = res;        
      });
    }
  }

}
