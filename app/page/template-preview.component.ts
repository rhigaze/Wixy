import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FILE_UPLOAD_DIRECTIVES, FileUploader } from 'ng2-file-upload';
import { HeaderComponent } from './header/header.component';
import { CardsComponent } from './cards/cards.component';
import { UploadComponent } from './upload/upload.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { PageService } from './page.service'
import { PageModel } from './page.model'
import { AddWidgetComponent } from './add-widget.component'
import { ImageComponent } from './image/image.component'
import { VideoComponent } from './video/video.component'
import { DomSanitizationService, SafeUrl } from '@angular/platform-browser';

import { TemplatesService } from './templates.service'

const URL = 'http://localhost:3003/doUpload';

@Component({
    moduleId: module.id,
    selector: 'page',
    directives: [
                ImageComponent,
                UploadComponent,
                HeaderComponent,
                FooterComponent,  
                CardsComponent,
                ContactComponent,
                AddWidgetComponent,
                VideoComponent

    ],
    styleUrls: ['../../css/page/page.component.css'],
    template: ` 
    <section *ngIf="page">

        <section class="page" [style.background-color]="page.getSectionData(0)['background-color']">
            <section *ngFor="let section of page.data.sections">
                <section [ngSwitch]="section.type">
                    
                    <header *ngSwitchCase="'header'" [editMode]="isEditMode" [data]="page.getSectionData(section.id)" 
                            (userChange)="saveChanges($event)"> </header>
                        
                    <cards *ngSwitchCase="'cards'"   [editMode]="isEditMode" [data]="page.getSectionData(section.id)" 
                            (userChange)="saveChanges($event)"> </cards>
                    
                    <image-gallery *ngSwitchCase="'image'" [editMode]="isEditMode" [data]="page.getSectionData(section.id)"
                            [uploader]="uploader" (uploaded)="uploadToServer($event)"
                            (userChange)="saveChanges($event)"> </image-gallery>
            
                    <contact-us *ngSwitchCase="'contact'" [editMode]="isEditMode" [data]="page.getSectionData(section.id)"
                            (userChange)="saveChanges($event)"></contact-us>
                    
                    <footer *ngSwitchCase="'footer'" [editMode]="isEditMode" [data]="page.getSectionData(section.id)" 
                            (userChange)="saveChanges($event)"> </footer>
                            
                    <youTube *ngSwitchCase="'youTube'" [editMode]="isEditMode" [data]="page.getSectionData(section.id)"
                            (userChange)="saveChanges($event)"> </youTube>
                
                </section>
        </section>
    </section>
        `,
})
export class TemplatePreview implements OnInit {
    private page: PageModel;
    private id: string;
    
    constructor(
        private templatesService : TemplatesService,
        private pageService: PageService,
        private route: ActivatedRoute,
        private router: Router
    ) 
    { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            if (this.id) this.templatesService.get(this.id).then(template => this.page = new PageModel(template,undefined, this.id))
        })
    }
}