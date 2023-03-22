//import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import {BrowserRouter, Route} from 'react-router-dom';
import {v1} from 'uuid';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import {AppStateType, DispatchType} from './redux/redux-store';

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
            <Header/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Route
                    path="/dialogs"
                    render={() =>
                        <DialogsContainer
                            //store={props.store}
                            //dialogs={state.messagesPage.dialogs}
                            //messages={state.messagesPage.messages}
                            //newMessageText={state.messagesPage.newMessageText}
                            //dispatch={props.dispatch}
                            //addNewMessage={props.store.addNewMessage.bind(props.store)}
                            //removeMessage={props.store.removeMessage.bind(props.store)}
                            //setNewMessageText={props.store.setNewMessageText.bind(props.store)}
                        />}
                />
                <Route
                    path="/profile"
                    render={() =>
                        <Profile
                            //store={props.store} // для контейнерной компоненты
                            //posts={state.profilePage.posts}
                            //dispatch={props.dispatch}
                            //addNewPost={props.store.addNewPost.bind(props.store)}
                            //removePost={props.store.removePost.bind(props.store)}
                            //newPostText={state.profilePage.newPostText}
                            //setNewPostText={props.store.setNewPostText.bind(props.store)}
                        />}
                />
                {/*<Route path="/news" component={News}/>*/}
                {/*<Route path="/music" component={Music}/>*/}
                {/*<Route path="/settings" component={Settings}/>*/}
                {/*<Profile/>*/}
                {/*<Dialogs/>*/}
            </div>
        </div>
    );
}

export default App;
