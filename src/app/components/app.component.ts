import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'my-app',
  template: `    
    <login></login> 
    <login-form></login-form>   
    <info-bar *ngIf="user"></info-bar>
    <div *ngIf="user">
      <h1>Guess The Word</h1>
      {{ solution | mask:selection }}
      <letter-buttons [(selection)]="selection"></letter-buttons>
    </div>
  `
})
export class AppComponent {   

  items: FirebaseListObservable<any[]>;
  user;
  constructor(af: AngularFire){
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });  
  }
  

  solution = 'ANGULAR';
  selection = '';

}
