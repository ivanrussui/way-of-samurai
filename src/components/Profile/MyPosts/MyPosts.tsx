import React, {ChangeEvent, createRef, FC} from 'react';
import styles from './MyPosts.module.css';
import {Post} from './Post/Post';
import {PostType} from '../../../types/types';

type PropsType = {
    posts: PostType[]
    value: string
    addPost: () => void
    changeTextarea: (value: string) => void
}

export const MyPosts: FC<PropsType> = ({posts, addPost, changeTextarea, value}) => {
    const text = createRef<HTMLTextAreaElement>();

    const onClickHandler = () => {
        if (text.current) {
            addPost();
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        changeTextarea(e.currentTarget.value);
    };

    return (
        <div>
            <h3 className={styles.Title}>My posts</h3>
            <textarea ref={text} value={value} onChange={onChangeHandler}/>
            <button className={styles.Btn} onClick={onClickHandler}>SEND</button>
            <div className={styles.MyPosts}>
                {posts.map(el => <Post key={el.title} title={el.title} likeCount={el.likeCount}/>)}
            </div>
        </div>
    );
};

