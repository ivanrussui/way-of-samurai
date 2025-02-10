import {connect} from 'react-redux';
import {AppRootStateType} from '../../state/store-redux';
import {followUnfollowTC, getUsersTC, setPageTC} from '../../state/users-reducer';
import {Component} from 'react';
import {Users} from './Users';
import {Preloader} from '../Common/Preloader/Preloader';
import {ItemDomainType} from '../../api/api';

type MapStateToPropsType = {
    items: ItemDomainType[]
    totalCount: number
    page: number
    count: number
    isFetching: boolean
    followingInProgress: number[]
}

type MapDispatchToPropsType = {
    getUsersTC: (page: number, count: number) => void
    setPageTC: (page: number, count: number) => void
    followUnfollowTC: (userId: number, followed: boolean) => void
}

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

// 2м параметром типизируется состояние, но у меня нет тут состояния поэтому пока опустим
export class UsersContainer extends Component<UsersPropsType, {}> { // class Component<P, S> {
    componentDidMount() {
        this.props.getUsersTC(this.props.page, this.props.count);
    }

    setPageHandler = (page: number) => {
        this.props.setPageTC(page, this.props.count);
    };

    changeFollow = (userId: number, followed: boolean) => {
        this.props.followUnfollowTC(userId, followed);
    };

    render() {
        return <>
            {this.props.isFetching
                ? <Preloader/>
                : <Users page={this.props.page} count={this.props.count}
                         items={this.props.items} totalCount={this.props.totalCount}
                         changeFollow={this.changeFollow} setPageHandler={this.setPageHandler}
                         followingInProgress={this.props.followingInProgress} // 'TOGGLE-FOLLOWING-IN-PROGRESS'
                />
            }
        </>;
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    items: state.usersPage.users.items,
    totalCount: state.usersPage.users.totalCount,
    page: state.usersPage.page,
    count: state.usersPage.count,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress
});

// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => ({
//     followUnfollow: (useId: number, followed: boolean) => {
//         dispatch(followUnfollowAC(useId, followed));
//     },
//     setUsers: (users: ItemType[]) => {
//         dispatch(setUsersAC(users));
//     },
//     setPage: (page: number) => {
//         dispatch(setPageAC(page));
//     },
//     setTotalCount: (totalCount: number) => {
//         dispatch(setTotalCountAC(totalCount));
//     },
//     toggleIsFetching: (isFetching: boolean) => {
//         dispatch(toggleIsFetchingAC(isFetching));
//     },
// });

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, {
    getUsersTC,
    setPageTC,
    followUnfollowTC
})(UsersContainer);