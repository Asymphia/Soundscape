import FormInput from './FormInput'
import Button from './Button'
import { Link } from 'react-router-dom'
import arrow from '../imgs/arrow-left.png'

const SubmitNewPassword = ({ onSubmit, onChange, value, onChangeRepeat, valueRepeat, disabled, error }) => {
    return (
        <form onSubmit={onSubmit} className='md:space-y-lg space-y-md w-full'>
            <FormInput type='password' onChange={onChange} value={value} placeholder='New password' />
            <FormInput type='password' onChange={onChangeRepeat} value={valueRepeat} placeholder='Repeat new password' />

            <div className='flex justify-center'>
                <Button text='SET NEW PASSWORD' disabled={disabled} />
            </div>

            { error && <div className='font-kanit md:text-sm text-vsm text-red text-center'>{ error }</div> }

            <Link to='/login' className='block cursor-pointer text-center text-white font-kanit md:text-sm text-vsm pb-lg hover:underline'>
                <img src={arrow} alt='go back to the login page' className='h-[24px] w-[24px] inline' />
                Back to login page
            </Link>
        </form>
    )
}

export default SubmitNewPassword