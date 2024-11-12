import React, {createContext, FC, ReactNode} from 'react';
import {Store} from 'redux';
import {AppRootStateType} from './store-redux';

export const StoreContext = createContext({} as Store<AppRootStateType>);

export type ProviderType = {
    store: Store<AppRootStateType>
    children: ReactNode
}

export const Provider: FC<ProviderType> = ({store, children}) => {
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
};
