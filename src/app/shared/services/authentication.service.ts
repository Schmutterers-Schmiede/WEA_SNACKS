import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  constructor(private oauthService: OAuthService){}

  login(){
    this.oauthService.initCodeFlow();  

  }

  getUserName(){
    const accessToken:string = this.getAccessToken();

    const headers = new HttpHeaders({

      Authorization: `Bearer ${accessToken}`
    });
    

  }

  getAccessToken():string{
    return this.oauthService.getAccessToken();
  }
}
