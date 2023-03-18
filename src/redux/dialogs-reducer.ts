import {
    ActionsType,
    AddMessageActionType,
    MessagePageType,
    RemoveMessageActionType,
    SetNewMessageActionType,
    StateType
} from './store';
import {v1} from 'uuid';
import {MessageType} from '../components/Dialogs/Dialogs';

const ADD_MESSAGE = 'ADD-MESSAGE';
const REMOVE_MESSAGE = 'REMOVE-MESSAGE';
const SET_NEW_MESSAGE_TEXT = 'SET-NEW-MESSAGE-TEXT';

let initialState = {
    dialogs: [
        {id: v1(), name: 'Alexandr'},
        {id: v1(), name: 'Victor'},
        {id: v1(), name: 'Sergey'},
        {id: v1(), name: 'Vladimir'},
        {id: v1(), name: 'Petr'},
        {id: v1(), name: 'Galina'},
    ],
    messages: [
        {id: v1(), message: 'Helloooo!!!'},
        {id: v1(), message: 'How are you?'},
        {id: v1(), message: 'Good morning, bro'},
        {id: v1(), message: 'Good Buy!!'},
        {id: v1(), message: 'Good Buy!!'},
        {id: v1(), message: 'Good Buy!!'},
        {id: v1(), message: 'Good Buy!!'},
    ],
    newMessageText: ''
}

const dialogsReducer = (state: MessagePageType = initialState, action: ActionsType) => {
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
export const addMessageActionCreator =(): AddMessageActionType=> ({type: ADD_MESSAGE})
export const removeMessageActionCreator = (messageForRemoveId: string):RemoveMessageActionType =>({type: REMOVE_MESSAGE, messageForRemoveId: messageForRemoveId})
export const setNewMessageTextActionCreator = (newMessageText:string):SetNewMessageActionType => ({type: SET_NEW_MESSAGE_TEXT, newMessageText: newMessageText})
export default dialogsReducer;