import { Injectable } from '@angular/core';
import { MockUser } from '../Entities/MockUser';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockAuthenticationService {
  private users:MockUser[] = [
    {
      "username": "user1",
      "password": "pw1",
      "accessToken": "token1"
    },
    {
      "username": "user2",
      "password": "pw2",
      "accessToken": "token2"
    },
    {
      "username": "user3",
      "password": "pw3",
      "accessToken": "token3"
    },
    {
      "username": "user4",
      "password": "pw4",
      "accessToken": "token4"
    },
    {
      "username": "user5",
      "password": "pw5",
      "accessToken": "token5"
    },    
    {
      "username": "owner",
      "password": "owner",
      "accessToken": "1fbb3c52-815c-11ee-b962-0242ac120002"
    }
  ];
  private dataUrl = '../mockData.json';

  loggedInUser:MockUser | null = null;

  constructor() { 
   console.log(`loaded user data: ${this.users}`)
  }
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.isLoggedInSubject.asObservable();

  login(username:string, password:string):boolean{
    console.log(this.users);
    for (let user of this.users){
      if (user.username === username &&
          user.password === password){
            this.loggedInUser = user;
            this.isLoggedInSubject.next(true);
            return true;
          }
          
      
    }
    return false;
  }


  register(username: string, password: string) {
    const newUser: MockUser = {
      username: username,
      password: password,
      accessToken: this.generateNewAccessToken()
    };

    this.users.push(newUser);
    
  }

  logout(){
    this.loggedInUser = null;
    this.isLoggedInSubject.next(false);
  }

  

  getLoggedInUsername(){
    return this.loggedInUser?.username;
  }

  getAccessToken(){
    return this.loggedInUser?.accessToken;
  }


  private generateNewAccessToken():string{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }

    return token;
  }

  
}
