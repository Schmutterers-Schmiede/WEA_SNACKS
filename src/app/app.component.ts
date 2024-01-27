import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { MockAuthenticationService } from './shared/services/mock-authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SNACKS';
  isLoggedIn!:boolean;
  private loginSubscription!:Subscription;
  username!:string;

  constructor(
    private oauthService:OAuthService, 
    //private authenticationService: AuthenticationService
    private mockAuthenticationService:MockAuthenticationService
    ){
    this.configureWithNewConfigApi(); 
    console.log('appcomponent constructor')
  }
  
  ngOnInit(){
    this.loginSubscription = this.mockAuthenticationService.isLoggedIn.subscribe(
      (value) => {
        this.isLoggedIn = value;
        if(this.isLoggedIn){
          this.username = this.mockAuthenticationService.getLoggedInUsername() ?? '';
        }
      }
    )
    console.log('ngOnInit in appComponent')
  }

  handleLogoutClick(){
    this.mockAuthenticationService.logout();
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
  
}
