import {addMessageAC, addPostAC, changeMessageAC, changePostAC} from '../state/state';

declare global {
    interface Window {
        store: StoreType;
    }
}

export type StoreType = {
    _state: StateType
    _callSubscriber: () => void
    getState: () => StateType
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionsTypes) => void
}

export type ActionsTypes = ReturnType<typeof addPostAC> | ReturnType<typeof changePostAC>
| ReturnType<typeof addMessageAC> | ReturnType<typeof changeMessageAC>

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
