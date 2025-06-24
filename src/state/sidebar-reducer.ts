export type FriendsType = {
    id: string
    name: string
}

export type SidebarType = {
    friends: FriendsType[]
}

const initialState: SidebarType = {
    friends: [
        {id: crypto.randomUUID(), name: 'Kris'},
        {id: crypto.randomUUID(), name: 'Vovan'},
        {id: crypto.randomUUID(), name: 'Alexa'},
    ]
};

export const sidebarReducer = (state: SidebarType = initialState, action: ActionsSidebarTypes): SidebarType => {
    switch (action.type) {
        case 'SIDEBAR/CHANGE-FRIEND':
            return {
                ...state,
                friends: state.friends.map(el => el.id === action.id ? {...el, name: action.name} : el)
            };
        default:
            return state;
    }
};

export type ActionsSidebarTypes = ReturnType<typeof changeFriend>

export const changeFriend = (id: string, name: string) => ({
    type: 'SIDEBAR/CHANGE-FRIEND', id, name
} as const);