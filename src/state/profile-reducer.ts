import {PhotosType, profileAPI, ProfileInfoResponseType, ProfileInfoUpdateType} from '../api/api';
import {AppRootStateType, ThunkActionType, ThunkDispatchType} from './store-redux';
import {setAvatar, setError, setFieldErrors} from './auth-reducer';
import {v1} from 'uuid';
import {setGlobalError} from './app-reducer';
import {handleServerAppError} from '../helpers/handleServerAppError';
import {handleServerNetworkError} from '../helpers/handleServerNetworkError';

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
        {id: v1(), title: 'JavaScript is the best programming language', likeCount: 10},
        {id: v1(), title: 'TypeScript is the best JavaScript dialect', likeCount: 15}
    ],
    // value: '',
    profileInfo: null,
    status: '',
    isFetchingProfile: true
};

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsProfileTypes): ProfilePageType => {
    switch (action.type) {
        case 'PROFILE/ADD-POST':
            const newPost = {
                id: v1(),
                title: action.title,
                likeCount: 0
            };
            return {...state, posts: [...state.posts, newPost]};
        case 'PROFILE/DELETE-POST':
            return {...state, posts: state.posts.filter(post => post.id !== action.id)};
        // case 'CHANGE-POST':
        //     return {...state, value: action.value};
        case 'PROFILE/SET-PROFILE':
            return {...state, profileInfo: action.profileInfo};
        case 'PROFILE/SET-STATUS':
            return {...state, status: action.status};
        case 'PROFILE/TOGGLE-IS-FETCHING-PROFILE':
            return {...state, isFetchingProfile: action.isFetchingProfile};
        case 'PROFILE/UPDATE-PHOTO':
            if (!state.profileInfo) return state;
            return {...state, profileInfo: {...state.profileInfo, photos: action.file}};
        default:
            return state;
    }
};

export type ActionsProfileTypes =
    | ReturnType<typeof addPost>
    | ReturnType<typeof deletePost>
    // | ReturnType<typeof changePost>
    | ReturnType<typeof setProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof toggleIsFetchingProfile>
    | ReturnType<typeof updatePhoto>
    | ReturnType<typeof updateProfile> // 2 вариант обновления профиля через отдельный actionCreator & case

export const addPost = (title: string) => ({
    type: 'PROFILE/ADD-POST',
    title
} as const);
export const deletePost = (id: string) => ({
    type: 'PROFILE/DELETE-POST',
    id
} as const);
// export const changePost = (value: string) => ({
//     type: 'CHANGE-POST',
//     value
// } as const);
export const setProfile = (profileInfo: ProfileInfoResponseType) => ({
    type: 'PROFILE/SET-PROFILE',
    profileInfo
} as const);
export const setStatus = (status: string) => ({
    type: 'PROFILE/SET-STATUS',
    status
} as const);
export const toggleIsFetchingProfile = (isFetchingProfile: boolean) => ({
    type: 'PROFILE/TOGGLE-IS-FETCHING-PROFILE', isFetchingProfile
} as const);
export const updatePhoto = (file: PhotosType) => ({
    type: 'PROFILE/UPDATE-PHOTO', file
} as const);
export const updateProfile = (profile: ProfileInfoUpdateType) => ({
    type: 'PROFILE/UPDATE-PROFILE', profile
} as const);

// async await
export const getProfileTC = (id: number, photo = false, isAuth = false): ThunkActionType => async (dispatch: ThunkDispatchType) => {
    try {
        const data = await profileAPI.getProfile(id);
        if (!isAuth) {
            dispatch(setProfile(data));
        }
        if (photo) {
            dispatch(setAvatar(data.photos.small));
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    } finally {
        dispatch(toggleIsFetchingProfile(false));
    }
};

export const getStatusTC = (id: number): ThunkActionType => async (dispatch: ThunkDispatchType) => {
    try {
        const data = await profileAPI.getStatus(id);
        dispatch(setStatus(data));
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    }
};

export const updateStatusTC = (status: string): ThunkActionType<Promise<void>> => async (dispatch: ThunkDispatchType) => {
    try {
        const data = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(setStatus(status));
            dispatch(setError(null));
            return Promise.resolve();
        } else {
            handleServerAppError(data, dispatch, setGlobalError);
            return Promise.reject();
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch);
        return Promise.reject();
    }
};

export const updatePhotoTC = (file: File): ThunkActionType => async (dispatch: ThunkDispatchType) => {
    try {
        const formData = new FormData();
        formData.append('image', file);
        const data = await profileAPI.updatePhoto(formData);
        if (data.resultCode === 0) {
            dispatch(setAvatar(data.data.photos.small));
            dispatch(updatePhoto(data.data.photos));
        } else {
            handleServerAppError(data, dispatch, setGlobalError);
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    }
};

export const updateProfileTC = (profile: ProfileInfoUpdateType) => async (dispatch: ThunkDispatchType, getState: () => AppRootStateType) => {
    const userId = getState().auth.data?.id;
    try {
        const data = await profileAPI.updateProfile(profile);
        if (data.resultCode !== 0) {
            const fieldErrors: Record<string, string> = {};
            data.messages.forEach(msg => {
                const fieldMatch = msg.match(/\(([^)]+)\)/);
                if (fieldMatch) {
                    // rawField может быть, например, "Contacts->Twitter" или "FullName" или "AboutMe"
                    const rawField = fieldMatch[1];
                    let formattedField = rawField.replace(/->/g, '.').toLowerCase();

                    // Добавляем префиксы для AboutMe, FullName и LookingForAJobDescription чтобы ключи точно совпадали с путями формы
                    if (formattedField === 'aboutme' || formattedField === 'fullname' || formattedField === 'lookingforajobdescription') {
                        formattedField = `aboutMe.${formattedField}`;
                    }
                    fieldErrors[formattedField] = msg;
                } else {
                    fieldErrors._error = msg;
                    dispatch(setGlobalError(msg));
                }
            });
            dispatch(setFieldErrors(fieldErrors));
            return fieldErrors;
        } else {
            dispatch(setFieldErrors(null));
            userId && dispatch(getProfileTC(userId));
            return undefined;
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    }
};
