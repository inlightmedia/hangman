import { Component, OnChanges, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'my-app',
  template: `         
    <login-form *ngIf="!user"></login-form>   
    <info-bar (profileToggle)="showProfile = $event" *ngIf="user"></info-bar>    
    <profile-form *ngIf="showProfile"></profile-form>    
    <div id="gameOverScreen" *ngIf="gameOver">
      <!--show game over and restart button and your score/high scores-->
    </div>
    <div class="main" *ngIf="user && !showProfile && !gameOver">
      <!--<h1>Guess The Word</h1>
      <p>...and help Captain Collaborative save the Woodlands!</p>-->
      
      <div class="woodland_container">
        <div [@signal]="stage" class= "battle-stage">        
          <img class="hero-shield battle hero-shield-jiggle2 hero-shield-jiggle" src="https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/Untitled.png?alt=media&token=97bb3f2b-17a4-47a4-9117-be2d58b72cd4" />
          <img class="hero hero-jiggle2 hero-jiggle battle" src="https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/superheroe-posing_1048-1705.png?alt=media&token=f661d39c-a2f8-4dc1-a439-d10f051044fd" />
          <img class="dozer jiggle battle" src="https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/dozer.png?alt=media&token=7d3ffe4b-23ac-4ae7-b8cb-fca20b9fdfac" />          
        </div>
        <img class="trees" src="https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/trees2.png?alt=media&token=7e24d6b8-1d21-4e34-b8da-71f3bf200a33" />
          <img class="trees2" src="https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/trees2.png?alt=media&token=7e24d6b8-1d21-4e34-b8da-71f3bf200a33" />
          <img class="trees3" src="https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/trees2.png?alt=media&token=7e24d6b8-1d21-4e34-b8da-71f3bf200a33" />
          <img class="trees4" src="https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/trees2.png?alt=media&token=7e24d6b8-1d21-4e34-b8da-71f3bf200a33" />        
      </div>
      
      <div id="interaction-pane">
        <p id="instructions">FILL IN THE BLANK TO SAVE THE WOODLANDS!</p>
        <h4 id="question">Q. To give informed consent, the resident must be able to both understand the relevant necessary information required to make a decision and to ___________ the consequences of that decision. </h4>

        <div class="word">
          <div class="word" *ngFor="let letter of solutionArray">
            <button class="btn btn-default letter">{{ (selection.includes(letter)) ? letter : '•' }}</button>
          </div>
        </div>
        
        <span class="solution">{{ solution | mask:selection }}</span>          
        <letter-buttons [(selection)]="selection2"></letter-buttons>      
        
        <br>
        
        <button *ngIf="correctCount !== solution.length" type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
          Educate Me!
        </button>

        <button *ngIf="correctCount === solution.length" type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
          NEXT QUESTION... <!-- run  function to reset selection and advance to next word, reset correct and wrong counts -->
        </button>

        <div id="copy-container">
          <p id="copy"> © Copyright 2016, inLight Media Deisgn Solutions. All Rights Reserved.</p>
        </div>
        

        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">
                  Supplementary Information
                </h4>
              </div>
              <div class="modal-body">
                This is an example of some fine educational material regarding consent.
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Done</button>                
              </div>
            </div>
          </div>
        </div>
      </div>      
      
      <audio id="audio">
        <source src="https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/335908__littlerainyseasons__correct.mp3?alt=media&token=1b7cf26b-b933-4710-b2ed-58811d5d70f3" type="audio/mp3">        
        Your browser does not support the audio element.
      </audio>

      <audio id="audio2">
        <source src="https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/Ta%20Da-SoundBible.com-1884170640.mp3?alt=media&token=948ea315-81b4-4fbc-b0e0-f3d6bb9f7d91" type="audio/mp3">        
        Your browser does not support the audio element.
      </audio>

      <audio id="audio3">
        <source src="https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/Banana%20Peel%20Slip%20Zip-SoundBible.com-803276918.mp3?alt=media&token=c8479379-d52a-4b85-802c-7997bacd519f" type="audio/mp3">        
        Your browser does not support the audio element.
      </audio>

      <audio id="game-over">
        <source src="https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/Sad_Trombone-Joe_Lamb-665429450.mp3?alt=media&token=83a65fa5-e010-462d-bcc4-5ad09e754268" type="audio/mp3">        
        Your browser does not support the audio element.
      </audio>
      
      <!--{{ stage }}-->
      
    </div>    
  `,
  animations: [
    trigger('fall', [
      state('void', style({
                 
      })),
      state('falling', style({
        'top': '700px'         
      })),
      transition('* => *', animate('2s 0s ease-in-out'))
    ]),    
    trigger('signal', [
      state('void', style({
        'left': 'calc(10% - 35rem)'         
      })),      
      state('stage0', style({
        'left': 'calc(10% - 35rem)'         
      })),
      state('stage1', style({
        'left': 'calc(20% - 35rem)' 
      })),
      state('stage2', style({
        'left': 'calc(30% - 35rem)' 
      })),
      state('stage3', style({
        'left': 'calc(45% - 35rem)' 
      })),
      state('stage4', style({
        'left': 'calc(60% - 35rem)' 
      })),
      state('stage5', style({
        'left': 'calc(70% - 35rem)' 
      })),
      state('stage6', style({
        'left': 'calc(80% - 35rem)' 
      })),
      state('stage7', style({
        'left': 'calc(90% - 35rem)' 
      })),
      state('stage8', style({
        'left': 'calc(95% - 35rem)' 
      })),
      state('stage9', style({
        'left': 'calc(97% - 35rem)' 
      })),
      state('stage10', style({
        
        'left': 'calc(100% - 35rem)'//,
        //'-webkit-transform': 'rotate(-40deg)',
        //'-moz-transform': 'rotate(-40deg)',
        //'top': '-1500px'
         
      })),
      state('stage11', style({
        'left': 'calc(130% - 45rem)' 
      })),
      transition('* => *', animate('2s 0s ease-in-out'))
    ])
  ],
  styles: [`      
      
      #copy-container {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
      }

      #copy {
        align-self: flex-end;
        font-size: 0.6em;
        color: #444444;
        order: 1;
        flex: 0 1 auto;
        justify-content: flex-end;
        padding-right: 20px;
        align-self: flex-end;
      }

      #instructions {
        margin-top: 20px;
        color: #222222;         
        font-weight: bold;
        /*
        font-family: helvetica, verdana;
        border: solid 1px black;
        background: #393739;
        padding: 3px 0;*/       
      }

      #interaction-pane {
        margin-top: -30px;
        padding: 2rem 0 0 0;
        background: #6cc46f;
        background: #6cc46f; /* Old browsers */
        background: -moz-linear-gradient(top, #6cc46f 0%, #ffffff 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(top, #6cc46f 0%,#ffffff 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom, #6cc46f 0%,#ffffff 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#6cc46f', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */
        height: 100%;
        width: 100%;        
      }
      
      #question {
        margin: 0.8rem 1rem;
      }

      .green-bar {
        position: relative;
        background: green;
        height: 100%;
      }
      
      .hero {
        position: absolute;
        width: 130px;
        top: 265px;
        left: 266px;
        z-index: 0;
      }

      .hero-shield {
        position: absolute;
        width: 40px;
        top: 309px;
        left: 334px;
        z-index: 3;
      }
      .battle-stage{
        position: relative;
        width: 110px;
        height: 110px;
        left: 100px;
        top: -144px;        
      }
      
      body {
        background-color: green;
      }

      .woodland_container {
        position: relative;
        background-image: url('https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/woodlands-bare.png?alt=media&token=99182f09-142f-44a2-9fbb-b7f563b14fa4'), url('https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/woodlands-grass.png?alt=media&token=acc35c2e-0f89-4538-b63a-984c281b33a6');
        background-position: bottom;
        background-repeat: repeat-x;
        height: 220px;
        background-size: cover;
      }
      .trees {
        position: absolute;
        left: 150px;
        top: 33px;
        width: 200px;
        z-index: 4;
      }
      .trees2 {
        position: absolute;
        left: 25px;
        top: -2px;
        width: 235px;
        z-index: 0;
      }
      .trees3 {
        position: absolute;
        left: 90px;
        top: 17px;
        width: 210px;
        z-index:0;
      }
      .trees4 {
        position: absolute;
        left: -30px;
        top: 17px;
        width: 210px;
        z-index: 1;
      }

      .dozer {
        position: absolute;
        width: 200px;
        top: 205px;
        left: 360px;
        z-index: 1;
      }      
      
      .main {        
        text-align: center;        
      }

      .word {
        display: flex;   
        justify-content: center;   
        margin: 0.6rem 0rem 0rem 0rem !important;  
      }

      .letter {
        margin: 10px 10px;
        padding-top: 3px !important;
        font-size: 3rem;
        background: #FF8300;
        border-radius: 10px 10px 10px 10px;
        color: white;
        width: 4rem;
      }

      .solution {
        font-size: 3rem;
        background: yellow;
        color: red;
        padding: 8px;
        border-radius: 5px 5px 5px 5px;
        display: none; 
      }

      profile-form {        
        display: flex;
        flex-direction: row;
        justify-content: center;         
      }
      .battle {
          -webkit-animation: battle 0.1s infinite;
          -moz-animation-duration: 0.1s;
          -moz-animation-name: battle;
          -moz-animation-iteration-count: infinite;
          -webkit-transform: transform(-0.001deg);
          -moz-transform: rotate(-0.001deg);
          -webkit-transition: all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
          transition:         all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
      .hero-shield-jiggle {
          -webkit-animation: jiggle 1.8s infinite;
          -moz-animation-duration: 1.8s;
          -moz-animation-name: hero-shield-jiggle;
          -moz-animation-iteration-count: infinite;
          -webkit-transform: translateX(1px);
          -moz-transform: translateX(1px);
          transition: all 1.8s ease-in-out;
          
      }
      .hero-shield-jiggle2 {
          -webkit-animation: jiggle 0.1s infinite;
          -moz-animation-duration: 0.1s;
          -moz-animation-name: hero-shield-jiggle2;
          -moz-animation-iteration-count: infinite;
          -webkit-transform: translateY(1px);
          -moz-transform: translateY(1px);                    
      }
      .hero-jiggle {
          -webkit-animation: jiggle 2s infinite;
          -moz-animation-duration: 2s;
          -moz-animation-name: hero-jiggle;
          -moz-animation-iteration-count: infinite;          
          -webkit-transform: rotate(-0.7deg) translateX(5px);
          -moz-transform: rotate(-0.7deg) translateX(5px);
          transition: all 1s ease-in-out;
      }
      .hero-jiggle2 {
          -webkit-animation: jiggle 0.1s infinite;
          -moz-animation-duration: 0.1s;
          -moz-animation-name: hero-jiggle;
          -moz-animation-iteration-count: infinite;          
          -webkit-transform: rotate(-0.1deg);
          -moz-transform: rotate(-0.1deg);                           
      }
      .jiggle {
          -webkit-animation: jiggle 0.1s infinite;
          -moz-animation-duration: 0.1s;
          -moz-animation-name: jiggle;
          -moz-animation-iteration-count: infinite;
          -webkit-transform: rotate(-0.01deg);
          -moz-transform: rotate(-0.01deg);
      }

      @-moz-keyframes jiggle {
          0% {
              -moz-transform: rotate(-1deg);
          }
          50% {
              -moz-transform: rotate(1deg);
          }
      }

      @-webkit-keyframes jiggle {
          0% {
              -webkit-transform: rotate(-1deg);
              }
          50% {
              -webkit-transform: rotate(1deg);
          }
      }
  `]
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

  constructor(af: AngularFire, private audioService: AudioService){
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
      this.playCorrect();
      if  (this.correctCount === this.solution.length){
        this.audioService.playTriumph();
      }  
    }
  }  

  playCorrect(){
    let audio = document.getElementById("audio");     
    audio.play();
  }
  playTriumph(){
    let audio = document.getElementById("audio2");     
    audio.play();
  }
  playOops(){
    let audio = document.getElementById("audio3");     
    audio.play();
  }
  playGameOver(){
    let audio = document.getElementById("game-over");     
    audio.play();
  }
  ngOnInit(){
    console.log(this.showProfile);
  }  

}
