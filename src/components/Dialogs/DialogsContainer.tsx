import React, {FC} from 'react';
import {addMessageAC, changeMessageAC} from '../../state/dialogs-reducer';
import {Store} from 'redux';
import {AppRootStateType} from '../../state/store-redux';
import {Dialogs} from './Dialogs';

type PropsType = {
    store: Store<AppRootStateType>
}

export const DialogsContainer: FC<PropsType> = ({store}) => {
    const state = store.getState();

    const addMessage = () => {
        store.dispatch(addMessageAC());
    };

    const changeMessageText = (text: string) => {
        store.dispatch(changeMessageAC(text));
    };

    return <Dialogs dialogsPage={state.dialogsPage}
                    value={state.dialogsPage.value}
                    addMessage={addMessage}
                    changeMessageText={changeMessageText}
    />;
};
