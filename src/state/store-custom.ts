import {ActionsDialogsTypes, DialogsPageType, dialogsReducer} from './dialogs-reducer';
import {ActionsProfileTypes, ProfilePageType, profileReducer} from './profile-reducer';
import {ActionsSidebarTypes, SidebarType, sidebarReducer} from './sidebar-reducer';

export type ActionsALLTypes = ActionsProfileTypes | ActionsDialogsTypes | ActionsSidebarTypes

export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}

export type StoreType = {
    _state: StateType
    _callSubscriber: () => void
    getState: () => StateType
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionsALLTypes) => void
}

const storeCustom: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: crypto.randomUUID(), title: 'JavaScript is the best programming language', likeCount: 10},
                {id: crypto.randomUUID(), title: 'TypeScript is the best Javascript dialect', likeCount: 15}
            ],
            // value: '',
            profileInfo: null,
            status: '',
            isFetchingProfile: true
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
            // value: ''
        },
        sidebar: {
            friends: [
                {id: crypto.randomUUID(), name: 'Kris'},
                {id: crypto.randomUUID(), name: 'Vovan'},
                {id: crypto.randomUUID(), name: 'Alexa'},
            ]
        },
    },
    _callSubscriber() {
        console.log('_callSubscriber');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action: ActionsALLTypes) {
        this._state.profilePage = profileReducer(this._state.profilePage, action as ActionsProfileTypes);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action as ActionsDialogsTypes);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action as ActionsSidebarTypes);

        this._callSubscriber();
    }
};

window.storeCustom = storeCustom;

export default storeCustom;