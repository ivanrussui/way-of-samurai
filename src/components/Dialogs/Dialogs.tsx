import React, {FC} from 'react';
import styles from './Dialogs.module.css';
import {Navigate, NavLink, useParams, useLocation} from 'react-router-dom';
import {PATH} from '../../App';

type DialogType = {
    id: string
    name: string
}

const Dialog: FC<DialogType> = ({id, name}) => {
    console.log(id);
    return (
        <div>
            <NavLink to={`${PATH.PAGE2}${id}`}
                     className={({isActive}) =>
                         isActive ? `LinkActive` : `Link`
                     }>{name}
            </NavLink>
        </div>
    );
};

type MessageType = {
    title: string
}
const Message: FC<MessageType> = ({title}) => {
    return <div className={styles.Message}>{title}</div>;
};

type DialogsType = {
    id: string,
    name: string
}

export const Dialogs: FC = () => {
    const params = useParams();

    // if (isNaN(Number(params.id))) {
    //     return <Navigate to={PATH.PAGE404}/>;
    // }

    const dialogs: DialogsType[] = [
        {id: '1', name: 'Ivan'},
        {id: '2', name: 'Anna'},
        {id: '3', name: 'Melissa'},
        {id: '4', name: 'Kristina'},
        {id: '5', name: 'Vladimir'},
        {id: '6', name: 'Alexandra'},
    ];

    const messages: MessageType[] = [
        {title: 'Hi!'},
        {title: 'My name is Ivan!'},
        {title: 'And you?'},
        {title: 'I am Fine'},
        {title: 'It s cool!'},
    ];

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
