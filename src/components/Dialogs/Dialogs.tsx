import React, {ChangeEvent, FC, useRef} from 'react';
import styles from './Dialogs.module.css';
import {Dialog} from './Dialog/Dialog';
import {Message} from './Message/Message';
import {DialogsPropsType} from './DialogsContainer';


export const Dialogs: FC<DialogsPropsType> = ({dialogs, messages, value, addMessage, changeMessage, isAuth}) => {
    const text = useRef<HTMLTextAreaElement | null>(null);

    const onClickHandler = () => {
        if (text.current?.value !== '') {
            addMessage();
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        changeMessage(e.currentTarget.value);
    };

    return (
        <div className={styles.Dialogs}>
            <div>
                {dialogs.map(el => <Dialog key={el.id} id={`/${el.id}`} name={el.name}/>)}
            </div>
            <div>
                {messages.map(el => <Message key={el.id} title={el.title}/>)}
                <textarea ref={text} value={value} className={styles.Textarea} onChange={onChangeHandler}/>
                <button className={styles.Button} onClick={onClickHandler}>ADD</button>
            </div>
        </div>
    );
};
