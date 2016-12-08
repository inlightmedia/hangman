import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'letter-buttons',
    template: `        
        <br>
        <div class="row">
            <div class="col-md-12">
                <div class="col-md-10 offset-md-1">
                    <button 
                        *ngFor="let letter of alphabet" 
                        (click)="select(letter)"
                        [disabled]="selection.includes(letter)"
                        class="btn btn-info"
                        style="margin-bottom: 4px; margin-right: 4px;"
                        >{{ letter }}
                    </button>
                </div>
            </div>
        </div>                
    `
})
export class LetterButtonsComponent {
    
    @Input() selection = '';
    @Output() selectionChange = new EventEmitter<string>();

    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    select(letter){
        this.selection += letter;
        this.selectionChange.emit(this.selection);
    }
}