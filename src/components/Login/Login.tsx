import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';

type LoginPropsType = {}
type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

export const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        //console.log(formData)
    }
    return (
        <div>
            <h1>Login</h1>
            {/*в LoginReduxForm необходимо передать колбэк в onSubmit, который выполнится при нажатии на кнопку внутри формы*/}
            <LoginReduxForm onSubmit = {onSubmit}/>
        </div>
    );
};


const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        //handleSubmit - свойство из 'redux-form', которое появляется в пропсах, когда компоненту закидываем в reduxForm
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Login'} name = {'login'} component={'input'}/>
            </div>
            <div>
                <Field placeholder={'Password'} name = {'password'} component={'input'}/>
            </div>
            <div>
                <Field component={'input'} name = {'rememberMe'} type={'checkbox'}/> Remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)