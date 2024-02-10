import { Component } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { MockAuthenticationService } from './shared/services/mock-authentication.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SNACKS';
  isLoggedIn!:boolean;
  username!:string;

  constructor(
    private oauthService:OAuthService, 
    private authenticationService: AuthenticationService,
    private mockAuthenticationService:MockAuthenticationService
    ){
    this.configureWithNewConfigApi(); 
    console.log('appcomponent constructor')
  }

  handleLoginClick(){
    this.authenticationService.login();
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
