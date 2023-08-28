import arrow from '../imgs/arrow-right.png'
import { Link } from 'react-router-dom'

const PrivacyPolicyLink = () => {
    return (
        <div className='bg-lightgray h-fit w-full text-white md:p-lg p-md rounded-sm'>
            <h2 className='font-nunito font-bold md:text-sm text-vsm mb-lg text-center'>
                Our Privacy Policy
            </h2>
            <div className='text-center font-kanit md:text-vsm text-vvsm space-y-md'>
                <p>
                    See how we use your data, to provide you with our service
                </p>
                <Link to='/privacy-policy' className='block hover:underline'>
                    View
                    <img src={arrow} alt='View our privacy policy' className='inline h-[24px] w-[24px]' />
                </Link>
            </div>
        </div>
    )
}

export default PrivacyPolicyLink