import React, {FC} from 'react';
import {Store} from 'redux';
import {AppRootStateType} from '../../state/store-redux';
import {Friends} from './Friends';
import {changeFriendAC} from '../../state/sidebar-reducer';

type PropsType = {
    store: Store<AppRootStateType>
}

export const FriendsContainer: FC<PropsType> = ({store}) => {
    const state = store.getState();

    const changeFriendName = (id: string, name: string) => {
        store.dispatch(changeFriendAC(id, name));
    };

    return <Friends friends={state.sidebar.friends} changeFriendName={changeFriendName}/>;
};
