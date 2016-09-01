import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from './page.service'
import { PageModel } from './page.model'
import { DomSanitizationService, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


@Component({
    moduleId: module.id,
    selector: 'pages-list',
    styleUrls: ['../../css/page/pages-list.component.css'],
    directives: [],
    template: 
        `
    <section class="screen">
        <section class="tableContainer">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th> Page Id </th>
                        <th> Actions </th>
                        <th> </th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let page of pages">
                        <td> {{page.id}} </td>
                        <td> <a class="btn btn-success" (click)="showPreview(page.id)"> Preview </a> </td>
                        <td> <a routerLink="/page/edit/{{page.id}}" class="btn btn-success"> Edit       </a> </td>
                        <td> <button class="btn btn-danger" (click)="removePage(page.id)"> Delete  </button> </td>
                    </tr>
                </tbody>
            </table>
            <section class="devicePicker">
                <h4>See how your page look in other devices:</h4>
                <select #size (change)="log(size.value)" class="form-control">
                    <option *ngFor="let device of devices; let i = index"  [value]="i"> {{device.name}} - {{device.height}}x{{device.width}} </option>
                </select>
                <!--<section> {{devices | json}} </section>-->
            </section>
        </section>
        <section class="frame">
            <h4>Preview</h4>
            <!--<iframe *ngIf="pageUrl" width="375" height="667" [src]=safePageUrl frameborder="0" allowfullscreen> </iframe>-->
            <iframe *ngIf="pageUrl" [width]=devices[size.value].width [height]=devices[size.value].height [src]=safePageUrl frameborder="1" allowfullscreen> </iframe>
        </section>
    </section>

        `,
    // inputs: ['width', 'height']
})
export class PagesListComponent implements OnInit {
    private width;
    private height;
    private pages: PageModel[];
    private pageUrl;
    private safePageUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pageUrl);
    private devices = [ {name: 'iPhone 6',      height: 667, width: 375 },
                        {name: 'iPhone 6 Plus', height: 773, width: 435 },
                        {name: 'iPhone 5',      height: 568, width: 320 },
                        {name: 'iPad',          height: 1024, width: 768} ]
    constructor(
        private pageService : PageService,
        private route: ActivatedRoute,
        private router: Router,
        private sanitizer: DomSanitizationService
    ) { }
    
    showPreview(pageId) {
        this.pageUrl = '/page/production/' + pageId;
        this.safePageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pageUrl);
                
    }
    log(value){
        console.log(value)
    }
    ngOnInit() {
        const prmPages = this.pageService.query();
        prmPages.then(pages => {
            this.pages = pages;
           console.log('the pages is:',this.pages);
        })   
                
    }

    removePage(pageId) {
        this.pageService.remove(pageId).then(pages=>this.pages=pages);
    }
}

       