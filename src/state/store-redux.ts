import {combineReducers, legacy_createStore as createStore} from 'redux';
import {profileReducer} from './profile-reducer';
import {dialogsReducer} from './dialogs-reducer';
import {sidebarReducer} from './sidebar-reducer';

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer
})

const storeRedux = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>

window.storeRedux = storeRedux;

export default storeRedux;