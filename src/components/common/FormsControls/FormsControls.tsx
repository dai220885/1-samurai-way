import React, {ChangeEvent, DetailedHTMLProps, KeyboardEvent, TextareaHTMLAttributes} from 'react';
type TextAreaWithValidatePropsType = {
    input: {}
    meta: {}
    //dispatch?: (action: any) => void
}
export const TextAreaWithValidate: React.FC<DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & TextAreaWithValidatePropsType> = ({input, meta, ...props}) => {
    //debugger
    return (
        <textarea {...input} {...props}>
        </textarea>
    );
};