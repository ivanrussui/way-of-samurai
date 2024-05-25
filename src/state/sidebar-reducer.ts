import {ActionsTypes, SidebarType} from '../types/types';

const CHANGE_FRIEND = 'CHANGE-FRIEND';

export const sidebarReducer = (state: SidebarType, action: ActionsTypes): SidebarType => {
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