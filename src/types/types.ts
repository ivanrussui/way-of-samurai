import {Store} from 'redux';
import {AppRootStateType} from '../state/store-redux';
import {StoreType} from '../state/store-custom';

// типизация чтобы можно было через window обращаться к store
declare global {
    interface Window {
        store: Store<AppRootStateType>;
        storeCustom: StoreType;
    }
}
