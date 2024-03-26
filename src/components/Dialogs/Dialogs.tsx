import React, {FC} from 'react';
import styles from './Dialogs.module.css';
import {useParams} from 'react-router-dom';
import {Dialog, DialogType} from './Dialog/Dialog';
import {Message, MessageType} from './Message/Message';

type PropsType = {
    messages: MessageType[]
    dialogs: DialogType[]
}

export const Dialogs: FC<PropsType> = ({messages, dialogs}) => {
    // const params = useParams();

    // if (isNaN(Number(params.id))) {
    //     return <Navigate to={PATH.PAGE404}/>;
    // }

    return (
        <div className={styles.Dialogs}>
            <div>
                {dialogs.map(el => <Dialog key={el.id} id={`/${el.id}`} name={el.name}/>)}
            </div>
            <div>
                {messages.map(el => <Message key={el.title} title={el.title}/>)}
            </div>
        </div>
    );
};
