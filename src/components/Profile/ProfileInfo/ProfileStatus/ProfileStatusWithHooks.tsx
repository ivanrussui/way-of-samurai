import React, {ChangeEvent, FocusEvent, useEffect, useState} from 'react';

type ProfileStatusType<T> = {
    status: string
    updateStatusTC: (status: string) => Promise<T>
}

export const ProfileStatusWithHooks = <T, >(props: ProfileStatusType<T>) => {
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
        props.updateStatusTC(e.currentTarget.value)
            .then(() => { // Если обновление успешно, локальный статус обновится через useEffect
            }).catch(() => { // Если ошибка — сбрасываем локальный статус к props.status
            setStatus(props.status);
        });
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <div style={{paddingLeft: '1rem'}}>
            <div>
                <b>Status: </b>
                {editMode
                    ? <input autoFocus onBlur={onBlurHandler} onChange={onChangeHandler}
                             value={status} type="text"/>
                    : <span onDoubleClick={changeActiveMode}>{props.status || 'No Status'}</span>
                }
            </div>
        </div>
    );
};
