import {ThunkActionType, ThunkDispatchType} from './store-redux';
import {getAuthTC} from './auth-reducer';

export type AppType = {
    isInitialized: boolean
}

const initialState: AppType = {
    isInitialized: false,
};

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsAuthTypes): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.isInitialized};
        default:
            return state;
    }
};

export type ActionsAuthTypes = | ReturnType<typeof setInitialized>

export const setInitialized = (isInitialized: boolean) =>
    ({type: 'APP/SET-INITIALIZED', isInitialized}) as const;


export const setInitializedTC = (): ThunkActionType => async (dispatch: ThunkDispatchType) => {
    try {
        await dispatch(getAuthTC());
    } catch (e) {
        alert(e);
    } finally {
        dispatch(setInitialized(true));
    }
};
