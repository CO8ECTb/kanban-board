const initialState = {
    columns: [
        {id:1, label: 'План на месяц'},
        {id:2, label: "План на день"},
        {id:3, label: "Итоги"},
    ],
    columnText:'',
    cards:[
        {id:1, columnId: 1, label:'Собрать портфолио'},
        {id:2, columnId: 2, label:'Записаться на курс по React'},
        {id:3, columnId:1, label:'Записаться на курс английского языка, чтобы уехать жить в Лондон'},
    ],
    cardText:''
};

export default function AppReducer (state = initialState, action) {
    switch (action.type) {
        case 'ADD_COLUMN':
            const newId = state.columns.length + 1;
            return {
                ...state,
                columns: state.columns.concat({id: newId, label: action.label}),
                columnText: ''
            };
        case 'SET_COLUMN_TEXT':
            return{ ...state,columnText: action.text};
        case 'SET_CARD_TEXT':
            return{ ...state,cardText: action.text};
        case 'ADD_CARD':
            const newCardId = state.cards.length + 1;
            return {
                ...state,
                cards: state.cards.concat({id: newCardId, label:action.label, columnId: action.columnId}),
                cardText: '',
            };
        case 'CHANGE_CARD_COLUMN':
            return {
                ...state,
                cards: state.cards.map(card => {
                        if ((card.id == action.cardId) && (action.newColumnId !== undefined)) {
                            return {...card, columnId: action.newColumnId }
                        } else return card;
                    }
                )
            };
        default:
            return state;
    }
}
