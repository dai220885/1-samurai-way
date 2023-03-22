import React, {useState} from 'react';
import {
    addPostAC, ProfilePageType,
    removePostAC,
    setNewPostTextAC
} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import StoreContext from '../../../StoreContext';
import {connect} from 'react-redux';
import {addMessageAC, removeMessageAC, setNewMessageTextAC} from '../../../redux/dialogs-reducer';
import Dialogs from '../../Dialogs/Dialogs';
import {AppStateType, DispatchType} from '../../../redux/redux-store';
import { Dispatch } from 'redux';

type MyPostsContainerPropsType = {
    //store: StoreType
}
// создаем контейнерную компоненту 'MyPostsContainer', которая будет отрисовывать презентационную компоненту 'MyPosts'
//'MyPostsContainer' в пропсах принимает весь 'store', после чего компоненту 'MyPosts' передает только нужные ей части 'store'

//Контейнерные компоненты не получают стор в пропсах, а вызывают соответствующие презентационные компоненты, обернутые в <StoreContext.Consumer>, в которую приходит стор, после чего к нему и происходит обращение и передача нужных параметров в презентационную компоненту
function MyPostsContainerOLD() {
    return (
        <StoreContext.Consumer>
            {(store) => {
                const state = store.getState() //просто выносим содержимое свойства '_state' из 'store' в переменную state
                const removePost = (postForRemoveID: string) => store.dispatch(removePostAC(postForRemoveID))
                const addNewPost = () => {
                    //props.addNewPost();
                    //let action = {type: 'ADD-POST'};//объект, который передаем методу dispatch
                    store.dispatch(addPostAC());
                    //setTitle('')
                }
                const setNewPostText = (newPostText: string) => {
                    //debugger
                    store.dispatch(setNewPostTextAC(newPostText))
                }
                    return <MyPosts
                        posts={state.profilePage.posts}
                        addNewPost={addNewPost}
                        removePost={removePost}
                        newPostText={state.profilePage.newPostText}
                        setNewPostText={setNewPostText}
                    />
                }
            }
        </StoreContext.Consumer>
    )
}


let mapStateToProps = (state: AppStateType): ProfilePageType =>{
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
//типизировали dispatch импортировав { Dispatch } from 'redux', DispatchType из 'redux-store' тоже работает;
let mapDispatchToProps = (dispatch: Dispatch) =>{
    return {
        addNewPost: () => dispatch(addPostAC()),
        removePost: (postForRemoveID: string) => dispatch(removePostAC(postForRemoveID)),
        setNewPostText: (newPostText: string) => dispatch(setNewPostTextAC(newPostText))
    }
}

//контейнерная компонента с использованием react-redux:
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts); //когда две пары круглых скобок, то значит, что после первого вызова функция что-то вернет, а вторыми скобками мы вызываем, то, что вернется после первого вызова)))

export default MyPostsContainer;