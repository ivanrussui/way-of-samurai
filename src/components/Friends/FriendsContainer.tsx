import {Friends} from './Friends';
import {changeFriend, FriendsType} from '../../state/sidebar-reducer';
import {StoreContext} from '../../state/store-context';
import {AppRootStateType} from '../../state/store-redux';
import {connect} from 'react-redux';

type MapStateToPropsType = {
    friends: FriendsType[]
}
type MapDispatchToPropsType = {
    changeFriend: (id: string, name: string) => void
}
export type FriendsPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        friends: state.sidebar.friends
    };
};

// connect возможно типизировать излишне
export const FriendsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>
(mapStateToProps, {changeFriend})(Friends);


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