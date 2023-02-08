import React from "react";

type ButtonPropsType = {
    name: string;
    buttonCallBack: Function;
}

export const Button = (props:ButtonPropsType) => {
    const onClickButtonHandler = () => {
        props.buttonCallBack()
    }
return(
    <button onClick={onClickButtonHandler}>{props.name}</button>
)

}
