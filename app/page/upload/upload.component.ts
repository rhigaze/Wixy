
import { Component, OnInit, EventEmitter} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from '../../../node_modules/ng2-file-upload';

const URL = 'http://localhost:3003/doUpload';

@Component({
    moduleId: module.id,
    selector: 'upload-file',
    styleUrls: ['../../../css/page/upload/upload.component.css'],
    templateUrl: 'upload.component.html',
    inputs: ['uploader','background'],
    outputs: ['uploaded'],
    directives: [FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class UploadComponent implements OnInit {

    private uploader;
    private background;
    public hasBaseDropZoneOver:boolean = false;
    private uploaded = new EventEmitter()

    constructor() {  }
    ngOnInit()    {  }

    public fileOverBase(e:any):void { 
        this.hasBaseDropZoneOver = e;
    }
    
    doUpload(){
        console.log(this.uploader)
          if (this.uploader.getNotUploadedItems().length) this.uploaded.emit(this.uploader);
          
    }

}
   