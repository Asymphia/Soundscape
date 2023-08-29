import { useState } from "react"
import logo from '../imgs/Logo.svg'
import CodeValidation from './CodeValidation'
import SubmitNewPassword from './SubmitNewPassword'
import { Link } from 'react-router-dom'
import arrow from '../imgs/arrow-left.png'

const ResetPasswordForm = () => {
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [userEmail, setUserEmail] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [isChanged, setIsChanged] = useState(false)

    const sendResetCode = async (e) => {
        e.preventDefault()

        setError(false)
        setIsLoading(true)

        try{
            const response = await fetch('/api/mail/sendResetCode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email
                })
            })

            if(response.ok) {
                const data = await response.json()
                setError(false)
                setIsLoading(false)
                setUserEmail(data.accepted[0])
            } else {
                const data = await response.json()
                setError(data.error)
                setIsLoading(false)
            }
        } catch (err) {
            setError(err)
            setIsLoading(false)
        }
    }

    const checkCode = async (e) => {
        e.preventDefault()

        setError(false)
        setIsLoading(true)

        try {
            const response = await fetch('/api/user/checkCode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, resetCode: code }),
            })

            const data = await response.json()

            if(response.ok){
                setIsLoading(false)
                setError(false)
                setIsChecked(true)
            } else {
                setError(data.error)
                setIsLoading(false)
            }
        } catch (err){
            setError(err)
            setIsLoading(false)
        }
    }

    const resetPassword = async (e) => {
        e.preventDefault()

        setError(false)
        setIsLoading(true)

        if(password !== repeatPassword){
            setIsLoading(false)
            setError('Both passwords must be the same!')
            return
        }

        try {
            const response = await fetch('/api/user/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, newPassword: password })
            })

            const data = await response.json()

            if(response.ok){
                setError(false)
                setIsLoading(false)
                setIsChanged(true)
            } else {
                setError(data.error)
                setIsLoading(false)
            }
        } catch (err){
            setError(err)
            setIsLoading(false)
        }
    }

    return (
        <div className='bg-gray sm:w-[50%] sm:h-screen h-[60vh] lg:px-xl md:px-vlg sm:px-lg px-md flex flex-wrap justify-center content-center'>
            <img src={logo} alt='logo' className='md:w-[290px] w-[200px] sm:block hidden mb-xxl' />

            { !userEmail && !isChecked &&
                <CodeValidation
                    onSubmit={sendResetCode}
                    type='text'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    placeholder='E-mail'
                    text='Enter your e-mail address that you used during registration to receive a password reset code.'
                    buttonText='SEND CODE'
                    disabled={isLoading}
                    error={error}
                />
            }

            { userEmail && !isChecked &&
                <CodeValidation
                    onSubmit={checkCode}
                    type='text'
                    onChange={e => setCode(e.target.value)}
                    value={code}
                    placeholder='Code'
                    text='Enter the code that was sent to the e-mail address you provided earlier.'
                    buttonText='SUBMIT CODE'
                    disabled={isLoading}
                    error={error}
                />
            }

            { userEmail && isChecked && !isChanged &&
                <SubmitNewPassword
                    onSubmit={resetPassword}
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    onChangeRepeat={e => setRepeatPassword(e.target.value)}
                    valueRepeat={repeatPassword}
                    disabled={isLoading}
                    error={error}
                />
            }

            { isChanged &&
                <div className='font-kanit text-center text-white md:text-sm text-vsm space-y-md'>
                    <p>
                        Password changed successfully!
                    </p>
                    <p>
                        You can now login to your account with your new password!
                    </p>
                    <Link to='/login' className='block hover:underline'>
                        <img src={arrow} alt='Go back to the login page' className='inline h-[24px] w-[24px]' />
                        Go back to the login page
                    </Link>
                </div>
            }

        </div>
    )
}

export default ResetPasswordForm