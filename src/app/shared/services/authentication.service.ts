import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private oauthService: OAuthService) { }

  public userName:string = '';

  login(username: string, password: string): boolean {//params eig unnötig
    this.oauthService.initCodeFlow();
    return true;//spielt eigentlich keine rolle, wird aber vom rest des codes gebraucht
  }

  isLoggedIn() {
    return  this.oauthService.hasValidAccessToken() &&
            this.oauthService.hasValidIdToken();
  }

  getUserName(){
    return this.userName
  }

}
