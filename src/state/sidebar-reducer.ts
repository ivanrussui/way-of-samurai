import {ActionsTypes, SidebarType} from '../types/types';

const CHANGE_FRIEND = 'CHANGE-FRIEND';

const initialState: SidebarType = {
    friends: [
        {id: crypto.randomUUID(), name: 'Kris'},
        {id: crypto.randomUUID(), name: 'Vovan'},
        {id: crypto.randomUUID(), name: 'Alexa'},
    ]
}

export const sidebarReducer = (state: SidebarType = initialState, action: ActionsTypes): SidebarType => {
    switch (action.type) {
        case CHANGE_FRIEND:
            return {
                ...state,
                friends: state.friends.map(el => el.id === action.id ? {...el, name: action.name} : el)
            };
        default:
            return state;
    }
};

export const changeFriendAC = (id: string, name: string) => ({
    type: CHANGE_FRIEND,
    id,
    name
} as const);