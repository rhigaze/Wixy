import { Component, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { PageService } from './page.service'
import { getUpdatedData } from './shared/page-utils'
import { ColorPicker } from './color-picker.component';
import { UploadComponent } from './upload/upload.component'



@Component({
    moduleId: module.id,
    selector: 'add-widget',
    directives: [ColorPicker,UploadComponent],
    styleUrls: ['../../css/page/add-widget.component.css'],
    template: `
        <section class="widgetsAdd" [class.slide-in]="isShown" [class.slide-out]="!isShown" *ngIf="editMode">
            <button class="btn btn-widget" (click)="isShown=!isShown"> Options 
                <i *ngIf="!isShown"  class="glyphicon glyphicon-triangle-top"></i>
                <i *ngIf="isShown" class="glyphicon glyphicon-triangle-bottom"></i> 
            </button>
             Page Background:
                    <color-picker [key]="'background'"
                                  (colorChange)="saveEditable($event)"> </color-picker> 
                    <upload-file [background]="true" [uploader]="uploader" (uploaded)="uploadIt($event)"> </upload-file>  
            <label for="section">
                <h3>Add section</h3>
                <h4>Choose section to add:</h4>
            </label>
            
            <select #sectionToAdd class="form-control" required>
                <option *ngFor="let section of sectionsToAdd" [value]="section.type"> {{section.name}} </option>
            </select>

            <label for="section">
                <h4>Insert atfer:</h4>
            </label>
            <select #afterSection class="form-control" required>
                <option *ngFor="let section of currSections" [value]="section.id"> {{section.id}}-{{section.type}}  </option>
            </select>

            <button class="btn btn-primary btn-sm addBtn" (click)="addSection(sectionToAdd.value, afterSection.value)">add</button>
        <section>
        `,

    inputs:  ['uploader','editMode','currSections'],
    outputs: ['uploaded','userChange']
})
export class AddWidgetComponent implements OnInit {
    private editMode: boolean;
    private currSections;
    private userChange = new EventEmitter()
    private isShown = false;
    
    private isUploader = true;
    private uploader;
    private uploaded = new EventEmitter();
    
    private sectionsToAdd = [
        {type: 'contact', name: 'Contact Form'  },
        {type: 'cards',   name: 'Cards'         },
        {type: 'youTube', name: 'Video Player'  },
        {type: 'image',   name: 'Images Gallery'},
        // {type: 'footer',  name: 'Footer'},
        // {type: 'header',  name: 'Header'},
    ]

    constructor(private pageService: PageService) { }

    ngOnInit() {
        this.currSections = this.currSections.filter(section => section.type !== 'footer')
    }

    ngOnChanges() {
        this.currSections = this.currSections.filter(section => section.type !== 'footer')
    }

    saveEditable(edited) {
        this.userChange.emit(edited);
    }
    
    addSection(sectionToAdd,afterSection) {
        const obj = {action: 'add', sectionToAdd, afterSection};
        this.userChange.emit(obj);
    }
    uploadIt(value){
         this.uploaded.emit({key:'background-image',data: this.uploader ,sectionId: undefined} );
    }
}

       