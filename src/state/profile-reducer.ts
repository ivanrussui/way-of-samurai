import {profileAPI, ProfileInfoResponseType} from '../api/api';
import {ThunkActionType, ThunkDispatchType} from './store-redux';
import {setAvatar} from './auth-reducer';

export type PostType = {
    id: string
    title: string
    likeCount: number
}

export type ProfilePageType = {
    posts: PostType[]
    // value: string
    profileInfo: ProfileInfoResponseType | null,
    status: string,
    isFetchingProfile: boolean
}

const initialState: ProfilePageType = {
    posts: [
        {id: crypto.randomUUID(), title: 'JavaScript is the best programming language', likeCount: 10},
        {id: crypto.randomUUID(), title: 'TypeScript is the best Javascript dialect', likeCount: 15}
    ],
    // value: '',
    profileInfo: null,
    status: '',
    isFetchingProfile: true
};

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsProfileTypes): ProfilePageType => {
    switch (action.type) {
        case 'ADD-POST':
            const newPost = {
                id: crypto.randomUUID(),
                title: action.title,
                likeCount: 0
            };
            return {...state, posts: [...state.posts, newPost]};
        // case 'CHANGE-POST':
        //     return {...state, value: action.value};
        case 'SET-PROFILE':
            return {...state, profileInfo: action.profileInfo};
        case 'SET-STATUS':
            return {...state, status: action.status};
        case 'TOGGLE-IS-FETCHING-PROFILE':
            return {...state, isFetchingProfile: action.isFetchingProfile};
        default:
            return state;
    }
};

export type ActionsProfileTypes =
    | ReturnType<typeof addPost>
    // | ReturnType<typeof changePost>
    | ReturnType<typeof setProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof toggleIsFetchingProfile>

export const addPost = (title: string) => ({
    type: 'ADD-POST',
    title
} as const);
// export const changePost = (value: string) => ({
//     type: 'CHANGE-POST',
//     value
// } as const);
export const setProfile = (profileInfo: ProfileInfoResponseType) => ({
    type: 'SET-PROFILE',
    profileInfo
} as const);
export const setStatus = (status: string) => ({
    type: 'SET-STATUS',
    status
} as const);
export const toggleIsFetchingProfile = (isFetchingProfile: boolean) => ({
    type: 'TOGGLE-IS-FETCHING-PROFILE', isFetchingProfile
} as const);

// Promise
// export const getProfileTC = (id: number, isAuth = false): ThunkActionType => (dispatch: ThunkDispatchType) => {
//     return profileAPI.getProfile(id)
//         .then(data => {
//             if (!isAuth) {
//                 dispatch(setProfile(data));
//             }
//             dispatch(setAvatar(data.photos.small));
//             dispatch(toggleIsFetchingProfile(false));
//         });
// };

// async await
export const getProfileTC = (id: number, isAuth = false): ThunkActionType => async (dispatch: ThunkDispatchType) => {
    try {
        const data = await profileAPI.getProfile(id);
        if (!isAuth) {
            dispatch(setProfile(data));
        }
        dispatch(setAvatar(data.photos.small));
    } catch (e) {
        console.error((e as Error).message);
    } finally {
        dispatch(toggleIsFetchingProfile(false));
    }
};

export const getStatusTC = (id: number): ThunkActionType => async (dispatch: ThunkDispatchType) => {
    try {
        const data = await profileAPI.getStatus(id);
        dispatch(setStatus(data));
    } catch (e) {
        console.error((e as Error).message);
    }
};

export const updateStatusTC = (status: string): ThunkActionType => async (dispatch: ThunkDispatchType) => {
    try {
        const data = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (e) {
        console.error((e as Error).message);
    }
};