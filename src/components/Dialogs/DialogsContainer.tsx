import React from 'react';
import {addMessageAC, changeMessageAC} from '../../state/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {StoreContext} from '../../state/store-context';

export const DialogsContainer = () => {
    return (
        <StoreContext.Consumer>
            {(store) => {
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
            }}
        </StoreContext.Consumer>
    );
};
