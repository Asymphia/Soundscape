import {useState} from "react";
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'
import FormInput from './FormInput'
import logo from '../imgs/Logo.svg'
import Button from './Button'

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [errorField, setErrorField] = useState('')
    const { login, error: err, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setErrorField('')

        if(!email){
            setError('You must enter e-mail')
            setErrorField('email')
            return
        }
        if(!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email))){
            setError('Enter a valid e-mail')
            setErrorField('email')
            return
        }
        if(!password){
            setError('You must enter password')
            setErrorField('password')
            return
        }

        await login(email, password)
    }

    return (
        <div className='bg-gray sm:w-[50%] sm:h-screen h-[60vh] lg:px-xl md:px-vlg sm:px-lg px-md flex flex-wrap justify-center content-center'>
            <img src={logo} alt='logo' className='md:w-[290px] w-[200px] sm:block hidden mb-xxl' />
            <form onSubmit={handleSubmit} className='md:space-y-lg space-y-md w-full'>
                <FormInput type="text" onChange={e => setEmail(e.target.value)} value={email} placeholder={"E-mail"} error={errorField.includes('email')} />

                <FormInput type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder={"Password"} error={errorField.includes('password')} />

                <p className='cursor-pointer text-right text-white font-kanit md:text-sm text-vsm pb-lg'>
                    Forgot password?
                </p>

                <div className='flex justify-center'>
                    <Button text={"SIGN IN"} disabled={isLoading} />
                </div>
                { err && <div className='font-kanit md:text-sm text-vsm text-red text-center'>{ err }</div> }
                { error && <div className='font-kanit md:text-sm text-vsm text-red text-center'>{ error }</div> }
            </form>
            <p className='font-kanit md:text-sm text-vsm text-white text-center mt-vlg'>
                New to Soundscape?
                <Link to='/signup' className='underline'> Register right now!</Link>
            </p>
        </div>
    )
}

export default LoginForm