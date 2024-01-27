import { Component } from '@angular/core';
import { MockAuthenticationService } from '../../services/mock-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username:string = '';
  password1:string = '';
  password2:string = '';
  errors:string[] = [];

  constructor(
    private authenticationService:MockAuthenticationService,
    private router:Router
    ){}

  handleRegisterClick(){
    this.checkInput();
    if(this.errors.length === 0){
      this.authenticationService.register(this.username, this.password1);
      this.router.navigate(['../registrationSuccess'])
    }
  }

  private checkInput(){
    this.errors = [];
    if(this.username.length === 0){
      this.errors.push('Missing username');
    }
    if(this.password1 !== this.password2){
      this.errors.push('Password mismatch')
    } else if (this.password1.length < 8){
      this.errors.push('Password must be at least 8 characters long')
    }
  }
}
