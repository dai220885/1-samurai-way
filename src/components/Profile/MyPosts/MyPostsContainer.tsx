import React, {useState} from 'react';
import {
    addPostAC,
    removePostAC,
    setNewPostTextAC
} from '../../../redux/profile-reducer';
import {ActionsType, StoreType} from '../../../redux/store';
import MyPosts from './MyPosts';
import StoreContext from '../../../StoreContext';

type MyPostsContainerPropsType = {
    //store: StoreType
}
// создаем контейнерную компоненту 'MyPostsContainer', которая будет отрисовывать презентационную компоненту 'MyPosts'
//'MyPostsContainer' в пропсах принимает весь 'store', после чего компоненту 'MyPosts' передает только нужные ей части 'store'

//Контейнерные компоненты не получают стор в пропсах, а вызывают соответствующие презентационные компоненты, обернутые в <StoreContext.Consumer>, в которую приходит стор, после чего к нему и происходит обращение и передача нужных параметров в презентационную компоненту
function MyPostsContainer() {


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

export default MyPostsContainer;