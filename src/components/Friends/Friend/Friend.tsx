import {ChangeEvent, FC, useState} from 'react';
import avatar from '../../../assets/avatar-friends.jpg';
import styles from '../Friends.module.css';
import {ActionsTypes} from '../../../types/types';
import {changeFriendAC} from '../../../state/sidebar-reducer';

type PropsType = {
    name: string
    id: string
    dispatch: (action: ActionsTypes) => void
}

export const Friend: FC<PropsType> = ({name, id, dispatch}) => {
    const [editMode, setEditMode] = useState<boolean>(false);

    const changeEditMode = () => {
        setEditMode(!editMode);
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeFriendAC(id, e.currentTarget.value));
    };

    return (
        <div className={styles.Block}>
            <img src={avatar} alt="img" className={styles.Image}/>
            {editMode
                ? <input className={styles.Input} value={name} autoFocus
                         onBlur={changeEditMode} onChange={onChangeHandler}/>
                : <span className={styles.Name} onDoubleClick={changeEditMode}>{name}</span>
            }
        </div>
    );
};

