export class ScoreService {    

    public liveScore(user) {
        let liveScore;
        var liveScoreRef = firebase.database().ref('users/' + user.uid + '/score');
        liveScoreRef.on('value', function(snapshot) {
            liveScore = snapshot.val();
        });
        return liveScore;

    }

    private getCurrentScore(user) {
        return firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
          return snapshot.val().score;
        });
        // console.log('Getting Score');
        // const dbRef = firebase.database().ref('users/' + user.uid).child('score');
        // let score: number;
        // dbRef.on('value', snap => {            
        //     console.info(snap.val());
        //     this.incrementScore(snap.val());            
        // });                
    }
    
    private incrementScore(score: string, user, wrongGuesses, wordLength){
        console.log('Incrementing score', score);
        // let wrongGuesses = 3; //temp
        // let wordLength = 7;
        let pointsToAdd = wordLength - wrongGuesses;
        const newScore = parseInt(score) + pointsToAdd;
        console.log(pointsToAdd + ' points have been added. Total is now: ' + newScore);
        return firebase.database().ref('/users/' + user.uid).update({
            score: newScore.toString()           
        }); 
    }    

    roundReset() {
    // resets the wrong answers to zero after each round
    }

    gameOver(user){
        // resets the currentScore to ZERO 
        firebase.database().ref('users/' + user.uid).update({
            score: "0"
        });         
    }

    checkForHighScore(user) {        
        
        // TODO // Compare the current score with the high-score if it is higher update the high-score
        this.getCurrentScore(user)
            .then(function success(currentScore) {                
                console.log('The current score is now: ' + currentScore);
                // Get high score to compare if available
                const highScoreRef = firebase.database().ref('users/' + user.uid).once('value').then(function(snapshot) {
                    return snapshot.val().highScore;
                });
                highScoreRef
                    .then(function success(highScore) {                        
                        console.log('The high score is ' + highScore);
                        console.log('How does ' + currentScore + ' compare with ' + highScore);
                        if(typeof highScore !== 'null' && typeof highScore !== 'undefined'){
                            if(parseInt(highScore) < parseInt(currentScore)) {
                                console.log('Did this run? Yes.');
                                firebase.database().ref('users/' +  user.uid).update({
                                    highScore: currentScore
                                });
                            }
                        }
                    });                
            });  
    }

    public tallyScore(user, solution, selection){                                
        var wrongGuesses = 0;
        // Announce that the problem is solved once all letters are unmasked
        // alert('Solved!');

        console.log('SOLVED');
        for(let i=0; i < selection.length; i++) {
            var character = selection.charAt(i);            
            if (solution.includes(character)) {
                // do nothing
            } else {
                // add to wrong guesses
                wrongGuesses += 1;
            }
        }
        if (wrongGuesses > 5) {
            this.gameOver(user);
        }
        console.log('You guessed ' + wrongGuesses + ' incorrect letters.');
        // Calculate the score for this round.
        // Get the number of wrong guesses wrong
        
        // Using self to pass the this context into the then promise method
        const self = this;

        this.getCurrentScore(user)
            .then(function success(result) {
                return result;
            })
            .then(function success(score) {
                self.incrementScore(score, user, wrongGuesses, solution.length);                
            })
            .then(function success(){
                self.checkForHighScore(user);
                console.log('THIS ACTUALLY RAN AFTER THE INCREMENT')
            });                
    }
}