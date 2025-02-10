import {Component} from 'react';
import {Header} from './Header';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../state/store-redux';
import {getAuthTC} from '../../state/auth-reducer';

type MapStateToPropsType = {
    login: string | undefined
    isAuth: boolean
    avatar: string
    isFetchingLogin: boolean
    isFetchingProfile: boolean
}

type MapDispatchToPropsType = {
    getAuthTC: () => void
}

type HeaderType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends Component<HeaderType, {}> {
    componentDidMount() {
        this.props.getAuthTC();
    }

    render() {
        return <Header {...this.props}/>;
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    login: state.auth.data?.login,
    isAuth: state.auth.isAuth,
    avatar: state.auth.avatar,
    isFetchingLogin: state.auth.isFetchingLogin,
    isFetchingProfile: state.profilePage.isFetchingProfile,
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>
(mapStateToProps, {getAuthTC})(HeaderContainer);