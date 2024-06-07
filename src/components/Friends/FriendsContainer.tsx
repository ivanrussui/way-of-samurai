import React from 'react';
import {Friends} from './Friends';
import {changeFriendAC, FriendsType} from '../../state/sidebar-reducer';
import {StoreContext} from '../../state/store-context';
import {AppRootStateType} from '../../state/store-redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

type MapStateToPropsType = {
    friends: FriendsType[]
}
type MapDispatchToPropsType = {
    changeFriendName: (id: string, name: string) => void
}
export type FriendsPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        friends: state.sidebar.friends
    };
};
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        changeFriendName: (id: string, name: string) => {
            dispatch(changeFriendAC(id, name));
        }
    };
};

// connect возможно типизировать излишне
export const FriendsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>
(mapStateToProps, mapDispatchToProps)(Friends);


// StoreContext
// export const FriendsContainer = () => {
//     return <StoreContext.Consumer>
//         {store => {
//             const state = store.getState();
//
//             const changeFriendName = (id: string, name: string) => {
//                 store.dispatch(changeFriendAC(id, name));
//             };
//
//             return <Friends friends={state.sidebar.friends} changeFriendName={changeFriendName}/>;
//         }}
//     </StoreContext.Consumer>;
// };