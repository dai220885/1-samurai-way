import React from 'react';
import {connect} from 'react-redux';
import {loginTC} from '../../redux/auth-reducer';
import {AppStateType} from '../../redux/redux-store';
import Login, {OwnLoginPropsType} from './Login';
import {compose} from 'redux';

let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
})

const _LoginContainer = connect <MapStateToPropsType, MapDispatchToPropsType, OwnLoginPropsType, AppStateType> (mapStateToProps, {login: loginTC})(Login)

const LoginContainer = compose  <React.ComponentType> (
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnLoginPropsType, AppStateType>
    (mapStateToProps, {login: loginTC}),
)(Login)


//types:
export type MapStateToPropsType = ReturnType<typeof mapStateToProps>
export type MapDispatchToPropsType = {
    login: (email:string, password: string, rememberMe: boolean) => void
}

export default LoginContainer;