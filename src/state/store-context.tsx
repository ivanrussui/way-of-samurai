import React, {FC} from 'react';
import {Store} from 'redux';
import {AppRootStateType, ProviderType} from '../types/types';

export const StoreContext = React.createContext({} as Store<AppRootStateType>);

export const Provider: FC<ProviderType> = ({store, children}) => {
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
};
