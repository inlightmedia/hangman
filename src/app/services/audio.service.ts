export class AudioService {

    // playCorrect(){
    //     let audio = document.getElementById("audio");     
    //     audio.play();
    // }
    // playTriumph(){
    //     let audio = document.getElementById("audio2");     
    //     setTimeout(() => {
    //         audio.play();
    //     }, 2000);        
    // }
    // playOops(){
    //     let audio = document.getElementById("audio3");     
    //     audio.play();
    // }
    // playGameOver(){
    //     let audio = document.getElementById("game-over");     
    //     audio.play();
    // }

    playCorrect(){
    let snd1  = new Audio();
    let src1  = document.createElement("source");
    src1.type = "audio/mpeg";
    src1.src  = "https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/335908__littlerainyseasons__correct.mp3?alt=media&token=1b7cf26b-b933-4710-b2ed-58811d5d70f3";
    snd1.appendChild(src1);
    snd1.play();    
  }

  playTriumph(){
    let snd2  = new Audio();
    let src2  = document.createElement("source");
    src2.type = "audio/mpeg";
    src2.src  = "https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/Ta%20Da-SoundBible.com-1884170640.mp3?alt=media&token=948ea315-81b4-4fbc-b0e0-f3d6bb9f7d91";
    snd2.appendChild(src2);
    snd2.play();   
  }
  
  playOops(){
    let snd3  = new Audio();
    let src3  = document.createElement("source");
    src3.type = "audio/mpeg";
    src3.src  = "https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/Banana%20Peel%20Slip%20Zip-SoundBible.com-803276918.mp3?alt=media&token=c8479379-d52a-4b85-802c-7997bacd519f";
    snd3.appendChild(src3);
    snd3.play();
  }
  playGameOver(){
    let snd4  = new Audio();
    let src4  = document.createElement("source");
    src4.type = "audio/mpeg";
    src4.src  = "https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/Sad_Trombone-Joe_Lamb-665429450.mp3?alt=media&token=83a65fa5-e010-462d-bcc4-5ad09e754268";
    snd4.appendChild(src4);
    snd4.play();    
  }

  playEngine(){
    let snd5  = new Audio();
    snd5.setAttribute("loop", "");
    let src5  = document.createElement("source");
    src5.type = "audio/mpeg";    
    src5.src  = "https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/264864__augustsandberg__marine-diesel-engine.mp3?alt=media&token=0bd0ed92-c7c4-4a86-95ec-66966da5cfff";
    snd5.appendChild(src5);
    snd5.play();    
  }

} 

