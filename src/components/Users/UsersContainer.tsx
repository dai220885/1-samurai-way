import React from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {getUsersThunkCreator, followUserThunkCreator, unfollowUserThunkCreator} from '../../redux/users-reducer';
import {compose} from 'redux';
import {UsersFuncComponent} from './UsersFuncComponent';
import {Preloader} from '../common/Preloader/Preloader';
import {
    getCurrentPage,
    getIsFetching,
    getIsFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from '../../redux/users-selectors';

class UsersClassComponent extends React.Component <RootUsersPropsType> {
    // constructor(props:RootUsersPropsType) {
    //     super(props);
    // } //если конструктор ничего не делает, кроме передачи пропсов конструктору родительского класса, то его можно не писать, т.к. все это и так происходит по умолчанию
    componentDidUpdate(prevProps: Readonly<RootUsersPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        console.log('UsersClassComponent.componentDidUpdate')
    }

    componentDidMount() {
        console.log('UsersClassComponent.componentDidMount')
        //диспатчим вызов санккриэйтора
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    pageNumberOnClickHandler = (currentPageNumber: number) => {
        //this.props.setCurrentPage(currentPageNumber);
        //диспатчим вызов санккриэйтора
        this.props.getUsers(currentPageNumber, this.props.pageSize)
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pagesNumbers = [];
        for (let i = 1; i <= pagesCount; i++) {
            pagesNumbers.push(i)
        }
        return (
            //все, что раньше отрисовывала UsersClassComponent, теперь вынесено в отдельную компоненту UsersFuncComponent
            <>
                {this.props.isFetching ?
                    <Preloader/>
                    : null}
                <UsersFuncComponent
                    pagesNumbers={pagesNumbers}
                    users={this.props.users}
                    currentPage={this.props.currentPage}
                    isFollowingInProgress={this.props.isFollowingInProgress}
                    pageNumberOnClickHandler={this.pageNumberOnClickHandler}
                    followOnClickHandler={this.props.follow}
                    unfollowOnClickHandler={this.props.unfollow}
                    //toggleIsFollowing={(IsFollowingInProgress, userId: string)=>{this.props.toggleIsFollowingInProgress(IsFollowingInProgress, userId)}}
                />
            </>
        )
    }
}

let _mapStateToProps = (state: AppStateType) => {
    return {
        users: state.userPage.users,
        pageSize: state.userPage.pageSize,
        totalUsersCount: state.userPage.totalUsersCount,
        currentPage: state.userPage.currentPage,
        isFetching: state.userPage.isFetching,
        isFollowingInProgress: state.userPage.isFollowingInProgress,
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowingInProgress: getIsFollowingInProgress(state),
    }
}

//когда две пары круглых скобок, то значит, что после первого вызова функция что-то вернет, а вторыми скобками мы вызываем, то, что вернется после первого вызова)))
//вместо mapDispatchToProps в connect передали объект со свойствами, идентичными названиям экшенкриэйтеров и санккриэйтеров
//для типизации коннекта, у него в угловых скобках указываем следующие типы:  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
const UsersContainer = compose<React.ComponentType>(
    //withAuthRedirect,
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnUsersContainerPropsType, AppStateType>(mapStateToProps, {
        getUsers: getUsersThunkCreator,
        follow: followUserThunkCreator,
        unfollow: unfollowUserThunkCreator,
    }),
)(UsersClassComponent);

export default UsersContainer;

//types:
//экспортируем только для того, чтобы неиспользуемая уже компонента users.tsx не падала с ошибкой
export type RootUsersPropsType = MapStateToPropsType & MapDispatchToPropsType & OwnUsersContainerPropsType
//типизация пропсов, которые могут прийти в компоненту не из коннекта, а непосредственно через атрибуты "тега", когда компонента используется: <Component param1={} param2={}/>
type OwnUsersContainerPropsType = {}
type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void,
    follow: (userId: string) => void,
    unfollow: (userId: string) => void,
}