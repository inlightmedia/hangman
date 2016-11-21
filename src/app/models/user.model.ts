import { AngularFire } from 'angularfire2';
// USE MODELS WHEN ACCESSING THE DATABASE OR DOING ANYTHING WITH ACCESSING OR MANIPULATING DATA

export class User {
    displayName;
    email;
    uid;
    img;
    firstName;
    lastName;
    description;
    score;
    
    constructor(){
        firebase.auth().onAuthStateChanged(user => {
            if (user){
                firebase.database().ref('users/' + user.uid).on('value', snap => {
                    this.displayName = user.displayName,
                    this.email = user.email,
                    this.uid = user.uid,
                    this.firstName = snap.val().firstName,
                    this.lastName = snap.val().lastName,
                    this.description = snap.val().description,
                    this.score = snap.val().score
                });
            }                         
        });
    }

    

}