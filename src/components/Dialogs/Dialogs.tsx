import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {Button} from '../Button/Button';
import {TextArea} from '../TextArea/TextArea';
import {DialogType, MessageType} from '../../redux/dialogs-reducer';
import {RootDialogsPropsType} from './DialogsContainer';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {TextAreaWithValidate} from '../common/FormsControls/FormsControls';
import {maxLengthCreator, requiredField} from '../../utils/validators/validators';
import {AddMessageFormDataType, AddMessageReduxForm} from './AddMessageForm/AddMessageForm';

//вместо этого типа используем RootDialogsPropsType, описанный в DialogsContainer
export type DialogsPropsType = {
    //store: StoreType
    dialogs: DialogType[]
    messages: MessageType[]
    newMessageText: string
    //dispatch: (action: ActionsType) => void
    addNewMessage: () => void
    removeMessage: (id: string) => void
    setNewMessageText: (newMessageText: string) => void
    //buttonCallBack?: Function[]
}

function Dialogs(props: RootDialogsPropsType) {
    //if (!props.isAuth) return <Redirect to={'/login'}/>
    let dialogsElements = props.dialogs.map((dialog) => {
            return <DialogItem key={dialog.id} id={dialog.id} name={dialog.name}/>
        }
    )
    //тот же синтаксис, что и у dialogsElements, но покороче, опущены скобки вокруг message внутри map
    //т.к. только один параметр, также опущено слово return (т.к. перед ним ничего нет)  и фигурные скобки после него
    let messagesElements = props.messages.map((message) => {
            const removeMessageOnClickHandler = () => props.removeMessage(message.id)
            return (
                <div key={message.id} className={classes.dialogItems}>
                    <Message message={message.message} className={classes.dialogItems}/>
                    <Button name={'remove message'} onClick={removeMessageOnClickHandler}/>
                    {/*<p></p>*/}
                </div>
            )
    })
    const addNewMessageHandler = (formData: AddMessageFormDataType) => props.addNewMessage(formData.newMessage);
    // const setNewMessageTextHandler = (newPostText: string) => {
    //     props.setNewMessageText(newPostText)
    // }

    return (
        <>
            <div className={classes.dialogs}>
                <div className={classes.dialogItems}>
                    {dialogsElements}
                </div>
                <div className={classes.messages}>
                    <div>{messagesElements}</div>
                    {/*старый инпут для нового сообщения:*/}
                    {/*<div>*/}
                    {/*    <div><TextArea placeholder={'add new message'}*/}
                    {/*                   value={props.newMessageText}*/}
                    {/*                   onChange={setNewMessageTextHandler}*/}
                    {/*                   onKeyPress={addNewMessageHandler}/></div>*/}
                    {/*    <div><Button name={'Send message'} onClick={addNewMessageHandler}/></div>*/}
                    {/*</div>*/}
                    <AddMessageReduxForm onSubmit = {addNewMessageHandler}/>
                </div>
            </div>
        </>
    )
}

export default Dialogs;

