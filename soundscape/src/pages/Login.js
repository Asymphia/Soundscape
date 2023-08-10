import LoginForm from '../components/LoginForm'
import LoginRegisterVideo from '../components/LoginRegisterVideo'

const Login = () => {
    return (
        <div className='sm:flex sm:flex-nowrap'>
            <LoginRegisterVideo />
            <LoginForm />
        </div>
    )
}

export default Login