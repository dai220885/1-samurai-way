import React from 'react';
import {UserType} from '../../redux/users-reducer';
import styles from './Users.module.css'
import {v1} from 'uuid';

export type UsersPropsType = {
    users: UserType[]
    followUser: (userId: string) => void
    unfollowUser: (userId: string) => void
    setUsers: (users: UserType[]) => void
}
export const Users = (props: UsersPropsType) => {
    if (props.users.length === 3) {props.setUsers(
        [
            {
                id: v1(),
                photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiQSa00Huhj-j07rhDP24F3O0X0i05SQwI4A&usqp=CAU',
                followed: true,
                fullName: 'Alexandr2',
                status: 'i am a student',
                location: {city: 'Minsk', country: 'Belarus'}
            },
            {
                id: v1(),
                photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiQSa00Huhj-j07rhDP24F3O0X0i05SQwI4A&usqp=CAU',
                followed: false,
                fullName: 'Victor2',
                status: 'i like music',
                location: {city: 'Vitebsk', country: 'Belarus'}
            },
            {
                id: v1(),
                photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiQSa00Huhj-j07rhDP24F3O0X0i05SQwI4A&usqp=CAU',
                followed: true,
                fullName: 'Sergey2',
                status: 'good boy',
                location: {city: 'Moscow', country: 'Russia'}
            },
        ],
    )}




    //в зависимости от того, подписаны ли мы на пользователя, в коллбэк кнопки передается либо функция followUser, либо unFollowUser
    let buttonOnClickHandler = (followed: boolean, userId: string) => {
        followed ? props.unfollowUser(userId) : props.followUser(userId)
    }
    return (
        <div>
            {
                props.users.map(user =>
                    <div key={user.id}>
                        <span>
                            <div>
                                <img src={user.photoUrl} className={styles.userPhoto}/>
                            </div>
                            <div>
                                <button onClick={() => {
                                    buttonOnClickHandler(user.followed, user.id)
                                }}>
                                    {user.followed ? 'Unfollow' : 'Follow'} </button>
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>{`${user.fullName} - ${user.followed}`}</div><div>{user.status}</div>
                            </span>
                            <span>
                                <div>{user.location.country}</div>
                                <div>{user.location.city}</div>
                            </span>
                        </span>
                    </div>)
            }
        </div>
    );
};
