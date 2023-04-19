import React, {ChangeEvent, KeyboardEventHandler, KeyboardEvent} from 'react';

type TextAreaPropsType = {
    value: string;
    onChange: (newText:string) => void;
    onKeyPress: () => void
    placeholder?: string
    //dispatch?: (action: any) => void
}


export const TextArea = (props:TextAreaPropsType) => {
    let onChangeTextAreaHandler = (e: ChangeEvent<HTMLTextAreaElement>)=>{
        props.onChange(e.currentTarget.value);
        //let action = {type: 'SET-NEW-POST-TEXT', newPostText: e.currentTarget.value};//объект, который передаем методу dispatch
        //props.dispatch(setNewPostTextActionCreator(e.currentTarget.value))

    }
    let onKeyPressTextAreaHandler = (e: KeyboardEvent<HTMLTextAreaElement>)=>{
        //console.log(e)
        if((e.code==="Enter"||e.code==="NumpadEnter") && e.ctrlKey)
          // if(e.key==="Enter"&& e.ctrlKey) //так не рабобтает
        {
            props.onKeyPress()
        }
    }

    return (
        <textarea
            placeholder={props.placeholder? props.placeholder: 'type something'}
            value ={props.value}
            onChange={onChangeTextAreaHandler}
            onKeyPress={onKeyPressTextAreaHandler}>
        </textarea>
    );
};

