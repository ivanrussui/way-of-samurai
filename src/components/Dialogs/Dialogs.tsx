import React, {ChangeEvent, FC, useRef} from 'react';
import styles from './Dialogs.module.css';
import {Dialog} from './Dialog/Dialog';
import {Message} from './Message/Message';
import {ActionsTypes, DialogsPageType} from '../../types/types';
import {addMessageAC, changeMessageAC} from '../../state/dialogs-reducer';

type PropsType = {
    dialogsPage: DialogsPageType
    value: string
    dispatch: (action: ActionsTypes) => void
}

export const Dialogs: FC<PropsType> = ({dialogsPage, value, dispatch}) => {
    // const params = useParams();
    const text = useRef<HTMLTextAreaElement | null>(null);

    // if (isNaN(Number(params.id))) {
    //     return <Navigate to={PATH.PAGE404}/>;
    // }

    const onClickHandler = () => {
        if (text.current?.value !== '') {
            dispatch(addMessageAC());
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(changeMessageAC(e.currentTarget.value));
    };

    return (
        <div className={styles.Dialogs}>
            <div>
                {dialogsPage.dialogs.map(el => <Dialog key={el.id} id={`/${el.id}`} name={el.name}/>)}
            </div>
            <div>
                {dialogsPage.messages.map(el => <Message key={el.id} title={el.title}/>)}
                <textarea ref={text} value={value} className={styles.Textarea} onChange={onChangeHandler}/>
                <button className={styles.Button} onClick={onClickHandler}>ADD</button>
            </div>
        </div>
    );
};
