import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({    
    selector: 'animate',
    template: `        
        <div class="woodland_container">
            <img #cloudRef class="cloud" src="https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/cloud2.png?alt=media&token=5e31e3e3-587e-40c3-b073-39c8c924a6f7"/>
            <img #cloudRef2 class="clouds" src="https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/clouds.png?alt=media&token=443446ff-8043-4bac-a1d3-c10d5c371817"/>
            <img #cloudRef3 class="cloud" src="https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/cloud2.png?alt=media&token=5e31e3e3-587e-40c3-b073-39c8c924a6f7"/>
            <img #cloudRef4 class="cloudstart" src="https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/clouds.png?alt=media&token=443446ff-8043-4bac-a1d3-c10d5c371817"/>

            <img class="trees" src="https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/trees2.png?alt=media&token=7e24d6b8-1d21-4e34-b8da-71f3bf200a33"/>
            <img class="trees2" src="https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/trees2.png?alt=media&token=7e24d6b8-1d21-4e34-b8da-71f3bf200a33"/>
            <img class="trees3" src="https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/trees2.png?alt=media&token=7e24d6b8-1d21-4e34-b8da-71f3bf200a33"/>
            <img class="trees4" src="https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/trees2.png?alt=media&token=7e24d6b8-1d21-4e34-b8da-71f3bf200a33"/>

            <div  class="battle-stage" #ref2>                
                <img #shieldRef class="hero-shield battle hero-shield-jiggle2 hero-shield-jiggle" src="https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/Untitled.png?alt=media&token=97bb3f2b-17a4-47a4-9117-be2d58b72cd4"/>
                <img #heroRef class="hero hero-jiggle2 hero-jiggle battle" src="https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/superheroe-posing_1048-1705.png?alt=media&token=f661d39c-a2f8-4dc1-a439-d10f051044fd"/>
                <img #dozerRef class="dozer jiggle battle" src="https://firebasestorage.googleapis.com/v0/b/woodland-lumber-jack.appspot.com/o/dozer.png?alt=media&token=7d3ffe4b-23ac-4ae7-b8cb-fca20b9fdfac"/>
            </div>
            

            

        </div>
    `,
    styleUrls: ['src/app/components/animate-component/animate.component.css']
})
export class AnimateComponent implements OnInit {

    //ANIMATION SERVICE CALL EACH ANIMATION
    @ViewChild('ref') h1;
    @ViewChild('ref2') battle;
    @ViewChild('heroRef') hero;
    @ViewChild('dozerRef') dozer;
    @ViewChild('shieldRef') shield;
    @ViewChild('cloudRef') cloud;
    @ViewChild('cloudRef2') clouds;
    @ViewChild('cloudRef3') cloud2;
    @ViewChild('cloudRef4') cloud4;


    constructor() { }

    ngOnInit() {                                
        var hero = this.hero.nativeElement;
        var shield = this.shield.nativeElement;
        var dozer = this.dozer.nativeElement;
        var battle = this.battle.nativeElement;
        var cloud = this.cloud.nativeElement;      
        var clouds = this.clouds.nativeElement;
        var cloud2 = this.cloud2.nativeElement;
        var cloud4 = this.cloud4.nativeElement;      
        
        var heroShake = new TimelineMax({ repeat: -1, yoyo: true});
        heroShake
        .to(hero, 0.04, {rotation: 1}, 0.01)
        .to(hero, 0.04, {rotation: -1}, 0.01);

        var cloudScroll = new TimelineMax({ repeat: -1, yoyo: false});
        cloudScroll
        .to(cloud, 100, {left: -500, ease: Power0.easeNone}, '-=20')
        .to(clouds, 100, {left: -500, ease: Power0.easeNone}, 24)
        .to(cloud2, 110, {left: -800, ease: Power0.easeNone}, 14)
        .to(cloud, 90, {autoAlpha: 0}, '-=3')
        .to(clouds, 90, {autoAlpha: 0},'-=3')
        .to(cloud2, 100, {autoAlpha: 0}, '-=3');        
        
        var cloudScroll2 = new TimelineMax({ repeat: -1, yoyo: false});
        cloudScroll2
        .to(cloud, 90, {left: -500, ease: Power0.easeNone}, 200)
        .to(cloud, 90, {autoAlpha: 0}, '-=3')        

        // show a cloud on screen immediately
        var cloudScroll0 = new TimelineMax({ yoyo: false });
        cloudScroll0        
        .to(cloud4, 90, {left: -500, ease: Power0.easeNone}, 0.01)
        .to(cloud4, 7, {autoAlpha: 0}, '-=5');                
        
        var dozerShake = new TimelineMax({ repeat: -1, yoyo: true});
        dozerShake
        .to(dozer, 0.04, {rotation: 1}, 0.01)
        .to(dozer, 0.04, {rotation: -1}, 0.01);

        var shieldShake = new TimelineMax({ repeat: -1, yoyo: true});
        shieldShake
        .to(shield, 0.04, {y: 1}, 0.01)
        .to(shield, 0.04, {y: -1}, 0.01);           
    }    

    win(){
        var battle = this.battle.nativeElement;
        var battleAdvance = new TimelineMax({ repeat: -1, yoyo: true});
        battleAdvance
        .to(battle, 0.04, {y: 1}, 0.01)
        .to(battle, 0.04, {y: -1}, 0.01);
    }

    loss(){


    }
}