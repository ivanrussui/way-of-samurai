import {addPost, changePost, PostType} from '../../../state/profile-reducer';
import {StoreContext} from '../../../state/store-context';
import {MyPosts} from './MyPosts';
import {AppRootStateType} from '../../../state/store-redux';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {ComponentType} from 'react';

type MapStateToPropsType = {
    posts: PostType[]
    value: string
}

type MapDispatchToPropsType = {
    addPost: () => void
    changePost: (text: string) => void
}

export type MyPostsPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    posts: state.profilePage.posts,
    value: state.profilePage.value
});

// connect возможно типизировать излишне
// export const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>
// (mapStateToProps, {addPost, changePost})(MyPosts);

export const MyPostsContainer = compose<ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>
    (mapStateToProps, {addPost, changePost})
)
(MyPosts);

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