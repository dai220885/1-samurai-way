import React from 'react';
import {UserType} from '../../redux/users-reducer';
import styles from './Users.module.css'
import {NavLink} from 'react-router-dom';
import {userAPI} from '../../api/api';

type UserFuncComponentPropsType = {
    pagesNumbers: number[],
    users: UserType[],
    currentPage: number,
    isFollowingInProgress: string[],
    pageNumberOnClickHandler: (currentPageNumber: number) => void,
    followOnClickHandler: (followed: boolean, userId: string) => void,
    toggleIsFollowing: (isFollowingInProgress: boolean, userId: string) => void,
}
//компонента просто отрисовывает юзеров, никаких запросов не делает, все необходимое получает через пропсы от UsersClassComponent
export const UsersFuncComponent = (props: UserFuncComponentPropsType) => {
    return (
        <div>
            {/*отрисовка номеров страничек с пользователями (пагинация)*/}
            <div>
                {props.pagesNumbers.map(number =>
                    <span
                        key={number}
                        className={
                            props.currentPage === number
                                ? styles.selectedPage
                                : ''}
                        onClick={() => props.pageNumberOnClickHandler(number)}>{number + ' '}
                    </span>
                )}
            </div>
            {/*отрисовка списка юзеров*/}
            {
                props.users.map(user =>
                    <div key={user.id}>
                        <span>
                            <div>
                                <NavLink to={'/profile/' + user.id}>
                                    <img src={user.photoUrl} alt="   photo   " className={styles.userPhoto}/>
                                </NavLink>
                            </div>
                            <div>
                                <button onClick={() => {
                                    if (!user.followed) {
                                        props.toggleIsFollowing(true, user.id)
                                        userAPI.followUser(user.id).then(data => {
                                            if (data.resultCode === 0) {
                                                props.followOnClickHandler(user.followed, user.id)
                                            }
                                            props.toggleIsFollowing(false, user.id)
                                        })
                                    } else {
                                        props.toggleIsFollowing(true, user.id)
                                        userAPI.unfollowUser(user.id).then(data => {
                                            if (data.resultCode === 0) {
                                                props.followOnClickHandler(user.followed, user.id)
                                            }
                                            props.toggleIsFollowing(false, user.id)
                                        })
                                    }
                                }} disabled={props.isFollowingInProgress.some(id => id === user.id)}>
                                    {user.followed ? 'Unfollow' : 'Follow'} </button>
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>{`${user.fullName} -`} {user.followed ? 'вы подписаны' : 'вы не подписаны'}</div>
                                <div>{user.status}</div>
                            </span>
                            <span>
                                <div>{user.location.country}</div>
                                <div>{user.location.city}</div>
                            </span>
                        </span>
                    </div>)
            }
        </div>
    )
}






