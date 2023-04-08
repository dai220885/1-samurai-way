import React from 'react';
import {UserType} from '../../redux/users-reducer';
import styles from './Users.module.css'

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
                    <span className={
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
                                <img src={user.photoUrl} alt="   photo   " className={styles.userPhoto}/>
                            </div>
                            <div>
                                <button onClick={() => {
                                    props.followOnClickHandler(user.followed, user.id)
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






