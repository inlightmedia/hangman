export class AudioService {

    playCorrect(){
        let audio = document.getElementById("audio");     
        audio.play();
    }
    playTriumph(){
        let audio = document.getElementById("audio2");     
        setTimeout(() => {
            audio.play();
        }, 2000);        
    }
    playOops(){
        let audio = document.getElementById("audio3");     
        audio.play();
    }
    playGameOver(){
        let audio = document.getElementById("game-over");     
        audio.play();
    }

} 

