import React from "react";
import {NavLink} from "react-router-dom";
import classes from './Dialogs.module.css'

type DialogItemPropsType = {
    id: number;
    name: string;

}

function DialogItem(props: DialogItemPropsType) {
    let path = "/dialogs/" + props.id;
    return (
        <div className={classes.dialog}>
            <NavLink to={path} activeClassName={classes.active}>{props.name}</NavLink>
        </div>
    )
}

type MessagePropsType = {
    message: string;

}

function Message(props: MessagePropsType) {
    return (
        <div className={classes.message}>{props.message}</div>
    )
}

function Dialogs() {
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                <DialogItem id={1} name={"Alexandr"}/>
                <DialogItem id={2} name={"Victor"}/>
                <DialogItem id={3} name={"Sergey"}/>
                <DialogItem id={4} name={"Vladimir"}/>
                <DialogItem id={5} name={"Petr"}/>
                <DialogItem id={6} name={"Galina"}/>
            </div>
            <div className={classes.messages}>
                <Message message={"Helloooo!!!"}/>
                <Message message={"How are you?"}/>
                <Message message={"Good morning, bro"}/>
                <Message message={"Good Buy!!"}/>
            </div>
        </div>


    )
}

export default Dialogs;