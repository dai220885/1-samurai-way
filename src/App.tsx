//import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Navbar from './components/Navbar/Navbar';
import {Route, withRouter} from 'react-router-dom';
//import { Routes, Route, Navigate } from 'react-router-dom'
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginContainer from './components/Login/LoginContainer';
import {connect} from 'react-redux';
import {AppStateType} from './redux/redux-store';
import {compose} from 'redux';
import {initializeAppTC} from './redux/app-reducer';
import {Preloader} from './components/common/Preloader/Preloader';

class App extends React.Component <RootAppPropsType>{

    componentDidMount() {
        this.props.initializeApp()
    }
    render() {
        //const state = props.state;
        if (!this.props.isInitialized) {
           return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route
                        path="/dialogs"
                        render={() => <DialogsContainer/>}
                    />
                    <Route
                        path="/profile/:userId?"
                        render={() => <ProfileContainer/>}
                    />
                    <Route
                        path="/users"
                        render={() => <UsersContainer/>}
                    />
                    <Route
                        path="/login"
                        render={() => <LoginContainer/>}
                    />
                </div>
            </div>
        );
    }
}
let mapStateToProps = (state: AppStateType) => {
    return {
        isInitialized: state.appInit.isInitialized
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnAppPropsType, AppStateType>
    (mapStateToProps, {initializeApp: initializeAppTC}),
    withRouter,
)(App);

//types:
export type RootAppPropsType = MapStateToPropsType & MapDispatchToPropsType & OwnAppPropsType
type OwnAppPropsType = {}
type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType ={
    initializeApp: () => void,
}


