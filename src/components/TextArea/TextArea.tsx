import React, {ChangeEvent} from 'react';

type InputPropsType = {
    title: string;
    setTitle: (title:string)=> void;
}


export const TextArea = (props:InputPropsType) => {
    let onChangeInputHandler = (event: ChangeEvent<HTMLTextAreaElement>)=>{
        props.setTitle(event.currentTarget.value)
    }
    return (
        <textarea value ={props.title} onChange={onChangeInputHandler} ></textarea>
    );
};

