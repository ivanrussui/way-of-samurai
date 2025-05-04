import React, {FC} from 'react';
import styles from './Dialogs.module.css';
import {Dialog} from './Dialog/Dialog';
import {Message} from './Message/Message';
import {DialogsPropsType} from './DialogsContainer';
import {TextForm} from '../Common/TextForm/TextForm';


export const Dialogs: FC<DialogsPropsType> = ({dialogs, messages, addMessage}) => {
    return (
        <div className={styles.Dialogs}>
            <div>
                {dialogs.map(el => <Dialog key={el.id} id={`/${el.id}`} name={el.name}/>)}
            </div>
            <div>
                {messages.map(el => <Message key={el.id} title={el.title}/>)}
                <TextForm onClick={addMessage} buttonText={'ADD'}/>
            </div>
        </div>
    );
};
