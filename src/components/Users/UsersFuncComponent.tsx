import React from 'react';
import {UserType} from '../../redux/users-reducer';
import styles from './Users.module.css'
import {NavLink} from 'react-router-dom';
import axios from 'axios';

type UserFuncComponentPropsType = {
    pagesNumbers: number[],
    users: UserType[],
    currentPage: number,
    pageNumberOnClickHandler: (currentPageNumber: number) => void,
    followOnClickHandler: (followed: boolean, userId: string) => void,
}
//компонента просто отрисовывает юзеров, никаких запросов не делает, все необходимое получает через пропсы от UsersClassComponent
export const UsersFuncComponent = (props: UserFuncComponentPropsType) => {
    return (
        <div>
            {/*отрисовка номеров страничек с пользователями (пагинация)*/}
            <div>
                {props.pagesNumbers.map(number =>
                    <span key = {number} className={
                        props.currentPage === number
                            ? styles.selectedPage
                            : ''} onClick={()=>props.pageNumberOnClickHandler(number)}>{number+' '}
                        </span>
                )}
            </div>
            {/*отрисовка списка юзеров*/}
            {
                props.users.map(user =>
                    <div key={user.id}>
                        <span>
                            <div>
                                <NavLink to ={'/profile/'+ user.id}>
                                    <img src={user.photoUrl} alt="   photo   " className={styles.userPhoto}/>
                                </NavLink>
                            </div>
                            <div>
                                <button onClick={() => {
                                    if(!user.followed) {
                                        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {}, {
                                            withCredentials: true,
                                            baseURL: 'https://social-network.samuraijs.com/api/1.0/',
                                            headers: {
                                                "API-KEY": "3128443d-f108-4e76-956c-6d97ad90fd1e"
                                            }
                                        })
                                            .then(response => {
                                                //debugger
                                                if (response.data.resultCode === 0) {
                                                    props.followOnClickHandler(user.followed, user.id)
                                                }
                                            })
                                    }
                                    else {
                                        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {
                                            withCredentials: true,
                                            baseURL: 'https://social-network.samuraijs.com/api/1.0/',
                                            headers: {
                                                "API-KEY": "3128443d-f108-4e76-956c-6d97ad90fd1e"
                                            }
                                        })
                                            .then(response => {
                                                //debugger
                                                if (response.data.resultCode === 0) {
                                                    props.followOnClickHandler(user.followed, user.id)
                                                }
                                            })
                                    }

                                }}>
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






