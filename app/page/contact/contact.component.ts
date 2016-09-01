import { Component, OnInit, EventEmitter  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, REACTIVE_FORM_DIRECTIVES, FormControl} from '@angular/forms';
import { InlineEditComponent } from '../inline-edit/inline-edit.component';


@Component({
    moduleId: module.id,
    selector: 'contact-us',
    directives: [InlineEditComponent, REACTIVE_FORM_DIRECTIVES],
    styleUrls: ['../../../css/page/contact/contact.component.css'],
    templateUrl: 'contact.component.html',
    inputs: ['data', 'editMode'],
    outputs: ['userChange']

})
export class ContactComponent implements OnInit {
    private data;
    private editMode;
    private frmContact: FormGroup;
    private dataForm: Object;
    private userChange = new EventEmitter()

    constructor(private formBuilder: FormBuilder) {
        this.frmContact = formBuilder.group({
            email: ["", Validators.required],
            phone: ["", Validators.required],
            message: ["", Validators.required],
            name: ["", Validators.required]
        });
     }

    ngOnInit() {
        this.dataForm = this.data.frmLabels;
     }
    
     saveEditable(edited){
        let key  = edited.key;
        let value = edited.value;
        this.dataForm[key] = value;
        this.data.frmLabels = this.dataForm;
    }
    doLogin(event) {
        // console.log(this.frmContact.value);
        // event.preventDefault();
    }

    removeSection() {
        console.log(this.data)
        this.userChange.emit({action: 'remove', section: this.data})
    }
}