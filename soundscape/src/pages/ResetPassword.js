import ResetPasswordForm from '../components/ResetPasswordForm'
import LoginRegisterVideo from '../components/LoginRegisterVideo'

const Login = () => {
    return (
        <div className='sm:flex sm:flex-nowrap'>
            <LoginRegisterVideo />
            <ResetPasswordForm />
        </div>
    )
}

export default Login