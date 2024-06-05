import {ActionsTypes, DialogsPageType} from '../types/types';

const ADD_MESSAGE = 'ADD-MESSAGE';
const CHANGE_MESSAGE = 'CHANGE-MESSAGE';

const initialState: DialogsPageType = {
    dialogs: [
        {id: crypto.randomUUID(), name: 'Ivan'},
        {id: crypto.randomUUID(), name: 'Anna'},
        {id: crypto.randomUUID(), name: 'Melissa'},
        {id: crypto.randomUUID(), name: 'Kristina'},
        {id: crypto.randomUUID(), name: 'Vladimir'},
        {id: crypto.randomUUID(), name: 'Alexandra'},
    ],
    messages: [
        {id: crypto.randomUUID(), title: 'Hi!'},
        {id: crypto.randomUUID(), title: 'My name is Ivan!'},
        {id: crypto.randomUUID(), title: 'And you?'},
        {id: crypto.randomUUID(), title: 'I am Fine'},
        {id: crypto.randomUUID(), title: 'It s cool!'},
    ],
    value: ''
}

export const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsTypes): DialogsPageType => {
    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage = {
                id: crypto.randomUUID(),
                title: state.value
            };
            state.messages.push(newMessage);
            state.value = '';
            return state;
        case CHANGE_MESSAGE:
            state.value = action.value;
            return state;
        default:
            return state;
    }
};

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