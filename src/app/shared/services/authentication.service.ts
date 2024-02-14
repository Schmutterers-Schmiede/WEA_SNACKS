import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable, Subject } from 'rxjs';

export interface UserInfo{
  info: {
    name:string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  constructor(private oauthService: OAuthService){
    
  }

  username:string = '';

  login(){
    this.oauthService.initCodeFlow();  
  }

  logout(){
    this.oauthService.logOut();
  }

  isLoggedIn(){
    return this.oauthService.hasValidAccessToken();
  }

  getLoggedInUserName(){
    let userClaims: any = this.getIdentityClaims();
    return userClaims.name ? userClaims.name : '';
  }

  getIdentityClaims():string{
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims: null;
  }

  

}
