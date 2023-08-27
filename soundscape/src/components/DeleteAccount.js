import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

const DeleteAccount = () => {
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAuthContext()
    const { logout } = useLogout()
    
    const handleDelete = async () => {
        setError(false)
        setIsLoading(true)

        try {
            const response = await fetch(`/api/user/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
            })

            if (response.ok) {
                setIsLoading(false)
                setError(false)
                logout()
            } else {
                setIsLoading(false)
                setError('Server Error')
            }
        } catch (err) {
            setIsLoading(false)
            setError('Server Error')
        }
    }


    return (
        <div className='bg-lightgray h-fit md:w-1/2 w-full text-white md:p-lg p-md rounded-sm mx-auto'>
            <h2 className='font-nunito font-bold md:text-sm text-vsm mb-lg text-center'>
                Delete Account
            </h2>
            <div className='text-center font-kanit md:text-vsm text-vvsm space-y-lg'>
                <p>
                    You can delete your Soundscape account and delete all your data from this webapp.  <br />
                    You can sign-up again later at any time.
                </p>
                {error &&
                    <p className='font-kanit md:text-vsm text-vvsm text-red mt-md'>
                        {error}
                    </p>
                }
                <button onClick={handleDelete} disabled={isLoading} className='text-lightgray sm:px-xl px-sm py-md sm:w-fit w-full bg-red font-kanit md:text-sm text-vsm rounded-lg transition hover:bg-lightred'>
                    { isLoading ? 'DELETING...' : 'DELETE' }
                </button>
            </div>
        </div>
    )
}

export default DeleteAccount