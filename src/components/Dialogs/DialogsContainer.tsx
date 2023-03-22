import React from 'react';
import {
    addMessageAC,
    removeMessageAC,
    setNewMessageTextAC
} from '../../redux/dialogs-reducer';
import {ActionsType, StoreType} from '../../redux/store';
import Dialogs from './Dialogs';
import StoreContext from '../../StoreContext';

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
function DialogsContainer() {
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

export default DialogsContainer;

