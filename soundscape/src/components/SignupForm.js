import { useState } from "react"
import FormInput from './FormInput'
import Button from './Button'
import {Link} from 'react-router-dom'
import logo from '../imgs/Logo.svg'
import { useSignup } from '../hooks/useSignup'

const SignupForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [error, setError] = useState(null)
    const [errorField, setErrorField] = useState('')
    const { signup, isLoading, error: err } = useSignup()

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
        if(!(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+-])[A-Za-z\d@$!%*?&+-]{8,}$/.test(password))){
            setError('Password is not strong enough')
            setErrorField('password')
            return
        }
        if(!repeatPassword){
            setError('You must repeat password')
            setErrorField('repeatPassword')
            return
        }
        if(password !== repeatPassword){
            setError('Both passwords must be the same')
            setErrorField(['password', 'repeatPassword'])
            return
        }

        await signup(email, password)
    }

    return (
        <div className='bg-gray sm:w-[50%] sm:h-screen h-[60vh] lg:px-xl md:px-vlg sm:px-lg px-md flex flex-wrap justify-center content-center'>
            <img src={logo} alt='logo' className='md:w-[290px] w-[200px] sm:block hidden mb-xxl' />
            <form onSubmit={handleSubmit} className='md:space-y-lg space-y-md w-full'>
                <FormInput type="text" onChange={e => setEmail(e.target.value)} value={email} placeholder={"E-mail"} error={errorField.includes('email')} />

                <FormInput type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder={"Password"} error={errorField.includes('password')} />

                <FormInput type="password" onChange={e => setRepeatPassword(e.target.value)} value={repeatPassword} placeholder={"Repeat password"} error={errorField.includes('repeatPassword')} />

                <p className='font-kanit md:text-sm text-vsm text-white'>
                    By registering on our site, you agree to our&nbsp;
                    <Link to='/privacy-policy' className='underline'>
                    privacy policy.
                    </Link>
                </p>

                <div className='flex justify-center pt-lg'>
                    <Button text={"SIGN UP"} disabled={isLoading} />
                </div>
                { err && <div className='font-kanit md:text-sm text-vsm text-red text-center'>{ err }</div> }
                { error && <div className='font-kanit md:text-sm text-vsm text-red text-center'>{ error }</div> }
            </form>
            <p className='font-kanit md:text-sm text-vsm text-white text-center mt-vlg'>
                Already have an account?&nbsp;
                <Link to='/login' className='underline'>Log in to Soundscape!</Link>
            </p>
        </div>
    )
}

export default SignupForm