import {ProfileInfoResponseType} from '../components/Profile/ProfileInfo/ProfileInfoContainer';

export type PostType = {
    id: string
    title: string
    likeCount: number
}

export type ProfilePageType = {
    posts: PostType[]
    value: string
    profileInfo: ProfileInfoResponseType | null
}

const initialState: ProfilePageType = {
    posts: [
        {id: crypto.randomUUID(), title: 'JavaScript is the best programming language', likeCount: 10},
        {id: crypto.randomUUID(), title: 'TypeScript is the best Javascript dialect', likeCount: 15}
    ],
    value: '',
    profileInfo: null
};

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsProfileTypes): ProfilePageType => {
    switch (action.type) {
        case 'ADD-POST':
            const newPost = {
                id: crypto.randomUUID(),
                title: state.value,
                likeCount: 0
            };
            return {...state, posts: [...state.posts, newPost], value: ''};
        case 'CHANGE-POST':
            return {...state, value: action.value};
        case 'SET-PROFILE':
            return {...state, profileInfo: action.profileInfo}
        default:
            return state;
    }
};

export type ActionsProfileTypes =
    | ReturnType<typeof addPost>
    | ReturnType<typeof changePost>
    | ReturnType<typeof setProfile>

export const addPost = () => ({
    type: 'ADD-POST'
} as const);
export const changePost = (value: string) => ({
    type: 'CHANGE-POST',
    value
} as const);
export const setProfile = (profileInfo: ProfileInfoResponseType) => ({
    type: 'SET-PROFILE',
    profileInfo
} as const);
