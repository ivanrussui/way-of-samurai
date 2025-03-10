import React, {ChangeEvent, Component, FocusEvent} from 'react';

type ProfileStatusType = {
    status: string
    updateStatusTC: (status: string) => void
}

type StateType = {
    editMode: boolean
}

type StateWithStatusType = {
    editMode: boolean
    status: string
}

// по сути вариант Димыча с моим совмещенный
export class ProfileStatus extends Component<ProfileStatusType, StateWithStatusType> {
    state: StateWithStatusType = {
        editMode: false,
        status: this.props.status
    };

    componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<StateWithStatusType>, snapshot?: null) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    }

    changeActiveMode = () => {
        this.setState((prevState: StateWithStatusType) => ({
            editMode: !prevState.editMode
        }));
    };

    onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        this.changeActiveMode();
        this.props.updateStatusTC(e.currentTarget.value);
    };

    onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        });
    };

    render() {
        return (
            <div>
                {this.state.editMode
                    ? <input autoFocus onBlur={this.onBlurHandler} onChange={this.onChangeHandler}
                             value={this.state.status} type="text"/>
                    : <span onDoubleClick={this.changeActiveMode}>{this.props.status || 'No Status'}</span>
                }
            </div>
        );
    }
}

// вариант Димыча, он добавил в локальный стейт статус
// export class ProfileStatus extends Component<ProfileStatusType, StateWithStatusType> {
//     state: StateWithStatusType = {
//         editMode: false,
//         status: this.props.status
//     };
//
//     componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<StateWithStatusType>, snapshot?: null) {
//         if (prevProps.status !== this.props.status) {
//             this.setState({
//                 status: this.props.status
//             })
//         }
//     }
//
//     activateEditMode = () => {
//         this.setState({
//             editMode: true
//         });
//     };
//     deactivateEditMode = () => {
//         this.setState({
//             editMode: false
//         });
//         this.props.updateStatusTC(this.state.status);
//     };
//
//     onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//         this.setState({
//             status: e.currentTarget.value
//         });
//     };
//
//     render() {
//         return (
//             <div>
//                 {this.state.editMode
//                     ? <input autoFocus onBlur={this.deactivateEditMode} value={this.state.status} type="text"
//                              onChange={this.onChangeHandler}/>
//                     : <span onDoubleClick={this.activateEditMode}>{this.props.status || 'No Status'}</span>
//                 }
//             </div>
//         );
//     }
// }


// так написал я изначально. нет локального статуса
// export class ProfileStatus extends Component<ProfileStatusType, StateType> {
//     state: StateType = {
//         editMode: false
//     };
//
//     changeActiveMode = () => {
//         this.setState((prevState: StateType) => ({
//             editMode: !prevState.editMode
//         }));
//     };
//
//     onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
//         this.changeActiveMode();
//         this.props.updateStatusTC(e.currentTarget.value);
//     };
//
//     render() {
//         return (
//             <div>
//                 {this.state.editMode
//                     ? <input autoFocus onBlur={this.onBlurHandler} defaultValue={this.props.status} type="text"/>
//                     : <span onDoubleClick={this.changeActiveMode}>{this.props.status || 'No Status'}</span>
//                 }
//             </div>
//         );
//     }
// }
