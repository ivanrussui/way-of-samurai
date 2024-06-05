import {ActionsTypes, ProfilePageType} from '../types/types';

const ADD_POST = 'ADD-POST';
const CHANGE_POST = 'CHANGE-POST';

const initialState: ProfilePageType = {
    posts: [
        {id: crypto.randomUUID(), title: 'JavaScript is the best programming language', likeCount: 10},
        {id: crypto.randomUUID(), title: 'TypeScript is the best Javascript dialect', likeCount: 15}
    ],
    value: ''
}

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes): ProfilePageType => {
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