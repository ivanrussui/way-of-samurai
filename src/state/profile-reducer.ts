import {ActionsTypes, ProfilePageType} from '../types/types';

const ADD_POST = 'ADD-POST';
const CHANGE_POST = 'CHANGE-POST';

export const profileReducer = (state: ProfilePageType, action: ActionsTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: crypto.randomUUID(),
                title: state.value,
                likeCount: 0
            };
            state.posts.push(newPost);
            state.value = '';
            return state;
        case CHANGE_POST:
            state.value = action.value;
            return state;
        default:
            return state;
    }
};

export const addPostAC = () => ({
    type: ADD_POST
} as const);
export const changePostAC = (value: string) => ({
    type: CHANGE_POST,
    value
} as const);