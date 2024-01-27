import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MockAuthenticationService } from '../../services/mock-authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private authenticationService:MockAuthenticationService,
    private router:Router
    ){}
  
  @ViewChild('loginForm', {static:true}) loginForm!:NgForm;
  username:string = '';
  password:string = '';
  errors:string[] = [];

  handleLoginClick(){
    if (this.authenticationService.login(this.username, this.password)){
      console.log('login success');
      this.router.navigate(['']);
    }
    else{
      console.log('login failure');
      this.updateErrorMessage();
    }

  }
  updateErrorMessage(){
    this.errors = [];
    this.errors.push('Invalid username or password')
  }
}
