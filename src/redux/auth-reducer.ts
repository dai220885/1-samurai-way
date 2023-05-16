import {addMessageAC} from './dialogs-reducer';
import {authAPI, userAPI} from '../api/api';
import {toggleIsFollowingInProgress, unfollowUserSuccess, UsersReducerActionsType} from './users-reducer';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from './redux-store';

const SET_USER_DATA = 'SET-USER-DATA'

export type AuthReducerActionType = SetUserDataActionType

type AuthUserDataFromServerType = {
    id: number
    email: string
    login: string
}

export type AuthUserDataType = AuthUserDataFromServerType & {
    isAuth: boolean
}

let initialState : AuthUserDataType = {
    id: NaN,
    email: '',
    login: '',
    isAuth: false,
    //isFetching: false,
}


const authReducer = (state: AuthUserDataType = initialState, action: AuthReducerActionType) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload.authUserData, //данные (свойства) из action.payload.data перезапишут данные (свойства), которые были в state
                //isAuth: true,
            }
        }
        default: return state;
    }
}

export type SetUserDataActionType = ReturnType<typeof setAuthUserDataAC>
export const setAuthUserDataAC = (authUserData: AuthUserDataType) => {
    return {
        type: SET_USER_DATA,
        payload: {
            authUserData
        }
    }as const
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AuthReducerActionType>

export const setAuthUserDataTC =(): ThunkType => {
    return async (dispatch, getState) => {
        authAPI.me().then(data => {
            if (data.resultCode === 0) {
                //в setAuthUserDataAC передаем деструктуризированный оъект, который пришел с сервера (типа AuthUserDataFromServerType), и добавляем свойство "isAuth: true", после чего получили объект типа AuthUserDataType
                dispatch(setAuthUserDataAC({...data.data, isAuth: true}))
            }
        })
    }
}

export const loginTC =(email:string, password: string, rememberMe: boolean): ThunkType => {
    return async (dispatch) => {
        authAPI.login(email, password, rememberMe).then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserDataTC())
            }
        })
    }
}

export const logoutTC =(): ThunkType => {
    return async (dispatch) => {
        authAPI.logout().then(data => {
            if (data.resultCode === 0) {
                //когда вылогинились, нужно занулить данные о пользователе, для этого мы диспатчим initialState
                dispatch(setAuthUserDataAC(initialState))
            }
        })
    }
}



export default authReducer