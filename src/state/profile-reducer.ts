const ADD_POST = 'ADD-POST';
const CHANGE_POST = 'CHANGE-POST';

export type PostType = {
    id: string
    title: string
    likeCount: number
}

export type ProfilePageType = {
    posts: PostType[]
    value: string
}

const initialState: ProfilePageType = {
    posts: [
        {id: crypto.randomUUID(), title: 'JavaScript is the best programming language', likeCount: 10},
        {id: crypto.randomUUID(), title: 'TypeScript is the best Javascript dialect', likeCount: 15}
    ],
    value: ''
};

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsProfileTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: crypto.randomUUID(),
                title: state.value,
                likeCount: 0
            };
            return {...state, posts: [...state.posts, newPost], value: ''};
        case CHANGE_POST:
            return {...state, value: action.value};
        default:
            return state;
    }
};

export type ActionsProfileTypes = ReturnType<typeof addPostAC> | ReturnType<typeof changePostAC>

export const addPostAC = () => ({
    type: ADD_POST
} as const);
export const changePostAC = (value: string) => ({
    type: CHANGE_POST,
    value
} as const);