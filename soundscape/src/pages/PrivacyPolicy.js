import {Link} from 'react-router-dom'
import arrow from '../imgs/arrow-left.png'
import logo from '../imgs/Logo.svg'
import { useAuthContext } from '../hooks/useAuthContext'
import Footer from '../components/Footer'

const PrivacyPolicy = () => {
    const { user } = useAuthContext()

    return (
        <div>
            <div className={`${user ? 'md:w-[calc(100vw-205px)] w-[calc(100vw-170px)] md:ml-[200px] ml-[170px]' : 'w-full'} sm:px-[20%] px-[10%] py-vlg h-fit bg-gray text-white font-kanit md:text-sm text-vsm`}>
                <Link to={user ? '/settings' : '/signup'} className='hover:underline '>
                    <img src={arrow} alt='go back to the website' className='h-[24px] w-[24px] inline' />
                    Go back to the website
                </Link>

                <img src={logo} alt='Soundscape logo' className='mx-auto my-xl w-[500px]'/>

                <div className='space-y-md'>
                    <h1 className='font-nunito font-bold md:text-lg text-md text-center'>
                        Privacy Policy
                    </h1>
                    <p>
                        Last updated: August 28, 2023
                    </p>
                    <p>
                        This Privacy Policy describes our policies and procedures regarding the collection, use, and disclosure
                        of your information when you use the Service. It also outlines your privacy rights and how the law
                        protects you. By using the Service, you agree to the collection and use of your information in
                        accordance with this Privacy Policy.
                    </p>
                    <h2 className='font-nunito font-bold md:text-md text-sm pt-lg'>
                        I. Introduction
                    </h2>
                    <p>
                        Welcome to Soundscape, a platform designed to display Spotify statistics. This Privacy Policy aims to
                        explain how we collect, use, and protect your personal information. Your use of the Service indicates
                        your consent to the practices described herein.
                    </p>
                    <h2 className='font-nunito font-bold md:text-md text-sm pt-lg'>
                        II. Data Collection and Purpose of Data Collection
                    </h2>
                    <p>
                        We collect the following types of data:
                        <ol className='list-decimal ml-lg'>
                            <li>
                                <strong>Email - </strong> Used for login, communication, and password reset.
                            </li>
                            <li>
                                <strong>Password - </strong> Ensures secure access to your account.
                            </li>
                            <li>
                                <strong>Spotify Tokens - </strong> Enables connection with your Spotify account for music-related statistics.
                            </li>
                        </ol>
                    </p>
                    <h2 className='font-nunito font-bold md:text-md text-sm pt-lg'>
                        III. Legal Basis for Data Processing
                    </h2>
                    <p>
                        The legal basis for processing your data is both your consent and the necessity of processing for the provision of services described in this Privacy Policy.
                    </p>
                    <h2 className='font-nunito font-bold md:text-md text-sm pt-lg'>
                        IV. Data Collection Method
                    </h2>
                    <p>
                        Data is collected manually during registration and via Spotify authorization to obtain Access and Refresh Tokens.
                    </p>
                    <h2 className='font-nunito font-bold md:text-md text-sm pt-lg'>
                        V. Cookies and other Tracking Technologies
                    </h2>
                    <p>
                        We don't use Cookies, but we use similar tracking technologies, such as storing JWT in local storage, to improve and analyze Service usage and for streamlined login.
                    </p>
                    <h2 className='font-nunito font-bold md:text-md text-sm pt-lg'>
                        VI. Data Usage
                    </h2>
                    <p>
                        Your data is used for:
                        <ol className='list-decimal ml-lg'>
                            <li>Login and Spotify authorization</li>
                            <li>Password reset when needed</li>
                            <li>Use of contact form</li>
                        </ol>
                        Data is not shared with third parties or subjected to analysis.
                    </p>
                    <h2 className='font-nunito font-bold md:text-md text-sm pt-lg'>
                        VII. Data Protection
                    </h2>
                    <p>
                        We employ security measures to safeguard your data from unauthorized access, and sensitive data is encrypted.
                    </p>
                    <h2 className='font-nunito font-bold md:text-md text-sm pt-lg'>
                        VIII. User Rights
                    </h2>
                    <p>
                        You have the right to access, correct, and delete your data. Account deletion is also an option.
                    </p>
                    <h2 className='font-nunito font-bold md:text-md text-sm pt-lg'>
                        IX. Contact Us
                    </h2>
                    <p>
                        For inquiries about your data or privacy policy, reach us at soundscape-spotifystats@outlook.com,
                        or by contact form which is available to logged in users.
                    </p>
                    <h2 className='font-nunito font-bold md:text-md text-sm pt-lg'>
                        X. Changes to Privacy Policy
                    </h2>
                    <p>
                        This policy may be updated periodically, and we recommend checking for changes regularly.
                    </p>
                    <h2 className='font-nunito font-bold md:text-md text-sm pt-lg'>
                        XI. Effective Date
                    </h2>
                    <p>
                        This Privacy Policy is effective from August 28, 2023.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PrivacyPolicy