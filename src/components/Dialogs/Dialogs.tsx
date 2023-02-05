import React from "react";
import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Button} from "../Button/Button";


type buttonCallBackType = {
    name:string;
    function: Function
}

export type DialogsPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    removeMessage: Function
    addNewMessage: Function
    buttonCallBack?: Array<Function>
}

export type DialogType = {
    id: number
    name: string
}

export type MessageType = {
    id: number
    message: string
}


function Dialogs (props: DialogsPropsType) {

    let dialogsElements = props.dialogs.map((dialog) => {
        return <DialogItem key = {dialog.id} id={dialog.id} name={dialog.name}/>
        }
    )
    //тот же синтаксис, что и у dialogsElements, но покороче, опущены скобки вокруг message внутри map
    //т.к. только один параметр, также опущено слово return (т.к. перед ним ничего нет)  и фигурные скобки после него
    let messagesElements = props.messages.map((message, index) => <Message key = {index} message={message.message}/>)

    return (
        <>
            <div>
                <Button name={"Remove last message"} buttonCallBack={props.removeMessage}/>
                <Button name={"Add Yo"} buttonCallBack={() => {props.addNewMessage("Yo-Yo-Yo")}}/>
                {/*<button onClick={() => {props.removeMessage(1)}}>remove message</button>*/}
            </div>
            <div className={classes.dialogs}>

                <div className={classes.dialogItems}>
                    {dialogsElements}
                </div>
                <div className={classes.messages}>
                    {messagesElements}
                </div>
            </div>
        </>

    )
}

export default Dialogs;




// let dialogs: Array<DialogType> = [
//     {id: 1, name: "Alexandr"},
//     {id: 2, name: "Victor"},
//     {id: 3, name: "Sergey"},
//     {id: 4, name: "Vladimir"},
//     {id: 5, name: "Petr"},
//     {id: 6, name: "Galina"},
//
// ]
//

