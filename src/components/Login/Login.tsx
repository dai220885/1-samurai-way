import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {InputWithValidate} from '../common/FormsControls/FormsControls';
import {maxLengthCreator, requiredField} from '../../utils/validators/validators';
import {connect} from 'react-redux';
import {loginTC} from '../../redux/auth-reducer';
import {AppStateType} from '../../redux/redux-store';
import {addMessageAC} from '../../redux/dialogs-reducer';
import {MapDispatchToPropsType, MapStateToPropsType} from './LoginContainer';
import {Redirect} from 'react-router-dom';



//const maxLength15 = maxLengthCreator(15)
const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        //handleSubmit - свойство из 'redux-form', которое появляется в пропсах, когда компоненту закидываем в reduxForm
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Email'}
                       name = {'email'}
                       component={InputWithValidate}
                       validate = {[requiredField]}
                />
            </div>
            <div>
                <Field placeholder={'Password'}
                       name = {'password'}
                       type={"password"}
                       component={InputWithValidate}
                       validate = {[requiredField]}
                />
            </div>
            <div>
                <Field component={InputWithValidate}
                       name = {'rememberMe'}
                       type={'checkbox'}
                /> Remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const Login = (props: RootLoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        //console.log(formData)
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if(props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <h1>Login</h1>
            {/*в LoginReduxForm необходимо передать колбэк в onSubmit, который выполнится при нажатии на кнопку внутри формы*/}
            <LoginReduxForm onSubmit = {onSubmit}/>
        </div>
    );
};

export type OwnLoginPropsType = {}
type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}
type RootLoginPropsType = OwnLoginPropsType & MapStateToPropsType & MapDispatchToPropsType
//type MapStateToPropsType = null
//type MapDispatchToPropsType = {
   // addNewMessage: (newMessage: string)=>void,
   // login: (email:string, password: string, rememberMe: boolean) => void
//}
//export default Login
export default Login
