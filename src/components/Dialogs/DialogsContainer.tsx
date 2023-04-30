import React from 'react';
import {
    addMessageAC,
    removeMessageAC,
    setNewMessageTextAC
} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import { Dispatch } from 'redux';
import {withAuthRedirect} from '../../hoc/AuthRedirect';

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

export type RootDialogsPropsType = MapStateToPropsType & MapDispatchToPropsType & OwnDialogsPropsType
type OwnDialogsPropsType = {}
type MapStateToPropsType = ReturnType<typeof mapStateToProps>
let mapStateToProps = (state: AppStateType) =>{
    return {
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages,
        newMessageText: state.messagesPage.newMessageText,
        //isAuth: state.auth.isAuth
    }
}
//типизировали dispatch импортировав { Dispatch } from 'redux', DispatchType из 'redux-store' тоже работает;
type MapDispatchToPropsType = {
    addNewMessage: ()=>void,
    removeMessage: (messageForRemoveID: string)=> void,
    setNewMessageText: (newPostText: string) => void
}
let mapDispatchToProps = (dispatch: Dispatch) =>{
    return {
        addNewMessage: ()=>{dispatch(addMessageAC())},
        removeMessage: (messageForRemoveID: string)=>{dispatch(removeMessageAC(messageForRemoveID))},
        setNewMessageText: (newPostText: string) => {dispatch(setNewMessageTextAC(newPostText))}
    }
}


let AuthRedirectComponent = withAuthRedirect(Dialogs)

//контейнерная компонента с использованием react-redux:
//можно в редьюсере убрать из экшенкриэйтеров буквы AC, чтобы названия совпадали с названиями свойств и укоротить объект, переданный в качестве mapDispatchToProps в функцию connect
const DialogsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, OwnDialogsPropsType, AppStateType>
(mapStateToProps, {
    addNewMessage: addMessageAC,
    removeMessage: removeMessageAC,
    setNewMessageText: setNewMessageTextAC})(AuthRedirectComponent); //когда две пары круглых скобок, то значит, что после первого вызова функция что-то вернет, а вторыми скобками мы вызываем, то, что вернется после первого вызова)))

export default DialogsContainer;

