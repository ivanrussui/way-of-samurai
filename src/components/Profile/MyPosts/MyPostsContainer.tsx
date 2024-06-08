import {addPostAC, changePostAC, PostType} from '../../../state/profile-reducer';
import {StoreContext} from '../../../state/store-context';
import {MyPosts} from './MyPosts';
import {AppRootStateType} from '../../../state/store-redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

type MapStateToPropsType = {
    posts: PostType[]
    value: string
}

type MapDispatchToPropsType = {
    addPost: () => void
    changeTextPost: (text: string) => void
}

export type MyPostsPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    posts: state.profilePage.posts,
    value: state.profilePage.value
});
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => ({
    addPost: () => {
        dispatch(addPostAC());
    },
    changeTextPost: (text: string) => {
        dispatch(changePostAC(text));
    }
});

// connect возможно типизировать излишне
export const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>
(mapStateToProps, mapDispatchToProps)(MyPosts);


// StoreContext
// export const MyPostsContainer = () => {
//     return (
//         <StoreContext.Consumer>
//             {store => {
//                 const state = store.getState();
//
//                 const addPost = () => {
//                     store.dispatch(addPostAC());
//                 };
//
//                 const changeTextPost = (text: string) => {
//                     store.dispatch(changePostAC(text));
//                 };
//
//                 return <MyPosts posts={state.profilePage.posts}
//                                 value={state.profilePage.value}
//                                 addPost={addPost}
//                                 changeTextPost={changeTextPost}/>;
//             }}
//         </StoreContext.Consumer>
//     );
// };