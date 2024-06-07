import {addPostAC, changePostAC} from '../state/profile-reducer';
import {addMessageAC, changeMessageAC} from '../state/dialogs-reducer';
import {changeFriendAC} from '../state/sidebar-reducer';
import {Store} from 'redux';
import {rootReducer} from '../state/store-redux';
import {ReactNode} from 'react';

declare global {
    interface Window {
        storeCustom: StoreType;
        storeRedux: Store<AppRootStateType>;
    }
}

export type ProviderType = {
    store: Store<AppRootStateType>
    children: ReactNode
}

export type AppRootStateType = ReturnType<typeof rootReducer>

export type StoreType = {
    _state: StateType
    _callSubscriber: () => void
    getState: () => StateType
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionsTypes) => void
}

export type ActionsTypes = ReturnType<typeof addPostAC> | ReturnType<typeof changePostAC>
| ReturnType<typeof addMessageAC> | ReturnType<typeof changeMessageAC>
| ReturnType<typeof changeFriendAC>

export type PostType = {
    id: string
    title: string
    likeCount: number
}

export type ProfilePageType = {
    posts: PostType[]
    value: string
}

export type FriendsType = {
    id: string
    name: string
}

export type SidebarType = {
    friends: FriendsType[]
}

export type DialogsType = {
    id: string
    name: string
}

export type MessageType = {
    id: string
    title: string
}

export type DialogsPageType = {
    dialogs: DialogsType[]
    messages: MessageType[]
    value: string
}

export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}
