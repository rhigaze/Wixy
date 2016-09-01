import {Component, Input, Output, Provider, forwardRef, EventEmitter, ElementRef, ViewChild, Renderer} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/common";

const INLINE_EDIT_CONTROL_VALUE_ACCESSOR = new Provider(
    NG_VALUE_ACCESSOR, {
        useExisting: forwardRef(() => InlineEditComponent),
        multi: true
    });

@Component({
    moduleId: module.id,
    selector: 'inline-edit',
    providers: [INLINE_EDIT_CONTROL_VALUE_ACCESSOR],
    styleUrls: ['../../../css/page/inline-edit/inline-edit.component.css'],
    // templateUrl: 'inline-edit.component.html'
    template : `
    <div id="inlineEditWrapper"  (click)="edit(value)"  >
        <!-- Editable value   -->
        <a class="iedit"  [hidden]="editing" > {{ value }}</a> 
  
        <!--<span class="glyphicon glyphicon-pencil" [hidden]="editing"></span>-->

        <!-- inline edit form -->
       <form  #inlineEditForm="ngForm" class="inlineEditForm form-inline" (ngSubmit)="onSubmit(value)" [hidden]="!editing">
            <div class="form-group">

                <!-- inline edit control  -->
                <input style="margin-bottom:10px;" class="form-control"  [(ngModel)]="value" name="value"/>

                <!-- inline edit save and cancel buttons -->
                <br/>
                <span >
                    <button type="submit" class="btn btn-primary">Change</button>
                    <button class="btn btn-default" (click)="cancel(value)">Cancel</button>
                </span>
        </div>
    </form>
</div>
    `,
    inputs: ['key','value']
    
})
export class InlineEditComponent implements ControlValueAccessor{

    // inline edit form control
    @ViewChild('inlineEditControl') inlineEditControl;
    @Output() public onSave:EventEmitter<any> = new EventEmitter();

   
    private value:string ;
    private key:string ;
    private preValue:string = '';
    private editing:boolean = false;
    public onChange:any = Function.prototype;
    public onTouched:any = Function.prototype;
    
    constructor(element: ElementRef, private _renderer:Renderer) {    
    }

    writeValue(value: any) {
        // this.value = value;
    }

    public registerOnChange(fn:(_:any) => {}):void {this.onChange = fn;}

    public registerOnTouched(fn:() => {}):void {this.onTouched = fn;};

    // Method to display the inline edit form and hide the <a> element
    edit(value){
        this.preValue = value;  // Store original value in case the form is cancelled
        this.editing = true;

        // Automatically focus input
       // setTimeout( _ => this._renderer.invokeElementMethod(this.inlineEditControl.nativeElement, 'focus', []));
    }

    // Method to display the editable value as text and emit save event to host
    onSubmit(value){
        let edit = {'key' : this.key , 'value' : value};
        this.onSave.emit(edit);
        this.editing = false;
    }

    // Method to reset the editable value
    cancel(value:any){
        this.value = this.preValue;
        this.editing = false;
    }

}