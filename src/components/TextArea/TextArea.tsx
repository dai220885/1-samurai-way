import React, {ChangeEvent, KeyboardEventHandler, KeyboardEvent} from 'react';

type InputPropsType = {
    title: string;
    setTitle: (title:string)=> void;
    textAreaCallBack: Function
}


export const TextArea = (props:InputPropsType) => {
    let onChangeTextAreaHandler = (event: ChangeEvent<HTMLTextAreaElement>)=>{
        props.setTitle(event.currentTarget.value)
    }
    let onKeyPressTextAreaHandler = (e: KeyboardEvent<HTMLTextAreaElement>)=>{
        if(e.code==="Enter" && e.ctrlKey){
            props.textAreaCallBack()
        }
    }

    return (
        <textarea value ={props.title} onChange={onChangeTextAreaHandler} onKeyPress={onKeyPressTextAreaHandler} ></textarea>
    );
};

