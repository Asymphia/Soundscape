import Footer from '../components/Footer'
import SendMeMessage from '../components/SendMeMessage'
import ManageAccount from '../components/ManageAccount'
import PrivacyPolicyLink from '../components/PrivacyPolicyLink'
import DeleteAccount from '../components/DeleteAccount'

const Settings = () => {
    return (
        <div>
            <div className='bg-gray w-full bg-gray md:w-[calc(100vw-205px)] w-[calc(100vw-170px)] min-h-screen h-fit md:p-lg p-md md:ml-[200px] ml-[170px] flex flex-wrap content-center'>
                <div className='w-full flex md:flex-nowrap flex-wrap justify-center items-center md:space-x-lg space-x-0 md:space-y-0 space-y-md md:mb-lg mb-md'>
                    <SendMeMessage />
                    <div className='md:w-1/2 w-full md:space-y-lg space-y-md'>
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