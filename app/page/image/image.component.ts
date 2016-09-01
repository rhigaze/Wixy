import { Component, OnInit , EventEmitter } from '@angular/core';
import { UploadComponent } from '../upload/upload.component'

@Component({
    moduleId: module.id,
    selector: 'image-gallery',
    directives: [UploadComponent],
    styleUrls: ['../../../css/page/image/image.component.css'],
    template: `
        <section *ngIf="editMode">
            

            <section class="uploader" [class.slide-right]="isUploader" [class.slide-left]="!isUploader">
                    <button *ngIf="isUploader" class="btn btn-upload" (click)="isUploader=!isUploader"> 
                     <i class="glyphicon glyphicon-triangle-bottom"> </i> Hide Uploader
                </button>
                <button *ngIf="!isUploader" class="btn btn-upload" (click)="isUploader=!isUploader">  
                    <i class="glyphicon glyphicon-triangle-top">  </i> Show Uploader
                </button>
                <upload-file [background]="false" [uploader]="uploader" (uploaded)="uploadIt($event)"> </upload-file>      
            </section>
            
            <section class="inEdit">
                <button class="btn btn-danger" (click)="removeSection()">Delete Section</button>
                <section class="gallery cf">
                    <div *ngFor="let img of data.images">
                        <img  [src]="'../../../rest-server' + img">
                    </div>
                </section>
            </section>
        
        </section>
    
        <section *ngIf="!editMode" [hidden]="data.images.length === 0" class="gallery cf">
            <div *ngFor="let img of data.images">
                <img  [src]="'../../../rest-server' + img">
            </div>
        </section>
    `,
    inputs: ['uploader','data', 'editMode'],
    outputs: ['uploaded', 'userChange'],
})
export class ImageComponent implements OnInit {
    private isUploader = true;
    private data ;
    private editMode;
    private uploader;
    private uploaded = new EventEmitter()
    private userChange = new EventEmitter();
                    
    private url ="../../../rest-server/";
    constructor() { }

    ngOnInit() { }
    
    uploadIt(value){
        console.log(value);
         this.uploaded.emit({key:'image-gallery',data: this.uploader, sectionId: this.data.id} );
    }

    removeSection() {
        this.userChange.emit({action: 'remove', section: this.data})
    }
}