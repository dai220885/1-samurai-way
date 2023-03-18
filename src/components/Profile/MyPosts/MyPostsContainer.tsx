import React, {useState} from 'react';
import {
    addPostActionCreator,
    removePostActionCreator,
    setNewPostTextActionCreator
} from '../../../redux/profile-reducer';
import {ActionsType, StoreType} from '../../../redux/store';
import MyPosts from './MyPosts';

type MyPostsContainerPropsType = {
    store: StoreType
}
// создаем контейнерную компоненту 'MyPostsContainer', которая будет отрисовывать презентационную компоненту 'MyPosts'
//'MyPostsContainer' в пропсах принимает весь 'store', после чего компоненту 'MyPosts' передает только нужные ей части 'store'
function MyPostsContainer(props: MyPostsContainerPropsType) {
    const state = props.store.getState() //просто выносим содержимое свойства '_state' из 'store' в переменную state
    const removePost = (postForRemoveID: string) => props.store.dispatch(removePostActionCreator(postForRemoveID))
    const addNewPost = () => {
        //props.addNewPost();
        //let action = {type: 'ADD-POST'};//объект, который передаем методу dispatch
        props.store.dispatch(addPostActionCreator());
        //setTitle('')
    }
    const setNewPostText =(newPostText: string) =>{
        //debugger
        props.store.dispatch(setNewPostTextActionCreator(newPostText))
    }

    return <MyPosts
        posts={state.profilePage.posts}
        addNewPost={addNewPost}
        removePost={removePost}
        newPostText={state.profilePage.newPostText}
        setNewPostText={setNewPostText}
    />
}

export default MyPostsContainer;