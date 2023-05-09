import React, {useState} from 'react';
import {
    addNewPostAC,
    removePostAC,
    //setNewPostText
} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import StoreContext from '../../../StoreContext';
import {connect} from 'react-redux';
import {addMessageAC, removeMessageAC} from '../../../redux/dialogs-reducer';
import Dialogs from '../../Dialogs/Dialogs';
import {AppStateType, DispatchType} from '../../../redux/redux-store';
import { Dispatch } from 'redux';

type MyPostsContainerPropsType = {
    //store: StoreType
}
// создаем контейнерную компоненту 'MyPostsContainer', которая будет отрисовывать презентационную компоненту 'MyPosts'
//'MyPostsContainer' в пропсах принимает весь 'store', после чего компоненту 'MyPosts' передает только нужные ей части 'store'

type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type mapDispatchToPropsType = {
    addNewPost: (newPost: string) => void,
    removePost: (postForRemoveID: string) => void,
    //setNewPostText: (newPostText: string) => void,
}
type OwnMyPostsContainerPropsType = {}

let mapStateToProps = (state: AppStateType) =>{
    return {
        posts: state.profilePage.posts,
        //newPostText: state.profilePage.newPostText,
        //profile: state.profilePage.profile //MyPostsContainer не использует это свойство. можно убрать,
    }
}
//типизировали dispatch импортировав { Dispatch } from 'redux', DispatchType из 'redux-store' тоже работает;
// let mapDispatchToProps = (dispatch: Dispatch) =>{
//     return {
//         addNewPost: () => dispatch(addNewPost()),
//         removePost: (postForRemoveID: string) => dispatch(removePost(postForRemoveID)),
//         setNewPostText: (newPostText: string) => dispatch(setNewPostText(newPostText))
//     }
// }

//контейнерная компонента с использованием react-redux:
const MyPostsContainer = connect<MapStateToPropsType, mapDispatchToPropsType, OwnMyPostsContainerPropsType, AppStateType>(mapStateToProps, {
    addNewPost: addNewPostAC,
    removePost: removePostAC,
    })(MyPosts); //когда две пары круглых скобок, то значит, что после первого вызова функция что-то вернет, а вторыми скобками мы вызываем, то, что вернется после первого вызова)))

export default MyPostsContainer;