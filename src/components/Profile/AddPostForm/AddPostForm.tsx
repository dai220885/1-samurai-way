import {maxLengthCreator, requiredField} from '../../../utils/validators/validators';
import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {TextAreaWithValidate} from '../../common/FormsControls/FormsControls';

export type AddPostFormDataType = {
    newPost: string
}

const maxLength15 = maxLengthCreator(15)

const AddPostForm: React.FC<InjectedFormProps<AddPostFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder='add new post'
                       name = 'newPost'
                       component ={TextAreaWithValidate}
                       validate = {[requiredField, maxLength15]}
                />
            </div>
            <div><button>Add post</button></div>
        </form>
    )
}

export const AddPostReduxForm = reduxForm<AddPostFormDataType>({form: 'profileAddPostForm'})(AddPostForm)