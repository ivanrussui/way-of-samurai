import React, {FC} from 'react';
import styles from './Dialogs.module.css';
import {Navigate, NavLink, useParams} from 'react-router-dom';
import {PATH} from '../../App';

type DialogType = {
    id: string
    name: string
}

const Dialog: FC<DialogType> = ({id, name}) => {
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

export const Dialogs: FC = () => {
    const params = useParams();
    console.log(params);

    // пока уберем щас ошибка тогда если кликнуть изначально на /dialogs  потому что с id или без роут ведет на один
    // компонент
    // if (isNaN(Number(params.id))) {
    //     return <Navigate to={PATH.PAGE404}/>
    // }

    return (
        <div className={styles.Dialogs}>
            <div>
                <Dialog id={'/1'} name={'Ivan'}/>
                <Dialog id={'/2'} name={'Anna'}/>
                <Dialog id={'/3'} name={'Melissa'}/>
                <Dialog id={'/4'} name={'Kristina'}/>
                <Dialog id={'/5'} name={'Vladimir'}/>
                <Dialog id={'/6'} name={'Alexandra'}/>
            </div>
            <div>
                <Message title={'Hi!'}/>
                <Message title={'My name is Ivan'}/>
                <Message title={'And you'}/>
                <Message title={'I am Fine'}/>
                <Message title={'It s cool'}/>
            </div>
        </div>
    );
};
