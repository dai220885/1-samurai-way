import React from 'react';
import {
    addMessageAC, MessagePageType,
    removeMessageAC,
    setNewMessageTextAC
} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import StoreContext from '../../StoreContext';
import {connect} from 'react-redux';
import MyPostsContainer from '../Profile/MyPosts/MyPostsContainer';
import {AppStateType, DispatchType} from '../../redux/redux-store';
import { Dispatch } from 'redux';

export type DialogsContainerPropsType = {
    //store: StoreType
    //dialogs: DialogType[]
    //messages: MessageType[]
    //newMessageText: string
    //dispatch: (action: ActionsType) => void

    //removeMessage: (id: string)=>void
    //addNewMessage: (message: string)=>void
    //setNewMessageText: (newMessageText: string)=>void
    //buttonCallBack?: Function[]
}
// создаем контейнерную компоненту 'DialogsContainer', которая будет отрисовывать презентационную компоненту 'Dialogs'
//'DialogsContainer' в пропсах принимает весь 'store', после чего компоненту 'Dialogs' передает только нужные ей части 'store'

//Контейнерные компоненты не получают стор в пропсах, а вызывают соответствующие презентационные компоненты, обернутые в <StoreContext.Consumer>, в которую приходит стор, после чего к нему и происходит обращение и передача нужных параметров в презентационную компоненту
function DialogsContainerOLD() {
    return (
        <StoreContext.Consumer>
            {(store) => {
                const state = store.getState() //просто выносим содержимое свойства '_state' из 'store' в переменную state
                const removeMessage = (messageForRemoveID: string) => store.dispatch(removeMessageAC(messageForRemoveID))
                const addNewMessage = () => store.dispatch(addMessageAC());
                const setNewMessageText = (newPostText: string) => {
                    store.dispatch(setNewMessageTextAC(newPostText))
                }
                return <Dialogs
                    dialogs={state.messagesPage.dialogs}
                    messages={state.messagesPage.messages}
                    newMessageText={state.messagesPage.newMessageText}
                    addNewMessage={addNewMessage}
                    removeMessage={removeMessage}
                    setNewMessageText={setNewMessageText}
                />}}
        </StoreContext.Consumer>
    )
}

let mapStateToProps = (state: AppStateType): MessagePageType =>{
    return {
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages,
        newMessageText: state.messagesPage.newMessageText
    }
}
//типизировали dispatch импортировав { Dispatch } from 'redux', DispatchType из 'redux-store' тоже работает;
let mapDispatchToProps = (dispatch: Dispatch) =>{
    return {
        addNewMessage: ()=>{dispatch(addMessageAC())},
        removeMessage: (messageForRemoveID: string)=>{dispatch(removeMessageAC(messageForRemoveID))},
        setNewMessageText: (newPostText: string) => {dispatch(setNewMessageTextAC(newPostText))}
    }
}

//контейнерная компонента с использованием react-redux:
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs); //когда две пары круглых скобок, то значит, что после первого вызова функция что-то вернет, а вторыми скобками мы вызываем, то, что вернется после первого вызова)))

export default DialogsContainer;

