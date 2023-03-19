import React from "react";
import {
    addMessageActionCreator,
    removeMessageActionCreator,
    setNewMessageTextActionCreator
} from '../../redux/dialogs-reducer';
import {ActionsType, StoreType} from '../../redux/store';
import Dialogs from './Dialogs';

export type DialogsContainerPropsType = {
    store: StoreType
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
function DialogsContainer (props: DialogsContainerPropsType) {
    const state = props.store.getState() //просто выносим содержимое свойства '_state' из 'store' в переменную state
    const removeMessage =(messageForRemoveID: string)=>props.store.dispatch(removeMessageActionCreator(messageForRemoveID))
    const addNewMessage = () => props.store.dispatch(addMessageActionCreator());
    const setNewMessageText =(newPostText: string) =>{
        props.store.dispatch(setNewMessageTextActionCreator(newPostText))
    }

    return (
        <Dialogs
            dialogs={state.messagesPage.dialogs}
            messages={state.messagesPage.messages}
            newMessageText={state.messagesPage.newMessageText}
            addNewMessage={addNewMessage}
            removeMessage={removeMessage}
            setNewMessageText={setNewMessageText} />
    )
}

export default DialogsContainer;

