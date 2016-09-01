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
        <section *ngIf="!prodMode">        
            <section class="widgets">
                    <button *ngIf="!isEditMode" class="btn btn-primary" (click)="saveToServer()"> Save page </button>
                    <a *ngIf="isEditMode"  routerLink="/page/preview/{{id}}" class="btn btn-success">Preview Page</a>
                    <a *ngIf="!isEditMode" routerLink="/page/edit/{{id}}"    class="btn btn-success"> Edit Page </a>
            </section>
            <add-widget *ngIf="!prodMode" [editMode]="isEditMode" [currSections]="page.getSections()" 
                         [uploader]="uploaderBackground" (uploaded)="uploadToServer($event)" (userChange)="saveChanges($event)"> 
            </add-widget>
        </section>
        <section *ngIf="userUrl && isMessageShown" class="user-url-msg">
            <h2> Your page is ready </h2>
            <h3> Just navigate to this url and you are good to go! </h3>
            <h2> <a [href]=userUrl> {{unSafeUserUrl}} </a> </h2>
            <button (click)="isMessageShown=false" class="btn btn-primary"> Close </button>
        </section>

        <section class="page"  [ngStyle]= "page.style ">
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
export class PageComponent implements OnInit {
    private page: PageModel;
    private isEditMode: boolean;
    private isMessageShown = true;
    private id: string;
    private mode: string;
    public uploader:FileUploader;
    public uploaderBackground:FileUploader;
    private unSafeUserUrl;
    private userUrl: SafeUrl;
    
    constructor(
        private pageService: PageService,
        private route: ActivatedRoute,
        private router: Router,
        private sanitizer: DomSanitizationService,
        @Inject('ProdMode') private prodMode
    ) 
    { 
        this.uploader = new FileUploader({url: URL});
        this.uploaderBackground = new FileUploader({url: URL});
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.mode = params['mode'];
            
            (this.mode === 'edit') ? this.pageService.state.isEditMode = true : this.pageService.state.isEditMode = false;
            this.isEditMode =  this.pageService.editMode;

            if (this.id) this.pageService.getPage(this.id).then(page => {this.page = page
             console.log('------------------',this.page);  
        })
            else this.page = this.pageService.getNewPage();
        })
    }
    
    saveChanges(updatedData) {
        console.log(updatedData);
        switch (updatedData.action) {
            case 'remove': this.pageService.removeSection(updatedData);
            break;
            case 'add':    this.pageService.addSection(updatedData);
            break;
            default:       this.pageService.updateSection(updatedData);
        }
    }

    saveToServer() {
        this.pageService.save().then((page) =>{
            this.unSafeUserUrl = "localhost:3000/page/production/"+ page.id;
            this.userUrl = this.sanitizer.bypassSecurityTrustUrl(this.unSafeUserUrl);
            window.location.pathname = '/page/production/'+ page.id;

        })
        
    }
    
    uploadToServer(value) {
        console.log(value);
        this.pageService.upload(URL,value.key,value.data ,value.sectionId)
    }
}

       