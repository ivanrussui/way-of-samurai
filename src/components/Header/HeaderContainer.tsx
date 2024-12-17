import {Component} from 'react';
import {Header} from './Header';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../state/store-redux';
import {setAuth, setAvatar, toggleIsFetchingLogin} from '../../state/auth-reducer';
import axios from 'axios';
import {ProfileInfoResponseType} from '../Profile/ProfileInfo/ProfileInfoContainer';

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

type MapStateToPropsType = {
    login: string | undefined
    isAuth: boolean
    avatar: string
    isFetchingLogin: boolean
}

type MapDispatchToPropsType = {
    setAuth: (data: DataType) => void
    setAvatar: (avatar: string) => void
    toggleIsFetchingLogin: (isFetchingLogin: boolean) => void
}

type HeaderType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends Component<HeaderType, any> {
    componentDidMount() {
        this.props.toggleIsFetchingLogin(true);
        axios.get<AuthResponseType>(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                this.props.toggleIsFetchingLogin(false);

                if (response.data.resultCode === 0) {
                    this.props.setAuth(response.data.data);

                    axios.get<ProfileInfoResponseType>(`https://social-network.samuraijs.com/api/1.0/profile/${response.data.data.id}`)
                        .then(response => {
                            this.props.setAvatar(response.data.photos.small);
                        });
                }
            });
    }

    render() {
        return <Header {...this.props}/>;
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    login: state.auth.data?.login,
    isAuth: state.auth.isAuth,
    avatar: state.auth.avatar,
    isFetchingLogin: state.auth.isFetchingLogin
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>
(mapStateToProps, {setAuth, setAvatar, toggleIsFetchingLogin})(HeaderContainer);