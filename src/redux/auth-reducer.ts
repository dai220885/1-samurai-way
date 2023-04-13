import {addMessageAC} from './dialogs-reducer';

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

export default authReducer