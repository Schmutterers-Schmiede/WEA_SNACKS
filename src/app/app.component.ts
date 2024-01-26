import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { AuthenticationService } from './shared/services/authentication.service';
import { MockAuthenticationService } from './shared/services/mock-authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SNACKS';

  constructor(
    private oauthService:OAuthService, 
    //private authenticationService: AuthenticationService
    private mockAuthenticationService:MockAuthenticationService
    ){
   this.configureWithNewConfigApi(); 
  }

  public handleLoginClick(){
    
  }

  
  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
  
}
