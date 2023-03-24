import {v1} from 'uuid';

const ADD_MESSAGE = 'ADD-MESSAGE';
const REMOVE_MESSAGE = 'REMOVE-MESSAGE';
const SET_NEW_MESSAGE_TEXT = 'SET-NEW-MESSAGE-TEXT';


export type DialogType = {
    id: string
    name: string
}

export type MessageType = {
    id: string
    message: string
}
export type MessagePageType = {
    dialogs: DialogType[]
    messages: MessageType[]
    newMessageText: string
}

let initialState: MessagePageType = {
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

const dialogsReducer = (state: MessagePageType = initialState, action: DialogsReducerActionType): MessagePageType => {
    switch (action.type) {
        case ADD_MESSAGE:{
            let newMessage: MessageType = {id: v1(), message: state.newMessageText}
            return {...state, messages: [newMessage, ...state.messages], newMessageText: ''}
            // state.messages.push(newMessage)
            // state.newMessageText = ''
            // return state;
        }
        case REMOVE_MESSAGE: {
            return {...state, messages: state.messages.filter(m => m.id !== action.payload.messageForRemoveId)}
            //state.messages = state.messages.filter(m => m.id !== action.payload.messageForRemoveId)
            //return state;
        }
        case SET_NEW_MESSAGE_TEXT:{
            return {...state, newMessageText: action.payload.newMessageText}
            // state.newMessageText = action.payload.newMessageText;
            // return state;
        }
        default:
            return state;
    }
}
export type DialogsReducerActionType =
    AddMessageActionType
    | RemoveMessageActionType
    | SetNewMessageActionType
//автоматически типизируем ActionCreator-ы, но в ActionCreator-е обязательно добавлять в конце 'as const', чтобы свойство type воспринималось не как любая строка, а как константа:
export type AddMessageActionType = ReturnType<typeof addMessageAC>
export type RemoveMessageActionType = ReturnType<typeof removeMessageAC>
export type SetNewMessageActionType = ReturnType<typeof setNewMessageTextAC>

//функции (ActionCreator-ы), которые будут создавать объекты action (чтобы не запутаться и не ошибиться при создании непосредственно в компоненте
export const addMessageAC = () => ({type: ADD_MESSAGE}) as const
export const removeMessageAC = (messageForRemoveId: string) => {
    return {
        type: REMOVE_MESSAGE,
        payload: {
            messageForRemoveId
        }
    } as const
}
export const setNewMessageTextAC = (newMessageText: string) => {
    return {
        type: SET_NEW_MESSAGE_TEXT,
            payload: {
                newMessageText
            }
    }as const
}
export default dialogsReducer;