import {StoreType} from '../types/types';

export let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {title: 'JavaScript is the best programming language', likeCount: 10},
                {title: 'TypeScript is the best Javascript dialect', likeCount: 15}
            ],
            value: ''
        },
        dialogsPage: {
            dialogs: [
                {id: '1', name: 'Ivan'},
                {id: '2', name: 'Anna'},
                {id: '3', name: 'Melissa'},
                {id: '4', name: 'Kristina'},
                {id: '5', name: 'Vladimir'},
                {id: '6', name: 'Alexandra'},
            ],
            messages: [
                {title: 'Hi!'},
                {title: 'My name is Ivan!'},
                {title: 'And you?'},
                {title: 'I am Fine'},
                {title: 'It s cool!'},
            ],
        },
        sidebar: {
            friends: [
                {id: '1', name: 'Kristina'},
                {id: '2', name: 'Vladimir'},
                {id: '3', name: 'Alexa'},
            ]
        },
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log('_callSubscriber');
    },
    addPost() {
        let newPost = {
            title: store._state.profilePage.value,
            likeCount: 0
        };
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.value = '';
        this._callSubscriber();

    },
    changeTextarea(value: string) {
        this._state.profilePage.value = value;
        this._callSubscriber();
    },
    subscribe(observer: () => void) {
        this._callSubscriber = observer;
    },
};

window.store = store;
