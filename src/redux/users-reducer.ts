import {userAPI} from '../api/api';
import {Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from './redux-store';

const FOLLOW_USER = 'FOLLOW-USER';
const UNFOLLOW_USER = 'UNFOLLOW-USER';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET-USERS-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'TOGGLE-IS-FOLLOWING-IN-PROGRESS';

export type UserType = {
    id: string
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: {
        city: string
        country: string
    }
}
export type UserPageType = {
    users: UserType[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
    isFetching: boolean
    isFollowingInProgress: string[]
}

let initialState: UserPageType = {
    users: [
        //     {
        //         id: v1(),
        //         photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiQSa00Huhj-j07rhDP24F3O0X0i05SQwI4A&usqp=CAU',
        //         followed: true,
        //         fullName: 'Alexandr',
        //         status: 'i am a student',
        //         location: {city: 'Minsk', country: 'Belarus'}
        //     },
    ],
    pageSize: 15,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowingInProgress: [],
} as UserPageType

const usersReducer = (state: UserPageType = initialState, action: UsersReducerActionsType): UserPageType => {
    switch (action.type) {
        case FOLLOW_USER: {
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.userId ? {...user, followed: true} : user)
            }
        }
        case UNFOLLOW_USER: {
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.userId ? {...user, followed: false} : user)
            }
        }
        case SET_USERS: {
            return {...state, users: action.payload.users} //так полностью заменяем существующих юзеров
            //return {...state, users: [...state.users, ...action.payload.users]} //так добавляем новых юзеров к существующим
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.payload.currentPageNumber}
        }
        case SET_USERS_TOTAL_COUNT: {
            return {...state, totalUsersCount: action.payload.usersTotalCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.payload.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_IN_PROGRESS: {
            return {...state,
                isFollowingInProgress: action.payload.isFetching?
                    [...state.isFollowingInProgress, action.payload.userId]
                    :state.isFollowingInProgress.filter(id => id!== action.payload.userId)}
        }
        default:
            return state;
    }
}
export type UsersReducerActionsType =
    FollowUserActionType
    | UnfollowUserActionType
    | SetUsersActionType
    | SetCurrentPageActionType
    | SetUsersTotalCountActionType
    |ToggleIsFetchingActionType
    |ToggleIsFollowingInProgressActionType
//автоматически типизируем ActionCreator-ы, но в ActionCreator-е обязательно добавлять в конце 'as const', чтобы свойство type воспринималось не как любая строка, а как константа:
export type FollowUserActionType = ReturnType<typeof followUserSuccess>
export type UnfollowUserActionType = ReturnType<typeof unfollowUserSuccess>
export type SetUsersActionType = ReturnType<typeof setUsers>
export type SetCurrentPageActionType = ReturnType<typeof setCurrentPage>
export type SetUsersTotalCountActionType = ReturnType<typeof setUsersTotalCount>
export type ToggleIsFetchingActionType = ReturnType<typeof toggleIsFetching>
export type ToggleIsFollowingInProgressActionType = ReturnType<typeof toggleIsFollowingInProgress>

//функции (ActionCreator-ы), которые будут создавать объекты action (чтобы не запутаться и не ошибиться при создании непосредственно в компоненте
export const followUserSuccess = (userId: string) => ({
        type: FOLLOW_USER,
        payload: {
            userId
        }
    } as const)
export const unfollowUserSuccess = (userId: string) => ({
        type: UNFOLLOW_USER,
        payload: {
            userId
        }
    } as const)
export const setUsers = (users: UserType[]) => ({
        type: SET_USERS,
        payload: {
            users
        }
    } as const)
export const setCurrentPage = (currentPageNumber: number) => ({
        type: SET_CURRENT_PAGE,
        payload: {
            currentPageNumber
        }
    } as const)
export const setUsersTotalCount = (usersTotalCount: number) => ({
        type: SET_USERS_TOTAL_COUNT,
        payload: {
            usersTotalCount
        }
    } as const)
export const toggleIsFetching = (isFetching: boolean) => ({
        type: TOGGLE_IS_FETCHING,
        payload: {
            isFetching
        }
    } as const)
export const toggleIsFollowingInProgress = (isFetching: boolean, userId: string) => ({
        type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
        payload: {
            isFetching,
            userId
        }
    } as const)

//типизация санки
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, UsersReducerActionsType>

//export type GetUsersThunkCreatorType = ReturnType<typeof getUsersThunkCreator>
//можно было просто назвать санкКриэйтор "getUsers", чтобы в коннект потом передать короткое название
export const getUsersThunkCreator =(currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(setCurrentPage(currentPage))
        dispatch(toggleIsFetching(true))
        userAPI.getUsers(currentPage, pageSize).then(data => {
            //debugger
            //в newUsers положили массив новых пользователей, которых получили, промапив массив response.data.items и преобразовав в тип UserType (el в мапе ругался на типизацию (Parameter 'el' implicitly has an 'any' type), пришлось указать его тип). затем полученный массив newUsers передали в колбэк из пропсов (props.setUsers())
            //можно было просто изменить UserType под тот формат данных о пользователе, который приходит с сервера
            const photoAvatarUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXTBU5APFtvEEsvOwobgk6YEjQUVuQjZTbGFKRjDNQ1iQwK0mTbpHoUZFPAgEFvlaf8gY&usqp=CAU'
            let newUsers: UserType[] = data.items.map((el: { id: any; photos: { small: string, large: string }; followed: any; name: any; status: any; }): UserType =>
                ({
                    id: el.id,
                    photoUrl: el.photos.small ? el.photos.small : photoAvatarUrl,
                    followed: el.followed,
                    fullName: el.name,
                    status: el.status, location: {
                        city: '',
                        country: ''
                    }
                }))
            //console.log(newUsers)
            dispatch(toggleIsFetching(false));
            const usersTotalCount = data.totalCount;
            dispatch(setUsers(newUsers));
            dispatch(setUsersTotalCount(usersTotalCount));

        })
    }
}

export const followUserThunkCreator =(userId: string ): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(toggleIsFollowingInProgress(true, userId))
        userAPI.followUser(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(followUserSuccess(userId))
            }
            dispatch(toggleIsFollowingInProgress(false, userId))
        })
    }
}

export const unfollowUserThunkCreator =(userId: string ): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(toggleIsFollowingInProgress(true, userId))
        userAPI.unfollowUser(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(unfollowUserSuccess(userId))
            }
            dispatch(toggleIsFollowingInProgress(false, userId))
        })
    }
}
export default usersReducer;
