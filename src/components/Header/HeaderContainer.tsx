import React from 'react';
import Header from './Header';
import {AuthReducerActionType, AuthUserDataType, setAuthUserDataAC} from '../../redux/auth-reducer';
import {AppStateType} from '../../redux/redux-store';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {authAPI} from '../../api/api';

class HeaderClassComponent extends React.Component <RootHeaderPropsType> {
    componentDidMount() {
        //axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})

        authAPI.login().then(data => {
                if (data.resultCode === 0) {
                    this.props.setAuthUserData(data.data)
                }
            })
    }

    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

export type RootHeaderPropsType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = ReturnType<typeof mapStateToProps>
let mapStateToProps = (state: AppStateType) => {
    return {
        id: state.auth.id,
        email: state.auth.email,
        login: state.auth.login,
        isAuth: state.auth.isAuth,
        //isFetching: state.auth.isFetching,
    }
}

type MapDispatchToPropsType = ReturnType<typeof mapDispatchToProps>
let mapDispatchToProps = (dispatch: Dispatch<AuthReducerActionType>) => {
    return {
        setAuthUserData: (authUserData: AuthUserDataType) => {
            dispatch(setAuthUserDataAC(authUserData))
        },
    }
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderClassComponent);


export default HeaderContainer;