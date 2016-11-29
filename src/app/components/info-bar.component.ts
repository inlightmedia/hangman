import { Component, ElementRef, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ScoreService } from '../services/score.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'info-bar',
  template: `            
      <nav class="navbar navbar-light" style="background-color: #dafff6;">
        <button class="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"></button>
        <div class="collapse navbar-toggleable-md" id="navbarResponsive">
          <a class="navbar-brand" href="#">Adventures of Captain Collaborative</a>                    

          <ul class="nav navbar-nav float-xs-right">                                    
            <li class="nav-item">
              <a class="nav-link" href="#">Your Score: {{ userProfile?.score }}</a>
            </li>
                            
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="http://example.com" id="responsiveNavbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ userProfile?.displayName }}
              </a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="responsiveNavbarDropdown">
                <a class="dropdown-item" (click)="authService.logOut()" href="#">Log Out</a>            
                <a class="dropdown-item" (click)="toggleProfile()" href="#">{{ (showProfile)? 'Back to Main' : 'Edit Profile' }} <span class="caret"></span></a>                                      
                <a class="dropdown-item" href="#">Highscores</a>
              </div>
            </li>                                            
          </ul>          

        </div>
      </nav>                                 
  `,
  styles: [`
    .hidden {
      display: none
    }

    .clickable {
      cursor: pointer !important;
    }
  
  `]
})
export class InfoBarComponent { 
    @Output('profileToggle') profileToggle = new EventEmitter<boolean>();        
    userService;
    user;
    userProfile;
    showProfile = false;  

    @ViewChild('nameDisplay') nameDisplay: ElementRef;
    @ViewChild('scoreDisplay') scoreDisplay: ElementRef;
    
    constructor(private authService: AuthService){                                                 
        this.updateInfoBarData();
        // Send the boolean to the parent  
                     
    }     

    toggleProfile(){
      this.showProfile = !this.showProfile;
      this.profileToggle.emit(this.showProfile);
    }

    updateInfoBarData(){
      firebase.auth().onAuthStateChanged(user => {                                          
          this.user = user;
          if (user){                                
              firebase.database().ref('users/' + user.uid).on('value', snap => {
                // If this is a new user add them with default values.
                if (snap.val() === null || snap.val() === undefined){
                  this.userProfile = {
                    displayName: 'New User',
                    email: user.email,
                    uid: user.uid,
                    score: '0',
                    highScore: '0'              
                  }
                  const promise = firebase.database().ref('users/' + user.uid).set(this.userProfile);
                    promise.catch(error => console.log(error));                                
                }
                
                // Set the info bar display to the current user info.                
                this.userProfile = {
                  displayName: snap.val().displayName,
                  score: snap.val().score
                }               
              });  
            } else {
              console.log('You have been logged out.');                            
              this.userProfile = null;                         
            }
        });
    }    
}
