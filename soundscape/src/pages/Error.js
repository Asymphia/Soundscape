import { Link } from 'react-router-dom'
import arrow from '../imgs/arrow-left.png'
import Footer from '../components/Footer'

const Error = () => {
    return (
        <div>
            <div className='w-full h-screen bg-gray flex justify-center items-center text-center text-white'>
                <div>
                    <h1 className='font-nunito text-lg font-black text-red'>
                        ERROR
                    </h1>
                    <p className='font-kanit text-md mb-md'>
                        An error occurred while creating your account
                    </p>
                    <Link to="/signup" className='font-kanit text-sm hover:underline'>
                        <img src={arrow} alt='go back to the website' className='h-[24px] w-[24px] inline' />
                        Go back to register page
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Error