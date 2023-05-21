import {authAPI} from '../api/api';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from './redux-store';
import {stopSubmit} from 'redux-form';

const SET_USER_DATA = 'SET-USER-DATA'


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

export const setAuthUserDataAC = (authUserData: AuthUserDataType) => {
    return {
        type: SET_USER_DATA,
        payload: {
            authUserData
        }
    }as const
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AuthReducerActionType>

//добавили return перед authAPI.me(), теперь, когда будем диспатчить эту санку в app-reducer, из нее вернется промис и можно будет написать логику в методе then
export const setAuthUserDataTC =(): ThunkType => {
    return async (dispatch, getState) => {
        return authAPI.me().then(data => {
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
            } else {
                let errorMessage = data.messages.length? data.messages[0]: 'Some error... try again'
                //первым параметном в stopSubmit передаем название формы, которую стопаем (название задавали, когда оборачивали в reduxForm), второй параметр: вместо _error можно указывать поля из формы, которые нужно подсветить ошибкой и сам текст ошибки. _error - что-то типо глобальной ошибки формы, которая придет в нее через пропсы автоматом
                // stopSubmit из redux-form, используем, если resultCode !==0, т.е. логин или пароль введены неверно.
                dispatch (stopSubmit('login', {_error: errorMessage}))
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



//types:
export type AuthReducerActionType =
    | SetUserDataActionType
    | ReturnType<typeof stopSubmit>

export type SetUserDataActionType = ReturnType<typeof setAuthUserDataAC>

type AuthUserDataFromServerType = {
    id: number
    email: string
    login: string
}

export type AuthUserDataType = AuthUserDataFromServerType & {
    isAuth: boolean
}


export default authReducer