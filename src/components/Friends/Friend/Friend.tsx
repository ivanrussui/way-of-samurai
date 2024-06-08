import {ChangeEvent, FC, useState} from 'react';
import avatar from '../../../assets/avatar-friends.jpg';
import styles from '../Friends.module.css';

type PropsType = {
    id: string
    name: string
    changeFriendName: (id: string, name: string) => void
}

export const Friend: FC<PropsType> = ({name, id, changeFriendName}) => {
    const [editMode, setEditMode] = useState<boolean>(false);

    const changeEditMode = () => {
        setEditMode(!editMode);
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeFriendName(id, e.currentTarget.value);
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

