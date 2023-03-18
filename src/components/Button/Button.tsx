import React from "react";

type ButtonPropsType = {
    name: string;
    onClick: () => void;
}

export const Button = (props:ButtonPropsType) => {
    const onClickButtonHandler = () => {
        props.onClick()
    }
return(
    <button onClick={onClickButtonHandler}>{props.name}</button>
)

}
