import { Component, OnInit, EventEmitter } from '@angular/core';
import { InlineEditComponent } from '../inline-edit/inline-edit.component';
import { ColorPicker } from '../color-picker.component'
import { getUpdatedData, saveEditable } from '../shared/page-utils'

@Component({
    moduleId: module.id,
    selector: 'header',
    directives: [ColorPicker, InlineEditComponent],
    styleUrls: ['../../../css/page/header/header.component.css'],
    template: `
       
        <section class="header inEdit" *ngIf="editMode" [ngStyle]="data.visual">
            <h2><inline-edit  [key]=" 'title' "    [value]="data.title"    (onSave)="saveEditable($event)"></inline-edit></h2>
            <h5><inline-edit  [key]=" 'subtitle' " [value]="data.subtitle" (onSave)="saveEditable($event)"></inline-edit></h5>

            <section class="colors">
            <button class="btn btn-danger"  (click)="removeSection()">Delete Section</button>
                Header Background:
                <color-picker  [key]="'background-color'" (colorChange)= "saveEditable($event, true)">  </color-picker>
                Header Text:
                <color-picker  [key]="'color'"            (colorChange)= "saveEditable($event, true)">  </color-picker>
            </section>
        </section>    
        
         <section class="header" *ngIf="!editMode" [ngStyle]="data.visual">
            <h2>{{data.title}}</h2>
            <h5>{{data.subtitle}}</h5>
           
         </section>
      
    `,
    inputs: ['data', 'editMode'],
    outputs: ['userChange'],
})
export class HeaderComponent implements OnInit {
    private data;
    private editMode;
    private userChange = new EventEmitter();
    
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