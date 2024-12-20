import {connect} from 'react-redux';
import {AppRootStateType} from '../../state/store-redux';
import {
    followUnfollow,
    setPage,
    setTotalCount,
    setUsers,
    toggleIsFetching,
    toggleIsFetchingUser
} from '../../state/users-reducer';
import {Component} from 'react';
import {Users} from './Users';
import {Preloader} from '../Common/Preloader/Preloader';
import {followAPI, ItemDomainType, ItemResponseType, usersAPI} from '../../api/api';
import {toggleFollowUser} from '../../helpers/helpers';

type MapStateToPropsType = {
    items: ItemDomainType[]
    totalCount: number
    page: number
    count: number
    isFetching: boolean
}

type MapDispatchToPropsType = {
    followUnfollow: (useId: number, followed: boolean) => void
    setUsers: (users: ItemResponseType[]) => void
    setPage: (page: number) => void
    setTotalCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleIsFetchingUser: (useId: number, isFetchingFollow: boolean) => void
}

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

// 2м параметром типизируется состояние, но у меня нет тут состояния поэтому пока опустим
export class UsersContainer extends Component<UsersPropsType> { // class Component<P, S> {
    componentDidMount() {
        this.props.toggleIsFetching(true);

        usersAPI.getUsers(this.props.page, this.props.count)
            .then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
                this.props.setTotalCount(data.totalCount);
            });
    }

    setPageHandler = (page: number) => {
        this.props.toggleIsFetching(true);
        this.props.setPage(page);

        usersAPI.getUsers(page, this.props.count)
            .then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
            });
    };

    changeFollow = (userId: number, followed: boolean) => {
        this.props.toggleIsFetchingUser(userId, true);

        if (!followed) {
            toggleFollowUser({
                userId, followed: true,
                methodAPI: followAPI.followUser, followUnfollow: this.props.followUnfollow
            });
        } else {
            toggleFollowUser({
                userId, followed: false,
                methodAPI: followAPI.unfollowUser, followUnfollow: this.props.followUnfollow
            });
        }

        this.props.toggleIsFetchingUser(userId, false);
    };

    render() {
        return <>
            {this.props.isFetching
                ? <Preloader/>
                : <Users page={this.props.page} count={this.props.count}
                         items={this.props.items} totalCount={this.props.totalCount}
                         changeFollow={this.changeFollow} setPageHandler={this.setPageHandler}
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
    followUnfollow,
    setUsers,
    setPage,
    setTotalCount,
    toggleIsFetching,
    toggleIsFetchingUser,
})(UsersContainer);