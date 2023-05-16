import React from 'react';

import {connect} from 'react-redux';
import {loginTC} from '../../redux/auth-reducer';
import {AppStateType} from '../../redux/redux-store';

import Login, {OwnLoginPropsType} from './Login';
import {compose} from 'redux';
import {addMessageAC, removeMessageAC} from '../../redux/dialogs-reducer';
import {withAuthRedirect} from '../../hoc/AuthRedirect';
import Dialogs from '../Dialogs/Dialogs';


export type MapStateToPropsType = ReturnType<typeof mapStateToProps>
let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
})

export type MapDispatchToPropsType = {
    login: (email:string, password: string, rememberMe: boolean) => void
}


const _LoginContainer = connect <MapStateToPropsType, MapDispatchToPropsType, OwnLoginPropsType, AppStateType> (mapStateToProps, {login: loginTC})(Login)


const LoginContainer = compose  <React.ComponentType> (
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnLoginPropsType, AppStateType>
    (mapStateToProps, {login: loginTC}
    ),
)(Login)
export default LoginContainer;