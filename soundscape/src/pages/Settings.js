import Footer from '../components/Footer'
import SendMeMessage from '../components/SendMeMessage'
import ManageAccount from '../components/ManageAccount'
import PrivacyPolicyLink from '../components/PrivacyPolicyLink'
import DeleteAccount from '../components/DeleteAccount'

const Settings = () => {
    return (
        <div>
            <div className='bg-gray md:w-[calc(100%-200px)] w-[calc(100%-170px)] min-h-screen h-fit md:p-lg p-md md:ml-[200px] ml-[170px] flex flex-wrap content-center'>
                <div className='w-full flex lg:flex-nowrap flex-wrap justify-center items-center lg:space-x-lg space-x-0 lg:space-y-0 space-y-md lg:mb-lg mb-md'>
                    <SendMeMessage />
                    <div className='lg:w-1/2 w-full lg:space-y-lg space-y-md'>
                        <ManageAccount />
                        <PrivacyPolicyLink />
                    </div>
                </div>
                <DeleteAccount />
            </div>
            <Footer />
        </div>
    )
}

export default Settings