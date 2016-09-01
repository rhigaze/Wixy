import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class TemplatesService {


    public getSectionTemplate(sectionType) {
        return this.sectionsTypes.filter(section => section.type === sectionType)[0];
    }

    private sectionsTypes = [
        
        {
            "type" : "header",
            "visual" : {
                "background-color" : "#444",
                "color" : "#aaa"
            },
            "title" : "The Title",
            "subtitle" : "subtitle"
        },
        {
            "type": "cards" ,
            "cards" : [ 
                {
                    "type" : "card",
                    "icon" : "glyphicon glyphicon-wrench",
                    "title" : "Title",
                    "txt" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. "
                } 
            ]
        },
        {
            "type" : "contact",
            "frmLabels" : {
                "name" : "Name",
                "email" : "Email",
                "phone" : "Phone",
                "msg" : "Message",
                "send" : "Send"
            }
        },
        {
            "type" : "image",
            "images" : []
        },
        {
            "type" : "youTube",
            "videoId" : "izTMmZ9WYlE"
        },
        {
            "type" : "footer",
            "txt" : "copyright 2017",
            "visual" : {
                "background-color" : "blue",
                "color" : "black"
            }
        }
    ]

    private baseUrl = 'http://localhost:3003/data/templates/';

    get url(){
        return this.baseUrl;
    }
    // private templates : any;
    
    constructor(
        private http: Http,
        public toastr: ToastsManager
    ) { }
    
    save(template: Object[], id: string) : void{
        
        console.log('sending save request with data: ', template, id);
        
        let response : any;
        let prmTemplate : Promise<Object[]>;

        if (id) {
            const url = this.baseUrl + id;
            response = this.http.put(url, template)
        } else {
            const url = this.baseUrl;
            response = this.http.post(url, template)
        }

        prmTemplate = response.toPromise()
        .then((res : any) => {
            const jsonTemplate = res.json();
            
            this.toastr.success('Template successfully saved', 'id:' + jsonTemplate._id);
        });

        prmTemplate.catch(err => {
            console.log('TemplateService::save - Problem talking to server', err);
        });
  }

    remove(id: string) : Promise<Object[]> {
        let prmTemplate = this.http.delete(this.baseUrl + id)
        .toPromise()
        .then(res => {
            ('Template successfully deleted ', 'id: ' + id);
            return this.query();
        });

        prmTemplate.catch(err => {
        console.log('TemplateService::remove - Problem talking to server', err);
        });
        return prmTemplate;
    }

    query(): Promise<any> {

        let prmTemplates = this.http.get(this.baseUrl)
        .toPromise()
        .then(res => {
            const jsonTemplates = res.json();
            return jsonTemplates;
            });

        prmTemplates.catch(err => {
        console.log('TemplatesService::query - Problem talking to server');
        });
        return prmTemplates;
    }

    get(id: string) :Promise<any> {
        let prmTemplate = this.http.get(this.baseUrl + id)
        .toPromise()
        .then(res => { 
            const values = Object.values(res.json().sections);
            return {sections: values};
        });

        prmTemplate.catch(err => {
            this.toastr.error('Error trying to get template', 'id: ' + id)
            console.log('TemplateService::get - Problem talking to server');
        });
        return prmTemplate;
    }
}