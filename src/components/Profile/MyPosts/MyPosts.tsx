import React, {FC} from 'react';
import styles from './MyPosts.module.css';
import {Post} from './Post/Post';
import {MyPostsPropsType} from './MyPostsContainer';
import {TextForm} from '../../Common/TextForm/TextForm';

export const MyPosts: FC<MyPostsPropsType> = ({posts, addPost}) => {
    return (
        <div>
            <h3 className={styles.Title}>My posts</h3>
            <TextForm onClick={addPost} buttonText={'SEND'}/>
            <div className={styles.MyPosts}>
                {posts.map(el => <Post key={el.id} title={el.title} likeCount={el.likeCount}/>)}
            </div>
        </div>
    );
};