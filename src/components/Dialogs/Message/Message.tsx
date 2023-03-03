import React from "react";
import classes from './../Dialogs.module.css'

type MessagePropsType = {
    message: string;
    className?: string
}

function Message(props: MessagePropsType) {
    return (
        <div className={classes.message}>{props.message}</div>
    )
}

export default Message;
