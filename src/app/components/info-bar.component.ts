import { Component, ElementRef, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ScoreService } from '../services/score.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'info-bar',
  template: `            
    <nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Brand</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">One more separated link</a></li>
          </ul>
        </li>
      </ul>
      <form class="navbar-form navbar-left">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search">
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
    <div class="row">
      <div class="col-md-6 alert">
        <span *ngIf="user">
          <span>Name: </span><span id="fillMe" #nameDisplay>{{ userProfile?.displayName }}</span>
          <span>Score: </span><span id="showScore" #scoreDisplay>{{ userProfile?.score }}</span>
        </span>  
      </div>
    </div>
        
    <button *ngIf="user" (click)="showProfileForm()" class="btn btn-primary">Update Profile</button>            
  `,
  styles: ['.hidden {display: none}']
})
export class InfoBarComponent { 
    showProfile;
    userService;
    user;
    userProfile;  

    @ViewChild('nameDisplay') nameDisplay: ElementRef;
    @ViewChild('scoreDisplay') scoreDisplay: ElementRef;
    
    constructor(userService: UserService){                                                 
        this.updateInfoBarData();               
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
    
    showProfileForm(){
      // reveal populated inputs for all user data
      this.showProfile = true;      
    }
  
}