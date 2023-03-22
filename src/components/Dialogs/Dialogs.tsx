import React from "react";
import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Button} from "../Button/Button";
import {TextArea} from '../TextArea/TextArea';
import {DialogType, MessageType} from '../../redux/dialogs-reducer';

export type DialogsPropsType = {
    //store: StoreType
    dialogs: DialogType[]
    messages: MessageType[]
    newMessageText: string
    //dispatch: (action: ActionsType) => void
    addNewMessage: ()=>void
    removeMessage: (id: string)=>void
    setNewMessageText: (newMessageText: string)=>void
    //buttonCallBack?: Function[]
}




function Dialogs (props: DialogsPropsType) {

    let dialogsElements = props.dialogs.map((dialog) => {
        return <DialogItem key = {dialog.id} id={dialog.id} name={dialog.name}/>
        }
    )
    //тот же синтаксис, что и у dialogsElements, но покороче, опущены скобки вокруг message внутри map
    //т.к. только один параметр, также опущено слово return (т.к. перед ним ничего нет)  и фигурные скобки после него
    let messagesElements = props.messages.map((message) => {
        const removeMessageOnClickHandler =()=>props.removeMessage(message.id)
        return(
            <div key={message.id} className={classes.dialogItems}>
                <Message message={message.message} className={classes.dialogItems}/>
                <Button name={'remove message'} onClick={removeMessageOnClickHandler}/>
                {/*<p></p>*/}
        </div>
        )
    }
    )
    const addNewMessageHandler = () => props.addNewMessage();
    const setNewMessageTextHandler =(newPostText: string) =>{
        props.setNewMessageText(newPostText)
    }

    return (
        <>
            <div className={classes.dialogs}>
                <div className={classes.dialogItems}>
                    {dialogsElements}
                </div>
                <div className={classes.messages}>
                    <TextArea
                        placeholder={'add new message'}
                        value={props.newMessageText}
                        onChange={setNewMessageTextHandler}
                        //dispatch={props.dispatch}
                        onKeyPress={addNewMessageHandler}
                    />
                    <Button
                        name={"Send message"}
                        onClick={addNewMessageHandler}
                    />
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

