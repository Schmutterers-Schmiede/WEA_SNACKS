import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { authConfig } from './auth.config';
import { AuthenticationService } from './shared/services/authentication.service';

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
    ){
    this.configureWithNewConfigApi(); 
    console.log('appcomponent constructor')
  }

  handleLoginClick(){
    this.authenticationService.login();
  }

  handleLogoutClick(){
    this.authenticationService.logout();
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  ngOnInit(){
      let name = this.authenticationService.getLoggedInUserName();
      console.log(name);
      this.username = name
      this.isLoggedIn = this.authenticationService.isLoggedIn();
  }
  
}
