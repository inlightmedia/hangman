import { TestBed } from '@angular/core/testing';
import { LetterButtonsComponent } from '../components/letter-buttons.component/letter-buttons.component';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

describe('LetterButtonsComponent', () => {
    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations: [LetterButtonsComponent]
        });
    });
    
    // const component = new LetterButtonsComponent();

    it('should display a button for each letter of the alphabet', () => {
        
        const fixture = TestBed.createComponent(LetterButtonsComponent);
        fixture.autoDetectChanges();
        const component = fixture.componentInstance;
        const element = <HTMLElement>fixture.nativeElement;
        
        const buttons = element.querySelectorAll('button');
        expect(buttons.length).toBe(alphabet.length);
        
        for(var i = 0; i<alphabet.length ; i++){
            const button = buttons.item(i);
            expect(button.textContent).toBe(alphabet.charAt(i));
            expect(button.disabled).toBe(false);
        }
        
        console.log('button', buttons.item(0));
        // console.log('Component: ', component);
        // toBe uses strict comparison - to test if the contents of an array are equal toEqual is needed         
        // expect(component.alphabet).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);
    });
    
    // fit() makes only this test run whereas 'it()' will run this test will all the others as well - f stands for focussed
    it('should add that letter to the selection when a button is clicked', () => {
        
        const fixture = TestBed.createComponent(LetterButtonsComponent);
        fixture.autoDetectChanges();
        const component = fixture.componentInstance;
        const element = <HTMLElement>fixture.nativeElement;        
        const buttons = element.querySelectorAll('button');
        
        const buttonO = buttons.item(alphabet.indexOf('O'));
        const buttonK = buttons.item(alphabet.indexOf('K'));
        console.log(buttonO);
        expect(component.selection).toBe('');
        buttonO.click();
        expect(buttonO.disabled).toBe(true);
        expect(component.selection).toBe('O');
        buttonK.click();
        expect(buttonK.disabled).toBe(true);
        expect(component.selection).toBe('OK');
    });

});