import { Component, OnInit, EventEmitter } from '@angular/core';
import { InlineEditComponent } from '../inline-edit/inline-edit.component';
import { getUpdatedData } from '../shared/page-utils'

@Component({
    moduleId: module.id,
    selector: 'cards',
    directives: [InlineEditComponent],
    styleUrls: ['../../../css/page/cards/cards.component.css'],
    template: `
        <section *ngIf="editMode" class="inEdit">
            <section class="btns" >
                <button class="btn btn-success" (click)="addNewCard()" > Add card </button>
                <button class="btn btn-danger"  (click)="removeSection()">Delete Section</button>
            </section>
            <section class="cards">
                <section class="card" *ngFor="let card of data.cards; let i = index">   
                    <h4>
                        <inline-edit class="title" [key]="'title'" [value]="card.title" 
                        (onSave)="saveEditable($event, i)"></inline-edit>
                        <span (click)="chooseIcon(true, i)" [class]="card.icon" aria-hidden="true"></span>
                    </h4>
                    
                    <inline-edit [key]="'txt'" [value]="card.txt" (onSave)="saveEditable($event, i)"> </inline-edit>
                    <button class="btn btn-warning" (click)="removeCard(i)"> <span class="glyphicon glyphicon-trash"></span> </button>
                </section>
            </section>
        
            <section  [hidden]="!showIcon">
                <section class="icons">
                    <button type="button" class="close" (click)="chooseIcon(false, index)" >&times;</button>
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-circle-arrow-down')" class="glyphicon glyphicon-circle-arrow-down" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-folder-open')"       class="glyphicon glyphicon-folder-open" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-resize-vertical')"   class="glyphicon glyphicon-resize-vertical" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-hdd')"               class="glyphicon glyphicon-hdd" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-bell')"              class="glyphicon glyphicon-bell" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-certificate')"       class="glyphicon glyphicon-certificate" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-thumbs-up')"         class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-thumbs-down')"       class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-hand-right')"        class="glyphicon glyphicon-hand-right" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-circle-arrow-right')" class="glyphicon glyphicon-circle-arrow-right" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-circle-arrow-left')"  class="glyphicon glyphicon-circle-arrow-left" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-circle-arrow-up')"    class="glyphicon glyphicon-circle-arrow-up" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-circle-arrow-down')"  class="glyphicon glyphicon-circle-arrow-down" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-globe')"             class="glyphicon glyphicon-globe" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-tasks')"             class="glyphicon glyphicon-tasks" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-filter')"            class="glyphicon glyphicon-filter" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-briefcase')"         class="glyphicon glyphicon-briefcase" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-fullscreen')"        class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-dashboard')"         class="glyphicon glyphicon-dashboard" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-paperclip')"         class="glyphicon glyphicon-paperclip" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-link')"               class="glyphicon glyphicon-link" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-phone')"             class="glyphicon glyphicon-phone" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-pushpin')"             class="glyphicon glyphicon-pushpin" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-sort')"             class="glyphicon glyphicon-sort" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-expand')"             class="glyphicon glyphicon-expand" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-alert')"             class="glyphicon glyphicon-alert" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-alert')"             class="glyphicon glyphicon-alert" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-alert')"             class="glyphicon glyphicon-alert" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-alert')"             class="glyphicon glyphicon-alert" aria-hidden="true"></span>                 
                    <span (click)="chooseIcon(false , index ,'glyphicon glyphicon-alert')"             class="glyphicon glyphicon-alert" aria-hidden="true"></span>                 
                </section>
            </section>
        </section>
      
        <section class="cards"  *ngIf="!editMode">
            <section class="card" *ngFor="let card of data.cards">
                <span [class]="card.icon" aria-hidden="true"></span>
                <h4 class="title">{{card.title}}</h4>
                <h5>{{card.txt}}</h5>
            </section>
        </section>
    `,
    inputs: ['data','editMode'],
    outputs: ['userChange']
})
export class CardsComponent implements OnInit {
    private data;
    private editMode;
    private cardObj = {type: 'card',icon: 'glyphicon glyphicon-wrench' , title: 'Title', txt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
    private index = 0;  
    private showIcon= false;
    private userChange = new EventEmitter();

    constructor(){
     }
 
    ngOnInit() { 
    } 
    
    saveEditable(edited, index){
        const editedCard = {type: 'card', 'icon':  this.data.cards[index].icon ,'title': this.data.cards[index].title, 'txt': this.data.cards[index].txt};
        if(edited.key === 'title') editedCard.title = edited.value 
        else if(edited.key ==='txt') editedCard.txt = edited.value; 
            else  editedCard.icon = edited.value
        const updatedData = this.data;
        updatedData.cards[index] = editedCard;
        console.log(updatedData);
        
        this.userChange.emit(updatedData);
    }
    
    addNewCard(){
        const updatedData = Object.assign({}, this.data);
        updatedData.cards.push(this.cardObj);
        this.userChange.emit(updatedData);
    }

    removeCard(index){
        let updatedData = Object.assign({}, this.data);
        updatedData.cards.splice(index,1)
        this.userChange.emit(updatedData);
    }

    removeSection() {
        this.userChange.emit({action: 'remove', section: this.data})
    }
     chooseIcon(show , index ,glyphicon?){
        if( show ){
             this.index = index;
             this.showIcon = true;
        }
        else if(!(show) && (glyphicon)){
            var edited = {
                key : 'icon',
                value: glyphicon
            }
            this.saveEditable(edited,index);
            this.showIcon = show;
        }else   this.showIcon = show;
    }
}
