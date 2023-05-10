import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, TextareaHTMLAttributes} from 'react';
import styles from './FormsControls.module.css'
type ValidatePropsType = {
    input: {}
    meta: any
    //dispatch?: (action: any) => void
}


const FormControl: React.FC<any> = ({input, meta, child, ...props}) => {

    const hasError = meta.touched && meta.error
    return (
        <div className={styles.formControl + ' ' + (hasError? styles.error: '')}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
}


export const TextAreaWithValidate: React.FC<any> = (props) => {
    const {input, meta, child, ...restProps} = props;
     return (
         <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
    );
};

export const InputWithValidate: React.FC<any> = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
        <FormControl {...props}><input {...input} {...restProps}/></FormControl>
    );
};

export const _TextAreaWithValidate: React.FC<DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & ValidatePropsType> = ({input, meta, ...props}) => {
    //debugger
    //console.log(meta)
    const hasError = meta.touched && meta.error
    return (
        <div className={styles.formControl + ' ' + (hasError? styles.error: '')}>
            <div><textarea {...input} {...props}/></div>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
};

export const _InputWithValidate: React.FC<DetailedHTMLProps<TextareaHTMLAttributes<HTMLInputElement>, HTMLInputElement> & ValidatePropsType> = ({input, meta, ...props}) => {
    //debugger
    //console.log(meta)
    const hasError = meta.touched && meta.error
    return (
        <div className={styles.formControl + ' ' + (hasError? styles.error: '')}>
            <div><input {...input} {...props}/></div>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
};