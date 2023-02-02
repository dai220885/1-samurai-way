import React from "react";
import {NavLink} from "react-router-dom";
import classes from './../Dialogs.module.css'

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

export default DialogItem;