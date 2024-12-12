import {
    addMessage,
    changeMessage,
    DialogsType,
    MessageType
} from '../../state/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {StoreContext} from '../../state/store-context';
import {AppRootStateType} from '../../state/store-redux';
import {connect} from 'react-redux';

type MapStateToPropsType = {
    dialogs: DialogsType[]
    messages: MessageType[]
    value: string
}
type MapDispatchToPropsType = {
    addMessage: () => void
    changeMessage: (text: string) => void
}
export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        value: state.dialogsPage.value
    };
};

// connect возможно типизировать излишне
export const DialogsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>
(mapStateToProps, {addMessage, changeMessage})(Dialogs);


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