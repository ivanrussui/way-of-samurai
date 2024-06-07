import React, {ChangeEvent, createRef, FC} from 'react';
import styles from './MyPosts.module.css';
import {Post} from './Post/Post';
import {PostType} from '../../../state/profile-reducer';
import {MyPostsPropsType} from './MyPostsContainer';
// import {MyPostsPropsType} from './MyPostsContainer';

// type PropsType = {
//     posts: PostType[]
//     value: string
//     addPost: () => void
//     changeTextPost: (text: string) => void
// }

export const MyPosts: FC<MyPostsPropsType> = ({posts, value, addPost, changeTextPost}) => {
    const text = createRef<HTMLTextAreaElement>();

    const onClickHandler = () => {
        if (text.current?.value !== '') {
            addPost();
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        changeTextPost(e.currentTarget.value);
    };

    return (
        <div>
            <h3 className={styles.Title}>My posts</h3>
            <textarea ref={text} value={value} onChange={onChangeHandler}/>
            <button className={styles.Btn} onClick={onClickHandler}>SEND</button>
            <div className={styles.MyPosts}>
                {posts.map(el => <Post key={el.id} title={el.title} likeCount={el.likeCount}/>)}
            </div>
        </div>
    );
};
