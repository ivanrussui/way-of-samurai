import {addMessage, DialogsType, MessageType} from '../../state/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {AppRootStateType} from '../../state/store-redux';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {ComponentType} from 'react';

type MapStateToPropsType = {
    dialogs: DialogsType[]
    messages: MessageType[]
}
type MapDispatchToPropsType = {
    addMessage: (text: string) => void
}
export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    };
};

// connect возможно типизировать излишне
// export const DialogsContainer = withAuthRedirect(connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>
// (mapStateToProps, {addMessage, changeMessage})(Dialogs));

export const DialogsContainer = compose<ComponentType>(
    withAuthRedirect,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>
    (mapStateToProps, {addMessage})
)
(Dialogs);

// StoreContext
// export const DialogsContainer = () => {
//     return (
//         <StoreContext.Consumer>
//             {(store) => {
//                 const state = store.getState();
//
//                 const addMessage = () => {
//                     store.dispatch(addMessageAC());
//                 };
//
//                 const changeMessageText = (text: string) => {
//                     store.dispatch(changeMessageAC(text));
//                 };
//                 return <Dialogs dialogs={state.dialogsPage.dialogs}
//                                 messages={state.dialogsPage.messages}
//                                 value={state.dialogsPage.value}
//                                 addMessage={addMessage}
//                                 changeMessageText={changeMessageText}
//                 />;
//             }}
//         </StoreContext.Consumer>
//     );
// };