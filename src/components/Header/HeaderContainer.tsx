import {Component} from 'react';
import {Header} from './Header';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../state/store-redux';
import {setAuth} from '../../state/auth-reducer';
import axios from 'axios';

export type DataType = {
    id: number
    login: string
    email: string
}

export type AuthResponseType = {
    data: DataType
    messages: []
    fieldsErrors: []
    resultCode: number
}

type MapDispatchToPropsType = {
    setAuth: (data: DataType) => void
}

type HeaderType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends Component<HeaderType, any> {
    componentDidMount() {
        // this.props.toggleIsFetching(true);
        axios.get<AuthResponseType>(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    // debugger
                    this.props.setAuth(response.data.data)
                }
                // this.props.setProfile(response.data);
                // this.props.toggleIsFetching(false);
            });
    }

    render() {
        return <Header {...this.props}/>;
    }
}

type MapStateToPropsType = {
    login: string | undefined,
    isAuth: boolean
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    login: state.auth.data?.login,
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {setAuth})(HeaderContainer);