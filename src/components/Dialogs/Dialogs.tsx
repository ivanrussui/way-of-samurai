import React, {FC, useRef} from 'react';
import styles from './Dialogs.module.css';
import {useParams} from 'react-router-dom';
import {Dialog} from './Dialog/Dialog';
import {Message} from './Message/Message';
import {DialogsPageType} from '../../types/types';

type PropsType = {
    dialogsPage: DialogsPageType
}

export const Dialogs: FC<PropsType> = ({dialogsPage}) => {
    // const params = useParams();
    const text = useRef<HTMLTextAreaElement | null>(null);

    // if (isNaN(Number(params.id))) {
    //     return <Navigate to={PATH.PAGE404}/>;
    // }

    const onClickHandler = () => {
        if (text.current) {
            alert(text.current.value);
        }
    };

    return (
        <div className={styles.Dialogs}>
            <div>
                {dialogsPage.dialogs.map(el => <Dialog key={el.id} id={`/${el.id}`} name={el.name}/>)}
            </div>
            <div>
                {dialogsPage.messages.map(el => <Message key={el.title} title={el.title}/>)}
                <textarea ref={text} className={styles.Textarea}/>
                <button className={styles.Button} onClick={onClickHandler}>ADD</button>
            </div>
        </div>
    );
};
