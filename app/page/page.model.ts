export class PageModel {
    
    constructor(public data,public style, private _id ) {
        this.data.sections.map((section, i)  => Object.assign(section, section.id = i));
        if(!style){
        this.style = {
            'background-color' : '',
            'background-image' : '',
        }
        console.log('the style is undefined');
        
        }
    }

    get id() {
        return this._id;
    }
    public getSectionData(sectionId: string) {
        
        if (!this.data) return {};
        return this.data.sections.filter(section => section.id === sectionId)[0];
    }

    public setSectionData(edited: any) {
        if (edited.id !==0 && !edited.id) {
            if(edited.key === 'background-image') this.style[edited.key] = 'url(' +edited.value+')';
            else this.style[edited.key] = edited.value;
            
            console.log('the data after upload background',this.style);
            return;
        }
        this.data.sections[this.getIndex(edited)] = edited;
        
    }

    private getIndex(data){
        let index = -1;
        this.data.sections.forEach((section, i) => { 
            if (section.id === data.id) index = i
        })
        return index;    
    }
    
    public getSections() {
        return this.data.sections
    }

    public addSection(sectionObj) {
        const sectionToAdd = sectionObj.sectionToAdd;
        const after = +sectionObj.afterSection;
        let sections = this.data.sections;
        
        sections = [
            ...sections.slice(0, after+1),
            sectionToAdd,
            ...sections.slice(after+1)
        ];

        this.data.sections = sections.map((section, i)  => Object.assign(section, section.id = i));
    } 

    public removeSection(sectionData) {
        let sections = this.data.sections
        sections = sections.filter((section) => {
            return section.id !== sectionData.section.id;
        })
        this.data.sections = sections.map((section, i)  => Object.assign(section, section.id = i));
    }
    
}
