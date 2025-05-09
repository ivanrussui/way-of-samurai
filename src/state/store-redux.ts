import {applyMiddleware, combineReducers, legacy_createStore as createStore, UnknownAction} from 'redux';
import {profileReducer} from './profile-reducer';
import {dialogsReducer} from './dialogs-reducer';
import {sidebarReducer} from './sidebar-reducer';
import {usersReducer} from './users-reducer';
import {authReducer} from './auth-reducer';
import {thunk, ThunkAction, ThunkDispatch} from 'redux-thunk';
import {appReducer} from './app-reducer';

export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// типизация для thunk (ThunkAction), что внутри санки диспатчить другую санку
export type ThunkActionType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>

// ThunkDispatchType нужен для типизации dispatch внутри санок, где мы диспатчим еще санку
export type ThunkDispatchType = ThunkDispatch<AppRootStateType, unknown, UnknownAction>;

// export const useAppDispatch = () => useDispatch<ThunkDispatch<AppRootStateType, unknown, UnknownAction>>();

window.store = store;

export default store;
