import { Injectable } from '@angular/core';
import { Http,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ActivatedRoute, Router } from '@angular/router';
import { PageModel } from './page.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TemplatesService } from './templates.service';
import { FileUploader} from 'ng2-file-upload';


@Injectable()
export class PageService {

    private page : PageModel;
    
    private _state = { isEditMode : true,
                       id : null,
                       template: '57a25f9c1aec63c040dd1744',
                       isChanged: false,
                       style: {
                            'background-color' :'',
                            'background-image' : ''
                        },
                       userId: undefined
                     }

    constructor(
        private http: Http,
        private templatesService: TemplatesService,
        private router: Router,
        public toastr: ToastsManager
    ) { }

    get id() {
        return this.state.id;
    }
    get editMode() {
        return this.state.isEditMode;
    }
    set editMode(isEditMode: boolean) {
        this.state.isEditMode = isEditMode;
    }
    get state() {
        return this._state;
    }
    private baseUrl = 'http://localhost:3003/data/page/';

    get url(){
        return this.baseUrl;
    }
    
    updateSection(updatedData) {
        this.page.setSectionData(updatedData);
        this.state.isChanged = true;
    }
    
    addSection(sectionObj) {
        sectionObj.sectionToAdd = this.templatesService.getSectionTemplate(sectionObj.sectionToAdd)
        this.page.addSection(sectionObj);
        this.state.isChanged = true;
    }

    removeSection(sectionData) {
        this.page.removeSection(sectionData);
        this.state.isChanged = true;
    }

    getNewPage() {
        console.log('newww page');
        
        this.page = new PageModel(this.state.template, this.state.style, undefined);
        this.state.id = undefined;
        return this.page;
    }

    getPage(id) : any {
        // preview template
        if (id[0] === 't') {
            id = id.slice(2);
            const prmTemplate = this.templatesService.get(id).then(template => {
                this.state.template = template;
                this.state.id = undefined;
                
                this.page = new PageModel(this.state.template,this.state.style ,undefined);
                this.router.navigate(['page/preview/']);
                
                return this.page;
            })
            return prmTemplate;
        } else {
            const prmPage = this.get(id).then(page => {
                if (this.state.isChanged && this.state.id === id) return this.page;
                else {            
                    console.log('the page from service====?',page);
                        
                    this.page = page
                    this.state.template = undefined;
                    this.state.id = id;
                    this.state.isChanged = false;
                    return this.page;
                }
            });
            return prmPage;
        }

    }
     
    save() : Promise<PageModel>{
        
        console.log('sending save request with data: ', this.page);
        
        let id = this.page.id;
        let response : any;
        let prmPage : Promise<PageModel>;

        if (id) {
            const url = this.baseUrl + id;
            response = this.http.put(url, this.page)
        } else {
            const url = this.baseUrl;
            response = this.http.post(url, this.page,{withCredentials:true})
        }

        prmPage = response.toPromise()
        .then((res : any) => {
            const jsonPage = res.json();
            this.state.isChanged = false;
            this.toastr.success('Page successfully saved', 'id:' + jsonPage._id);
            return new PageModel(jsonPage.data,jsonPage.style, jsonPage._id);
        });

        prmPage.catch(err => {
            console.log('PageService::save - Problem talking to server', err);
        });
        return prmPage;
  }

    remove(id: string) : Promise<PageModel[]> {
        let prmPage = this.http.delete(this.baseUrl + id)
        .toPromise()
        .then(res => {
            ('Page successfully deleted ', 'id: ' + id);
            return this.query();
        });

        prmPage.catch(err => {
        console.log('PageService::remove - Problem talking to server', err);
        });
        return prmPage;
    }

    query(): Promise<PageModel[]> {

        let prmPages = this.http.get(this.baseUrl)
        .toPromise()
        .then(res => {
            const jsonPages = res.json();
            return jsonPages.map((jsonPage : any) => 
            new PageModel(jsonPage.data,jsonPage.style, jsonPage._id)
            )});

        prmPages.catch(err => {
        console.log('PageService::query - Problem talking to server',err);
        });
        return prmPages;
    }

    get(id: string) :Promise<PageModel> {
        var options = new RequestOptions({
            withCredentials: true
        });
        let prmPage = this.http.get(this.baseUrl + id, options)
        .toPromise()
        .then(res => {
          
            return new PageModel(res.json().data,res.json().style ,res.json()._id);
        });

        prmPage.catch(err => {
            this.toastr.error('Error trying to get page', 'id: ' + id)
            console.log('PageService::get - Problem talking to server');
        });
        return prmPage;
    }
    
    upload(url: string, key: string , uploader: FileUploader, sectionId?) {
        console.log(url, key, uploader, sectionId);
         (<any>uploader).onCompleteItem = (x, imgUrl) =>{
                imgUrl = JSON.parse(imgUrl);
                let updatedData;
            if(key === 'background-image'){
                updatedData =  {key:'background-image', value: '../../rest-server'+imgUrl.imgUrl};
               console.log('update Data',updatedData);
               
            }
            else {
                updatedData = this.page.getSectionData(sectionId);
                updatedData.images.push(imgUrl.imgUrl);
            }
                this.updateSection(updatedData);
                console.log("COMPLETE:", x,this.page.getSectionData("image"));
            
        }
        uploader.uploadAll();
    }
}