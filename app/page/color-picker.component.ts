import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'color-picker',
    inputs: ['key'],
    template: `
        <input #color type="color" (change)="emitColor(color.value)">
    `
})
export class ColorPicker implements OnInit {
    constructor() { }
    @Output() colorChange = new EventEmitter();
    private key:string;
    
    ngOnInit() { }

    emitColor(color) {
        let colorObj = {key: this.key, value: color}
        this.colorChange.emit(colorObj);
        console.log(colorObj);
        
    }
}