import React, {ChangeEvent, KeyboardEventHandler, KeyboardEvent} from 'react';

type InputPropsType = {
    value: string;
    setValue: (newPostText:string)=> void;
    textAreaCallBack: () => void
}


export const TextArea = (props:InputPropsType) => {
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
            placeholder={'add new post'}
            value ={props.value}
            onChange={onChangeTextAreaHandler}
            onKeyPress={onKeyPressTextAreaHandler}>
        </textarea>
    );
};

