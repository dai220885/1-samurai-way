import React from "react";

type ButtonPropsType = {
    name: string;
    buttonCallBack: Function;
}

export const Button = (props:ButtonPropsType) => {
    const onClickHandler = () => {
        props.buttonCallBack()
    }
return(
    <button onClick={onClickHandler}>{props.name}</button>
)

}
