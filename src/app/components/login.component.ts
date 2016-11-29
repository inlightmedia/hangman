import { Component, ViewChild, Input, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login',
  template: `    
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <input class="form-control" *ngIf="!userService?.user" type="email" placeholder="Email" #txtEmail>
        </div>
        <div class="form-group">
          <input class="form-control" *ngIf="!userService?.user" type="password" placeholder="Password" #txtPassword>
        </div>        
        
        <button class="btn btn-primary" *ngIf="!userService?.user" (click)="logIn(txtEmail.value, txtPassword.value)" class="btn btn-action" #btnLogin>Login</button>
        <button class="btn btn-primary" *ngIf="!userService?.user" (click)="signUp(txtEmail.value, txtPassword.value)" class="btn btn-secondary" #btnSignup>SignUp</button>
        <button class="btn btn-primary" *ngIf="userService?.user" (click)="logOut()" class="btn btn-action" #btnLogout>Logout</button>
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

    constructor(public authService: AuthService, public userService: UserService){                
        const getUser = authService.getAsyncUser();
        
        getUser.then((user) => {
          console.log('I\'ve got a user.');            
        })
        .catch((e) => {console.log(e)});                          
    }        

    logIn(emailRef: string, passwordRef: string){                                

        // // Get Email and Password from the Login Form Input Fields
        const email = this.txtEmail.nativeElement.value;
        const password = this.txtPassword.nativeElement.value;

        this.authService.logIn(email, password)
          .then(function success() {
            console.log('User Logged In Successfully!');                        
          })
          .catch(e => console.log(e.message));                
    }    

    signUp(){
      const email = this.txtEmail.nativeElement.value;
      const password = this.txtPassword.nativeElement.value;
      
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function success(){
          console.log('User Created');
        })
        .catch(e => console.log(e.message));      
    }

    logOut(){
        firebase.auth().signOut();
    }          
}
