const ADD_MESSAGE = 'ADD-MESSAGE';
const CHANGE_MESSAGE = 'CHANGE-MESSAGE';

export type DialogsType = {
    id: string
    name: string
}

export type MessageType = {
    id: string
    title: string
}

export type DialogsPageType = { // конкретно этот тип нужен для store-custom. тут не нужен из-за альтернативной типизации
    dialogs: DialogsType[]
    messages: MessageType[]
    value: string
}

const initialState = {
    dialogs: [
        {id: crypto.randomUUID(), name: 'Ivan'},
        {id: crypto.randomUUID(), name: 'Anna'},
        {id: crypto.randomUUID(), name: 'Melissa'},
        {id: crypto.randomUUID(), name: 'Kristina'},
        {id: crypto.randomUUID(), name: 'Vladimir'},
        {id: crypto.randomUUID(), name: 'Alexandra'},
    ] as DialogsType[], // альтернативный вариант типизации, поэтому в этом файле не нужен тип DialogsPageType
    messages: [
        {id: crypto.randomUUID(), title: 'Hi!'},
        {id: crypto.randomUUID(), title: 'My name is Ivan!'},
        {id: crypto.randomUUID(), title: 'And you?'},
        {id: crypto.randomUUID(), title: 'I am Fine'},
        {id: crypto.randomUUID(), title: 'It s cool!'},
    ] as MessageType[],
    value: '' as string // мб излишне
};

type InitialStateType = typeof initialState

export const dialogsReducer = (state: InitialStateType = initialState, action: ActionsDialogsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage = {
                id: crypto.randomUUID(),
                title: state.value
            };
            // state.messages.push(newMessage);
            // state.value = '';
            // return state;
            return {...state, messages: [...state.messages, newMessage], value: ''};
        case CHANGE_MESSAGE:
            // state.value = action.value;
            // return state;
            return {...state, value: action.value};
        default:
            return state;
    }
};

export type ActionsDialogsTypes = ReturnType<typeof addMessageAC> | ReturnType<typeof changeMessageAC>

export const addMessageAC = () => {
    return {
        type: ADD_MESSAGE
    } as const;
};
export const changeMessageAC = (value: string) => {
    return {
        type: CHANGE_MESSAGE,
        value
    } as const;
};