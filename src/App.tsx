//import logo from './logo.svg';
import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from "./components/Dialogs/Dialogs";

import {BrowserRouter, Route} from "react-router-dom";
import {AllDataType} from "./index";

type AppPropsType = {
    data: AllDataType
}

function App(props: AppPropsType) {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path="/dialogs" render={()=><Dialogs dialogs={props.data.dialogs} messages={props.data.messages}/>}/>
                    <Route path="/profile" render={()=><Profile posts = {props.data.posts}/>}/>
                    {/*<Route path="/news" component={News}/>*/}
                    {/*<Route path="/music" component={Music}/>*/}
                    {/*<Route path="/settings" component={Settings}/>*/}
                    {/*<Profile/>*/}
                    {/*<Dialogs/>*/}
                </div>
            </div>
        </BrowserRouter>

    );
}

export default App;
