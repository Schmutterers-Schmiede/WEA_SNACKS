import { Injectable } from '@angular/core';
import { MockUser } from '../Entities/mockUser';
import { HttpClient } from '@angular/common/http';
import { Observable, map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockAuthenticationService {
  private users:MockUser[] = [];
  private dataUrl = '../mockData.json';

  loggedInUser:MockUser | null = null;

  constructor(private httpClient:HttpClient) { 
   this.getUserData();
   console.log(`loaded user data: ${this.users}`)
  }

  private getUserData(): Observable<any>{
    return this.httpClient.get(this.dataUrl).pipe(
      map((response: any) => this.users = response.users)
    );
  }

  login(username:string, password:string){
    for (let user of this.users){
      if (user.username === username &&
          user.password === password){
            this.loggedInUser = user;
          }
      
    }
  }

  private saveUserData(): Observable<any> {
    return this.httpClient.put(this.dataUrl, { users: this.users });
  }

  register(username: string, password: string, email: string) {
    const newUser: MockUser = {
      username: username,
      password: password,
      accessToken: this.generateNewAccessToken()
    };

    this.users.push(newUser);
    this.saveUserData().subscribe(() => {
      console.log(`User ${username} registered successfully.`);
    });
  }

  logout(){
    this.loggedInUser = null;
  }

  isLoggedIn(){
    return this.loggedInUser !== null;
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
