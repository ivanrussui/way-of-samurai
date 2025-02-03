import {Component} from 'react';
import {Header} from './Header';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../state/store-redux';
import {setAuth, setAvatar, toggleIsFetchingLogin} from '../../state/auth-reducer';
import {authAPI, DataType, profileAPI} from '../../api/api';

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

        authAPI.getAuth()
            .then(data => {

                if (data.resultCode === 0) {
                    this.props.setAuth(data.data);

                    profileAPI.getProfile(data.data.id)
                        .then(data => {
                            this.props.setAvatar(data.photos.small);
                        });
                }
                this.props.toggleIsFetchingLogin(false);
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