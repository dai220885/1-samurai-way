import {maxLengthCreator, requiredField} from '../../../utils/validators/validators';
import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {TextAreaWithValidate} from '../../common/FormsControls/FormsControls';

export type AddMessageFormDataType = {
    newMessage: string
}
const maxLength60 = maxLengthCreator(60)
const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder='add new message'
                       name = 'newMessage'
                       component = {TextAreaWithValidate}
                       validate = {[requiredField, maxLength60]}/>
            </div>
            <div><button>Send message</button></div>
        </form>
    )
}

export const AddMessageReduxForm = reduxForm<AddMessageFormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm)