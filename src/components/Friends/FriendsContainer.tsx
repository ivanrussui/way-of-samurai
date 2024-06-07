import React from 'react';
import {Friends} from './Friends';
import {changeFriendAC} from '../../state/sidebar-reducer';
import {StoreContext} from '../../state/store-context';

export const FriendsContainer = () => {
    return <StoreContext.Consumer>
        {store => {
            const state = store.getState();

            const changeFriendName = (id: string, name: string) => {
                store.dispatch(changeFriendAC(id, name));
            };

            return <Friends friends={state.sidebar.friends} changeFriendName={changeFriendName}/>;
        }}
    </StoreContext.Consumer>;
};
