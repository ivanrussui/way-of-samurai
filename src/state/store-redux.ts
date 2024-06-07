import {combineReducers, legacy_createStore as createStore} from 'redux';
import {profileReducer} from './profile-reducer';
import {dialogsReducer} from './dialogs-reducer';
import {sidebarReducer} from './sidebar-reducer';

export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer
});

const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>

window.store = store;

export default store;
