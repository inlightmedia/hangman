// import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

// @Injectable()
export class AuthService { 
    username;
    password;
    user: User;    
    
    // constructor(){}        

    login(email, password){                        
        // Log in the inputted user.              
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(function success() {
            console.log('User Logged In Successfully!');
            let user = new User;
            if (user){
                console.log(user);
            }            
          })
          .catch(e => console.log(e.message));
    }    

    signup(email, password, displayName){
      
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function success(){
          console.log('User Created');
          let user = new User();
          if (user) {
                firebase.database().ref('users/' + user.uid).set({
                    displayName: user.displayName
                });
          }       
        })
        .catch(e => console.log(e.message));      
    }

    logout(){
        firebase.auth().signOut();
    }          
}
