import {ThunkAction} from 'redux-thunk';
import {AppStateType} from './redux-store';
import {stopSubmit} from 'redux-form';
import {setAuthUserDataTC} from './auth-reducer';

const SET_INITIALIZED_SUCCESSFULLY = 'SET-INITIALIZED-SUCCESSFULLY'


let initialState : AppInitializedStateType = {
    isInitialized: false,
}


const appReducer = (state: AppInitializedStateType = initialState, action: AppReducerActionsType) => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCESSFULLY: {
            return {
                ...state,
                isInitialized: action.payload.isInitialized,
            }
        }
        default: return state;
    }
}

export const setInitializedAC = (isInitialized: boolean) => {
    return {
        type: SET_INITIALIZED_SUCCESSFULLY,
        payload: {
            isInitialized
        }
    }as const
}

export const initializeAppTC =(): ThunkType => {
    return (dispatch, getState) => {
        //только когда зарезолвится промис, который вернет setAuthUserDataTC(), мы задиспатчим успешную инициализацию
        dispatch(setAuthUserDataTC()).then(()=>{
            dispatch(setInitializedAC(true))
        })



    }
}

//types:
export type AppReducerActionsType =
    | SetInitializedActionType
    | ReturnType<typeof stopSubmit>

type ThunkType = ThunkAction<void, AppStateType, unknown, AppReducerActionsType>
export type SetInitializedActionType = ReturnType<typeof setInitializedAC>

type AppInitializedStateType = {
    isInitialized: boolean
}



export default appReducer