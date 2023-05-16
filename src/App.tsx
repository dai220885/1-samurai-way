//import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Navbar from './components/Navbar/Navbar';
import {Route} from 'react-router-dom';
//import { Routes, Route, Navigate } from 'react-router-dom'
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import LoginContainer from './components/Login/LoginContainer';

const App: React.FC = () => {
    let [count, setCount] = useState<number>(1)

    function addCount() {
        setCount(count += 1)
    }

    //const state = props.state;
    return (
        <div className="app-wrapper">
            <div>
                {count}
            </div>
            <div>
                <button onClick={() => {
                    addCount()
                }}>Add count
                </button>
            </div>
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

export default App;
