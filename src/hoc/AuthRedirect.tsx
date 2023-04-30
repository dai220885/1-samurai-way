import React from 'react';
import {Redirect} from 'react-router-dom';
import {AppStateType} from '../redux/redux-store';
import {connect} from 'react-redux';

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
})

export const withAuthRedirect = (Component: any) => {
    class RedirectComponent extends React.Component<any, any> {
        render() {
            if (!this.props.isAuth) return <Redirect to='/login'/>
            return <Component {...this.props}/>
        }
    }

    //коннектим контейнерную компоненту к стору, чтобы не передавать isAuth каждый раз в пропсах
    let ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedRedirectComponent
}