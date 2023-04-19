import {addMessageAC} from './dialogs-reducer';
import {authAPI, userAPI} from '../api/api';
import {toggleIsFollowingInProgress, unfollowUserSuccess, UsersReducerActionsType} from './users-reducer';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from './redux-store';

const SET_USER_DATA = 'SET-USER-DATA'

export type AuthReducerActionType = SetUserDataActionType

export type AuthUserDataType = {
    id: number
    email: string
    login: string
    isAuth: boolean
    //isFetching: boolean
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
                isAuth: true,
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

export const setAuthUserDataThunkCreator =(): ThunkType => {
    return async (dispatch, getState) => {
        authAPI.login().then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserDataAC(data.data))
            }
        })
    }
}






export default authReducer