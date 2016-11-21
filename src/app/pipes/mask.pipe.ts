import { Pipe, PipeTransform } from '@angular/core';
import { ScoreService } from '../services/score.service';

@Pipe({name: 'mask'})
export class MaskPipe implements PipeTransform {
    scoreService;
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
                
            } else {
                masked += '*';
            }
        }  

        if (selection !== '' && correct === false) {
            alert('WRONG!');
        }
        // Once all letters have been revealed calculate the score.
        if(!masked.includes('*')){
            firebase.auth().onAuthStateChanged(user => {
                this.scoreService.tallyScore(user, value, selection);                
            });            
        }        
        return masked;
    }

}