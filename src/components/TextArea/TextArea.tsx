import React, {ChangeEvent, KeyboardEventHandler} from 'react';

type InputPropsType = {
    title: string;
    setTitle: (title:string)=> void;
}


export const TextArea = (props:InputPropsType) => {
    let onChangeTextAreaHandler = (event: ChangeEvent<HTMLTextAreaElement>)=>{
        props.setTitle(event.currentTarget.value)
    }
    let onKeyPressTextAreaHandler = (event: KeyboardEventHandler<HTMLTextAreaElement>)=>{
if (1){

}
    }


    return (
        <textarea value ={props.title} onChange={onChangeTextAreaHandler} onKeyPress={(e)=>{
            console.log(e)}}></textarea>
    );
};

