import { Component, OnInit, EventEmitter, } from '@angular/core';
import { getUpdatedData } from '../shared/page-utils'
import { InlineEditComponent } from '../inline-edit/inline-edit.component';
import { DomSanitizationService, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'youTube',
    directives: [InlineEditComponent],
    styleUrls: ['../../../css/page/video/video.component.css'],
    template: `
        <section *ngIf="editMode" class="video inEdit">
            <iframe width="600" height="400" [src]=videoUrl frameborder="0" allowfullscreen></iframe>
            <h4 class="url">
                <button class="btn btn-danger"  (click)="removeSection()">Delete Section</button>
                youTube Video ID (copy-paste from the video URL):
                <inline-edit [key]="'videoId'" [value]="data.videoId" (onSave)="saveEditable($event)"></inline-edit>
            </h4>
        </section>
        <section *ngIf="!editMode" class="video">
            <iframe width="600" height="400" [src]=videoUrl frameborder="0" allowfullscreen></iframe>
        </section>
    `,
    inputs: ['data', 'editMode'],
    outputs: ['userChange']
}) 
export class VideoComponent implements OnInit {
    private data;
    private width;
    private height;
    private editMode;
    private dangerousVideoUrl;
    private videoUrl: SafeResourceUrl;
    private userChange = new EventEmitter()
    
    constructor(private sanitizer: DomSanitizationService) { }

    ngOnInit() {
        this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + this.data.videoId;
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
    }
    
    saveEditable(edited: any, isVisual: boolean) {
        edited.id = this.sanitizer.bypassSecurityTrustResourceUrl(edited.id)
        const updatedData = getUpdatedData(this.data, edited, isVisual);
        this.userChange.emit(updatedData);
    }

    removeSection() {
        this.userChange.emit({action: 'remove', section: this.data})
    }
  
}