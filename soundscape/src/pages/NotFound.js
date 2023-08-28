import { Link } from 'react-router-dom'
import arrow from '../imgs/arrow-left.png'
import Footer from '../components/Footer'
import { useAuthContext } from '../hooks/useAuthContext'

const NotFound = () => {
    const { user } = useAuthContext()

    return (
        <div>
            <div className='w-full h-screen bg-gray flex justify-center items-center text-center text-white'>
                <div>
                    <h1 className='font-nunito text-lg font-black'>
                        4
                        <span className='text-blue'>0</span>
                        4
                    </h1>
                    <p className='font-kanit text-md mb-md'>
                        Page Not Found
                    </p>
                    <Link to={user ? '/' : '/login'} className='font-kanit text-sm hover:underline'>
                        <img src={arrow} alt='go back to the website' className='h-[24px] w-[24px] inline' />
                        Go back to the website
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default NotFound