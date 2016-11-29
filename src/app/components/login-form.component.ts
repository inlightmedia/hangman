import { Component, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'login-form',
    template: `        
        <h1 class="text-center">Woodland Feller</h1>
        <br>
        <div class="row">
            <div class="col-md-12">
                <div class="col-md-6 offset-md-3">
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
            </div>            
            
        </div>
        
    `
})
export class LoginFormComponent {
    
    constructor(private authService: AuthService){
        
    }

    loginUser(email, password) {
         console.log(email, password);
         this.authService.logIn(email, password)
             .then((result) => {
                 console.log('Success!');
             }, (error) => {
                 console.log('Error.');
             });

    }

}