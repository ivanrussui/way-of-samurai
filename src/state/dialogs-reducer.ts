import {ActionsTypes, DialogsPageType} from '../types/types';

const ADD_MESSAGE = 'ADD-MESSAGE';
const CHANGE_MESSAGE = 'CHANGE-MESSAGE';

export const dialogsReducer = (state: DialogsPageType, action: ActionsTypes): DialogsPageType => {
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