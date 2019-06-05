export function changeCardColumn(cardId,newColumnId) {
    return {
        type: 'CHANGE_CARD_COLUMN',
        newColumnId,cardId
    };
}

export function addColumn(label) {
    return {
        type: 'ADD_COLUMN',
        label
    };
}

export function addCard(columnId, label) {
    return {
        type: 'ADD_CARD',
        columnId, label
    };
}

export function setColumnText(text) {
    return {
        type: 'SET_COLUMN_TEXT',
        text
    };
}

export function setCardText(text) {
    return {
        type: 'SET_CARD_TEXT',
        text
    };
}



