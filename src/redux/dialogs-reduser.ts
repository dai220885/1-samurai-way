import {messagePageType, stateType} from './state';
import {v1} from 'uuid';
import {MessageType} from '../components/Dialogs/Dialogs';

const ADD_MESSAGE = 'ADD-MESSAGE';
const REMOVE_MESSAGE = 'REMOVE-MESSAGE';
const SET_NEW_MESSAGE_TEXT = 'SET-NEW-MESSAGE-TEXT';

const dialogsReduser = (state: messagePageType, action: any) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage: MessageType = {id: v1(), message: state.newMessageText}
            state.messages.push(newMessage)
            state.newMessageText = ''
            return state;
        case REMOVE_MESSAGE:
            state.messages = state.messages.filter(m => m.id !== action.messageForRemoveId)
            return state;
        case SET_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newMessageText;
            return state;
        default: return state;
    }
}


//функции, которые будут создавать объекты action (чтобы не запутаться и не ошибиться при создании непосредственно в компоненте
export const addMessageActionCreator =()=> ({type: ADD_MESSAGE})
export const removeMessageActionCreator = (messageForRemoveId: string) =>({type: REMOVE_MESSAGE, messageForRemoveId: messageForRemoveId})
export const setNewMessageTextActionCreator = (newMessageText:string) => ({type: SET_NEW_MESSAGE_TEXT, newMessageText: newMessageText})
export default dialogsReduser;