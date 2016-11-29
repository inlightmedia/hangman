import { Pipe, PipeTransform } from '@angular/core';
import { ScoreService } from '../services/score.service';

@Pipe({name: 'mask'})
export class MaskPipe implements PipeTransform {
    scoreService;
    complete = false;
    constructor(scoreService: ScoreService){
        this.scoreService = scoreService;
    }

    transform(value: string, selection: string){
        let masked = '';
        var correct = false;
        for(var i = 0; i < value.length; i++){
            var character = value.charAt(i);            
            if (selection.charAt(selection.length-1) === character){
                correct = true;
            }
            if (selection.includes(character)) {
                masked += character;
                
                // winAnimation(); // Sets state to
                
            } else {
                masked += '•';
            }
        }  
        
        // Once all letters have been revealed calculate the score.
        if(!masked.includes('•') && this.complete === false){
            firebase.auth().onAuthStateChanged(user => {
                this.scoreService.tallyScore(user, value, selection);                
            });
            this.complete = true; 
            // gameOverAnimation();           
        }        
        return masked;
    }

}