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

  userProfileSubject = new Subject<UserInfo>()
  userInfo!:UserInfo

  login(){
    this.oauthService.initCodeFlow();  
  }

  logout(){
    this.oauthService.logOut();
  }

  isLoggedIn(){
    return this.oauthService.hasValidAccessToken();
  }

  getLoggedInUserName(): Promise<string> {
    return this.oauthService.loadUserProfile().then(
      res => (res as UserInfo).info.name
    )
  }

  getAccessToken():string{
    return this.oauthService.getAccessToken();
  }

  register(username:string, password:string){

  }


}
