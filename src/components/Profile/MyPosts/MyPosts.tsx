import React, {createRef, FC} from 'react';
import styles from './MyPosts.module.css';
import {Post} from './Post/Post';
import {PostType} from '../../../types/types';

type PropsType = {
    posts: PostType[]
    addPost: (title: string) => void
}

export const MyPosts: FC<PropsType> = ({posts, addPost}) => {
    const text = createRef<HTMLTextAreaElement>();

    const onClickHandler = () => {
        if (text.current) {
            addPost(text.current.value);
        }
    };

    return (
        <div>
            <h3 className={styles.Title}>My posts</h3>
            <textarea ref={text}/>
            <button className={styles.Btn} onClick={onClickHandler}>SEND</button>
            <div className={styles.MyPosts}>
                {posts.map(el => <Post key={el.title} title={el.title} likeCount={el.likeCount}/>)}
            </div>
        </div>
    );
};

