import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './components/app.component/app.component';
import { MaskPipe } from './pipes/mask.pipe';
import { LetterButtonsComponent } from './components/letter-buttons.component/letter-buttons.component';
import { LoginComponent } from './components/login.component';
import { InfoBarComponent } from './components/info-bar.component/info-bar.component';
import { AngularFireModule } from 'angularfire2';
import { UserService } from './services/user.service';
import { ScoreService } from './services/score.service';
import { AuthService } from './services/auth.service';
import { AudioService } from './services/audio.service';
import { AnimationService } from './services/animation.service';
import { StagingService } from './services/staging.service';
import { LoginFormComponent } from './components/login-form.commponent/login-form.component';
import { ProfileFormComponent } from './components/profile-form.component/profile-form.component';
import { AnimateComponent } from './components/animate-component/animate.component';

// Must export the config
export const firebaseConfig = {  
  apiKey: "AIzaSyBqUfdoF56Jcj-6Oq6qNpa9OD7wQKX7mTQ",
  authDomain: "woodland-lumber-jack.firebaseapp.com",
  databaseURL: "https://woodland-lumber-jack.firebaseio.com",
  storageBucket: "woodland-lumber-jack.appspot.com",
  messagingSenderId: "880138031165"      
};

@NgModule({
  imports: [BrowserModule, AngularFireModule.initializeApp(firebaseConfig)],
  declarations: [
    AppComponent, 
    LetterButtonsComponent, 
    MaskPipe, 
    LoginComponent, 
    InfoBarComponent, 
    LoginFormComponent, 
    ProfileFormComponent,
    AnimateComponent
  ],
  providers: [
    UserService, 
    ScoreService, 
    AuthService, 
    AudioService,
    StagingService,
    AnimationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
