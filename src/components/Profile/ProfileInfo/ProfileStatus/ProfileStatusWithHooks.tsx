import React, {ChangeEvent, FC, FocusEvent, useEffect, useState} from 'react';

type ProfileStatusType = {
    status: string
    updateStatusTC: (status: string) => void
}

export const ProfileStatusWithHooks: FC<ProfileStatusType> = (props) => {
    const [status, setStatus] = useState<string>(props.status);
    const [editMode, setEditMode] = useState<boolean>(false);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const changeActiveMode = () => {
        // оба варианта рабочие
        // setEditMode(!editMode);
        setEditMode(prevState => !prevState);
    };

    const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        changeActiveMode();
        props.updateStatusTC(e.currentTarget.value);
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <div style={{paddingLeft: '1rem'}}>
            {editMode
                ? <input autoFocus onBlur={onBlurHandler} onChange={onChangeHandler}
                         value={status} type="text"/>
                : <span onDoubleClick={changeActiveMode}>{props.status || 'No Status'}</span>
            }
        </div>
    );
};
