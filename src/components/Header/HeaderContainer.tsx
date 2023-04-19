import React from 'react';
import Header from './Header';
import {
    AuthReducerActionType,
    AuthUserDataType,
    setAuthUserDataAC,
    setAuthUserDataThunkCreator
} from '../../redux/auth-reducer';
import {AppStateType} from '../../redux/redux-store';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {authAPI} from '../../api/api';

class HeaderClassComponent extends React.Component <RootHeaderPropsType> {
    componentDidMount() {
        //axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
        this.props.setAuthUserData()
    }

    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

export type RootHeaderPropsType = MapStateToPropsType & MapDispatchToPropsType & OwnHeaderPropsType

type OwnHeaderPropsType = {}
type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType ={
    setAuthUserData: () => void,
}

let mapStateToProps = (state: AppStateType) => {
    return {
        id: state.auth.id,
        email: state.auth.email,
        login: state.auth.login,
        isAuth: state.auth.isAuth,
        //isFetching: state.auth.isFetching,
    }
}
//type MapDispatchToPropsType = ReturnType<typeof mapDispatchToProps>
let mapDispatchToProps = (dispatch: Dispatch<AuthReducerActionType>) => {
    return {
        setAuthUserData: (authUserData: AuthUserDataType) => {
            dispatch(setAuthUserDataAC(authUserData))
        },
    }
}

const HeaderContainer = connect<MapStateToPropsType, MapDispatchToPropsType, OwnHeaderPropsType, AppStateType>(mapStateToProps, {setAuthUserData:setAuthUserDataThunkCreator})(HeaderClassComponent);


export default HeaderContainer;