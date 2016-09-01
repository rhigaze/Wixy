import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplatesService } from './templates.service'
import { DomSanitizationService, SafeUrl } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'templates-list',
    directives: [],
    styleUrls: ['../../css/page/templates-list.component.css'],
    template: 
        `
        <section class="screen">
           <section class="tableContainer">
                <h4>Choose template:</h4>
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
                        <tr *ngFor="let template of templates">
                            <td> {{template.name}}                                                                </td>
                            <td> <a (click)="showPreview(template._id)" class="btn btn-success"> Preview      </a> </td>
                            <td> <a routerLink="/page/edit/t_{{template._id}}" class="btn btn-success"> Edit </a> </td>
                        </tr>
                    </tbody>
                </table>
            </section>
            
            <section class="frame">
                <h4>Preview</h4>
                <iframe *ngIf="templateUrl" width="1000" height="700" [src]=safeTemplateUrl frameborder="0" allowfullscreen> </iframe>
            </section>
        
        </section>   
        `,
    providers:[TemplatesService]
})
export class TemplatesListComponent implements OnInit {
    
    private templates: Object[];
    private templateUrl;
    private safeTemplateUrl: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.templateUrl);

    constructor(
        private templatesService : TemplatesService,
        private route: ActivatedRoute,
        private router: Router,
                private sanitizer: DomSanitizationService

    ) { }

    ngOnInit() {
        const prmTemplates = this.templatesService.query();
        prmTemplates.then(templates => {
            this.templates = templates;
        })            
    }

    showPreview(templateId) {
        console.log(templateId);
        this.templateUrl = '/production/templates/' + templateId;
        this.safeTemplateUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.templateUrl);
    }
}

       