import React from 'react';
import {connect} from 'react-redux';
import {Users} from './Users';
import {AppStateType} from '../../redux/redux-store';
import {
    followUserAC, setCurrentPageAC,
    setUsersAC, setUsersTotalCountAC,
    unFollowUserAC,
    UserPageType,
    UsersReducerActionsType,
    UserType
} from '../../redux/users-reducer';
import {Dispatch} from 'redux';
import {UsersClassComponent} from './UsersClassComponent';

//UsersPropsType тот же тип, что и "type RootUsersPropsType = MapStateToPropsType & MapDispatchToPropsType", просто на RootUsersPropsType иногда в строке "const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersClassComponent);" в UsersClassComponent выдает ошибку типизации
export type UsersPropsType = {
    users: UserType[]
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
    followUser: (userId: string) => void
    unfollowUser: (userId: string) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (currentPageNumber: number) => void
    setUsersTotalCount: (usersTotalCount: number) => void;
}

// export type MapStateToPropsType = {
//     users: UserType[],
//     pageSize: number,
//     totalUsersCount: number,
//     currentPage: number
// }
//то же, что и выше, только автоматически типизируем:
type MapStateToPropsType = ReturnType<typeof mapStateToProps>

let mapStateToProps = (state: AppStateType) => {
    return {
        users: state.userPage.users,
        pageSize: state.userPage.pageSize,
        totalUsersCount: state.userPage.totalUsersCount,
        currentPage: state.userPage.currentPage
    }
}
//титпизируем mapDispatchToProps
// export type MapDispatchToPropsType = {
//     followUser: (userId: string) => void;
//     unfollowUser: (userId: string) => void;
//     setUsers: (users: UserType[]) => void;
//     setCurrentPage: (currentPageNumber: number) => void;
//     setUsersTotalCount: (usersTotalCount: number) => void;
// }
//можно использовать автоматическую типизацию:
//с автоматической типизацией в строке "const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersClassComponent);" в UsersClassComponent выдает ошибку типизации (уже не выдает)))
type MapDispatchToPropsType = ReturnType<typeof mapDispatchToProps>

let mapDispatchToProps = (dispatch: Dispatch<UsersReducerActionsType>) => {
    return {
        //можно просто описать функцию, по названию которой она будет доступна в пропсах:
        //followUser(userId: string) {dispatch(followUserAC(userId))},
        //а можно указать название свойства, которому присвоить функцию:
        followUser: (userId: string) => {dispatch(followUserAC(userId))},
        unfollowUser: (userId: string) => dispatch(unFollowUserAC(userId)),
        setUsers: (users: UserType[]) => dispatch(setUsersAC(users)),
        setCurrentPage: (currentPageNumber: number) => dispatch(setCurrentPageAC(currentPageNumber)),
        setUsersTotalCount: (usersTotalCount: number) => dispatch(setUsersTotalCountAC(usersTotalCount)),
    }
}
export type RootUsersPropsType = MapStateToPropsType & MapDispatchToPropsType
//const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users); //когда две пары круглых скобок, то значит, что после первого вызова функция что-то вернет, а вторыми скобками мы вызываем, то, что вернется после первого вызова)))
const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersClassComponent);

export default UsersContainer;