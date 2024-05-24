import {ActionsTypes, StoreType} from '../types/types';

const ADD_POST = 'ADD-POST';
const CHANGE_POST = 'CHANGE-POST';
const ADD_MESSAGE = 'ADD-MESSAGE';
const CHANGE_MESSAGE = 'CHANGE-TEXTAREA';

export let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: crypto.randomUUID(), title: 'JavaScript is the best programming language', likeCount: 10},
                {id: crypto.randomUUID(), title: 'TypeScript is the best Javascript dialect', likeCount: 15}
            ],
            value: ''
        },
        dialogsPage: {
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
        },
        sidebar: {
            friends: [
                {id: '1', name: 'Kristina'},
                {id: '2', name: 'Vladimir'},
                {id: '3', name: 'Alexa'},
            ]
        },
    },
    _callSubscriber() {
        console.log('_callSubscriber');
    },
    getState() {
        return this._state;
    },
    subscribe(observer: () => void) {
        this._callSubscriber = observer;
    },
    dispatch(action: ActionsTypes) {
        if (action.type === ADD_POST) {
            const newPost = {
                id: crypto.randomUUID(),
                title: store._state.profilePage.value,
                likeCount: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.value = '';
            this._callSubscriber();
        } else if (action.type === CHANGE_POST) {
            this._state.profilePage.value = action.value;
            this._callSubscriber();
        } else if (action.type === ADD_MESSAGE) {
            const newMessage = {
                id: crypto.randomUUID(),
                title: store._state.dialogsPage.value
            };
            this._state.dialogsPage.messages.push(newMessage);
            this._state.dialogsPage.value = '';
            this._callSubscriber();
        } else if (action.type === CHANGE_MESSAGE) {
            this._state.dialogsPage.value = action.value;
            this._callSubscriber();
        }
    }
};

export const addPostAC = () => ({
    type: ADD_POST
} as const);
export const changePostAC = (value: string) => ({
    type: CHANGE_POST,
    value
} as const);

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

window.store = store;
