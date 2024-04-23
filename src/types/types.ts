export type PostType = {
    title: string
    likeCount: number
}

export type ProfilePageType = {
    posts: PostType[]
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
    title: string
}

export type DialogsPageType = {
    dialogs: DialogsType[]
    messages: MessageType[]
}

export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}
