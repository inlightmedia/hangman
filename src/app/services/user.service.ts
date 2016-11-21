import { AngularFire } from 'angularfire2';

export class UserService {

    constructor(){
        this.getUser();    
    }
    
    public user;

    private getUser(){
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.user = user;             
            } else {
                this.user = null;
            }            
        });                           
    }

    updateUserData(newUserObject){
        firebase.database().ref().update('');
    }

    removeUser(){
        
    }

}