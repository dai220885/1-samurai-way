import React, {ChangeEvent, KeyboardEventHandler, KeyboardEvent} from 'react';

type TextAreaPropsType = {
    value: string;
    setValue: (newPostText:string)=> void;
    textAreaCallBack: () => void
    placeholder?: string
}


export const TextArea = (props:TextAreaPropsType) => {
    let onChangeTextAreaHandler = (e: ChangeEvent<HTMLTextAreaElement>)=>{
        props.setValue(e.currentTarget.value);

    }
    let onKeyPressTextAreaHandler = (e: KeyboardEvent<HTMLTextAreaElement>)=>{
        //console.log(e)
        if((e.code==="Enter"||e.code==="NumpadEnter") && e.ctrlKey){
            props.textAreaCallBack()
        }
    }

    return (
        <textarea
            placeholder={props.placeholder? props.placeholder: 'tipe something'}
            value ={props.value}
            onChange={onChangeTextAreaHandler}
            onKeyPress={onKeyPressTextAreaHandler}>
        </textarea>
    );
};

