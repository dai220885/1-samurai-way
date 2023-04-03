import React from 'react';
import {connect} from 'react-redux';
import {Users} from './Users';
import {AppStateType} from '../../redux/redux-store';
import {followUserAC, setUsersAC, unFollowUserAC, UserPageType, UserType} from '../../redux/users-reducer';
import {Dispatch} from 'redux';
import {UsersClassComponent} from './UsersClassComponent';


let mapStateToProps = (state: AppStateType): UserPageType => {
    return {
        users: state.userPage.users
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        followUser: (userId: string) => dispatch(followUserAC(userId)),
        unfollowUser: (userId: string) => dispatch(unFollowUserAC(userId)),
        setUsers: (users: UserType[]) => dispatch(setUsersAC(users)),
    }
}

//const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users); //когда две пары круглых скобок, то значит, что после первого вызова функция что-то вернет, а вторыми скобками мы вызываем, то, что вернется после первого вызова)))
const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersClassComponent);

export default UsersContainer;