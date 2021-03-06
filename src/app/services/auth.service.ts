// import { Injectable } from '@angular/core';
// import { Promise } from '@angular/core';
import { User } from '../models/user.model';

// @Injectable()
export class AuthService { 
    username;
    private password;
    public modelUser: User;    
    public user;    

    constructor(){
                     
    }
    
    getAsyncUser(): Promise<Object> {        
        let promise = new Promise((resolve, reject) => {            
            firebase.auth().onAuthStateChanged((user)=>{                
                this.user = user;
                resolve(user);
            });                                
        });          
        return promise;                        
    }

    public logIn(email, password){                                              
        return firebase.auth().signInWithEmailAndPassword(email, password);        
    }    

    public signUp(email, password, displayName){
      
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

    public logOut(){
        firebase.auth().signOut();
    }          
}
