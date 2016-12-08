import { Component, OnChanges, OnInit, ElementRef, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AudioService } from '../../services/audio.service';
// import 'gsap';


@Component({
  selector: 'my-app',
  templateUrl: 'src/app/components/app.component/app.component.html',  
  styleUrls: ['src/app/components/app.component/app.component.css']
})
export class AppComponent implements OnInit {   

  items: FirebaseListObservable<any[]>;
  user;
  showProfile: boolean;
  solution: string = 'APPRECIATE';
  selection: string = '';
  stage:string; //  (right - wrong)*(100/total) + 50%
  correct: boolean = false;
  correctCount: number = 0;
  correctCountForStaging: number = 0;
  wrongCount: number = 0;
  signal: string = 'void';
  step: number;
  solutionArray = [];
  gameOver = false;    
  
  constructor(private elementRef:ElementRef ,af: AngularFire, private audioService: AudioService){
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });                            

    window.addEventListener('resize', () => {
        const num = this.solution.length;
        // Somehow reset the position of the players on resize????
        this.stage = 'stage' + (this.correctCountForStaging - this.wrongCount + 4).toString();      
    }, true);
        
    // Populate Word to Page
    for(var i = 0; i < this.solution.length; i++){
        let character = this.solution.charAt(i);                            
        this.solutionArray.push(character);                
    }      
  }

  get selection2() {            
    return this.selection;
  }
  
  set selection2(selection){
    this.selection = selection;
    
    // **PUTTHIS CODE IN SCORING SERVICE**
    // Default to False    
    this.correct = false;
    for(var i = 0; i < this.solution.length; i++){
        let character = this.solution.charAt(i);
        if (this.selection.charAt(this.selection.length-1) === character){            
            this.correctCount += 1;
            console.log(this.correctCount);
            this.correct = true;                                    
        }                                            
    }
    
    if (this.selection !== '' && this.correct === false) {
        // alert('WRONG!');
        this.audioService.playOops();
        this.wrongCount += 1;
        console.log('No. Wrong: ' + this.wrongCount);
        this.stage = 'stage' + (this.correctCountForStaging - this.wrongCount + 4).toString();
        if (this.stage === 'stage0') {
          this.gameOver = true;
          this.audioService.playGameOver();
        }        
        // lossAnimation();            
    } else {
      console.log('CORRECT!');
      this.correctCountForStaging += 1;
      this.stage = 'stage' + (this.correctCountForStaging - this.wrongCount + 4).toString();
      this.audioService.playCorrect();
      if  (this.correctCount === this.solution.length){
        this.audioService.playTriumph();
      }  
    }
  }   
  ngOnInit(){
   this.audioService.playEngine();
  }
}