import React, {ChangeEvent, createRef, FC} from 'react';
import styles from './MyPosts.module.css';
import {Post} from './Post/Post';
import {ActionsTypes, PostType} from '../../../types/types';
import {addPostAC, changePostAC} from '../../../state/profile-reducer';

type PropsType = {
    posts: PostType[]
    value: string
    dispatch: (action: ActionsTypes) => void
}

export const MyPosts: FC<PropsType> = ({posts, value, dispatch}) => {
    const text = createRef<HTMLTextAreaElement>();

    const onClickHandler = () => {
        if (text.current?.value !== '') {
            dispatch(addPostAC());
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(changePostAC(e.currentTarget.value));
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

