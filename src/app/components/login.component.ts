import { Component, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'login',
  template: `    
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <input class="form-control" *ngIf="!userService?.user" type="email" id="txtEmail" placeholder="Email" #txtEmail>
        </div>
        <div class="form-group">
          <input class="form-control" *ngIf="!userService?.user" type="password" id="txtPassword" placeholder="Password" #txtPassword>
        </div>
        
        
        <button class="btn btn-primary" *ngIf="!userService?.user" (click)="login()" class="btn btn-action" #btnLogin>Login</button>
        <button class="btn btn-primary" *ngIf="!userService?.user" (click)="signup()" class="btn btn-secondary" #btnSignup>SignUp</button>
        <button class="btn btn-primary" *ngIf="userService?.user" (click)="logout()" class="btn btn-action" #btnLogout>Logout</button>
      </div>
    </div>           
  `
})
export class LoginComponent { 
    
    @ViewChild('txtEmail') txtEmail: ElementRef;
    @ViewChild('txtPassword') txtPassword: ElementRef;
    
    @ViewChild('btnLogin') btnLogin: ElementRef;
    @ViewChild('btnSigup') btnSignup: ElementRef;
    @ViewChild('btnLogout') btnLogout: ElementRef;

    user;
    userService;
    constructor(userService: UserService){        
        this.userService = userService; 
        this.user = this.userService.user;               
    }        

    login(){
        // Get Email and Password from the form inputs
        const email = this.txtEmail.nativeElement.value;
        const password = this.txtPassword.nativeElement.value;
        
        // Log in the inputted user.              
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(function success() {
            console.log('User Logged In Successfully!');
          })
          .catch(e => console.log(e.message));
    }    

    signup(){
      const email = this.txtEmail.nativeElement.value;
      const password = this.txtPassword.nativeElement.value;
      
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function success(){
          console.log('User Created');
        })
        .catch(e => console.log(e.message));      
    }

    logout(){
        firebase.auth().signOut();
    }          
}
