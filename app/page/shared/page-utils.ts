export function getUpdatedData(data, edited, isVisual?) {
        
        let key  = edited.key;
        let value = edited.value;
        
        let updatedData = Object.assign({}, data);
        
        if (isVisual && updatedData.visual) updatedData.visual[key] = value;
        else updatedData[key] = value;
        
        return updatedData;
    }

export function saveEditable(edited, isVisual?) {
        const updatedData = getUpdatedData(this.data, edited, isVisual)
        this.userChange.emit(updatedData)
    }