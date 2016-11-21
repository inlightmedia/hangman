import { Component, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';

@Component({
    selector: 'login-form',
    template: `
        <p>Login Form</p>
        <div class="row">
            
            <div class="card card-block">
                <h4 class="card-title">
                    Login
                </h4>
                <div class="form-group">                
                    <input type="email" class="form-control" placeholder="Email" #eml>
                </div>
                <div class="form-group">                
                    <input type="password" class="form-control" placeholder="Password" #pss>
                </div>
                <button (click)="loginUser(eml.value, pss.value)" class="btn btn-primary">Login</button>
            </div>
        </div>
        
    `
})
export class LoginFormComponent {
    
    credentials;

    @Output() loginCredentials = new EventEmitter();
    
    constructor(){
        
    }

    loginUser(email, password) {
        this.credentials = {
            email: email,
            password: password
        };
        this.loginCredentials.emit(this.credentials);
    }

}