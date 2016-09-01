import { Component, OnInit, EventEmitter } from '@angular/core';
import { ColorPicker } from '../color-picker.component'
import { InlineEditComponent } from '../inline-edit/inline-edit.component';
import { getUpdatedData } from '../shared/page-utils'

@Component({
    moduleId: module.id,
    selector: 'footer',
    directives: [ColorPicker, InlineEditComponent],
    styleUrls:  ['../../../css/page/footer/footer.component.css'],
    template: `
        <section class="footer inEdit" *ngIf="editMode" [ngStyle]="data.visual">
            <div><inline-edit  [key]=" 'txt' " [value]="data.txt" (onSave)="saveEditable($event)"></inline-edit></div>
            <section class="colors">
                footer Background:
                <color-picker  [key]="'background-color'" (colorChange)= "saveEditable($event, true)">  </color-picker>
                footer Text:
                <color-picker  [key]="'color'"            (colorChange)= "saveEditable($event, true)">  </color-picker>
            </section>
            <section class="removeBtn">
                <button class="btn btn-danger" (click)="removeSection()">Delete Section</button>
            </section>
        </section>
       
        <section class="footer" *ngIf="!editMode" [ngStyle]="data.visual">
            <div> {{data.txt}} </div>
        </section>
    `,
    inputs: ['data', 'editMode'],
    outputs: ['userChange'],
})
export class FooterComponent implements OnInit {
    
    private data;
    private editMode;
    private userChange = new EventEmitter()
    
    constructor() { }
    
    ngOnInit() { }
   
    saveEditable(edited, isVisual) {
        const updatedData = getUpdatedData(this.data, edited, isVisual)
        this.userChange.emit(updatedData)
    }

    removeSection() {
        this.userChange.emit({action: 'remove', section: this.data})
    }
} 