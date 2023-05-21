import React from 'react';
import Header from './Header';
import {
    AuthReducerActionType,
    AuthUserDataType, logoutTC,
    setAuthUserDataAC,
} from '../../redux/auth-reducer';
import {AppStateType} from '../../redux/redux-store';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

class HeaderClassComponent extends React.Component <RootHeaderPropsType> {
    render() {
        return (
            <Header {...this.props}/>
        )
    }
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

const HeaderContainer = connect<MapStateToPropsType, MapDispatchToPropsType, OwnHeaderPropsType, AppStateType>(mapStateToProps, {logout: logoutTC})(HeaderClassComponent);

//types:
export type RootHeaderPropsType = MapStateToPropsType & MapDispatchToPropsType & OwnHeaderPropsType
type OwnHeaderPropsType = {}
type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType ={
    //setAuthUserData: () => void,
    logout: () => void,
}

export default HeaderContainer;