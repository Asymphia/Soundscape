import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

const SendMeMessage = () => {
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSend, setIsSend] = useState(false)
    const maxLength = 500
    const { user } = useAuthContext()

    const handleChange = (event) => {
        setError(false)
        const inputMessage = event.target.value
        if (inputMessage.length <= maxLength) {
            setMessage(inputMessage)
            setError(false)
        } else {
            setError(`The message can be up to ${maxLength} characters long`)
        }
    }

    const sendMessage = async () => {
        setError(false)
        setIsLoading(true)
        try{
            const response = await fetch('/api/mail/sendEmail?message=' + message, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            if(response.ok){
                setIsSend(true)
                setIsLoading(false)
                setError(false)
                setMessage('')
            } else {
                setError('Server Error')
                setIsLoading(false)
            }
        } catch (err) {
            setError('Server Error')
            setIsLoading(false)
        }
    }

    return (
        <div className='bg-lightgray h-fit lg:w-1/2 w-full text-white md:p-lg p-md rounded-sm'>
            <h2 className='font-nunito font-bold md:text-sm text-vsm mb-lg text-center'>
                Any problems? Send me a message!
            </h2>

            {
                !isSend &&
                <div className='text-center'>
                    <textarea
                        placeholder='Type your message here...'
                        value={message}
                        onChange={handleChange}
                        className={`bg-lightgray ${error ? 'border-red' : 'border-blue'} resize-none h-[200px] border-[1px] border-solid rounded-sm w-full px-lg py-md text-white transition focus:outline-none focus:border-lightblue font-kanit md:text-sm text-vsm`}
                    />
                    <p className="md:text-vsm text-vvsm font-kanit text-right">
                        {message.length}/{maxLength} characters
                    </p>
                    {error &&
                        <p className='font-kanit md:text-vsm text-vvsm text-red mt-md'>
                            {error}
                        </p>
                    }
                    <button onClick={sendMessage} disabled={isLoading} className='text-lightgray mt-lg sm:px-xl px-sm py-md sm:w-fit w-full bg-blue font-kanit md:text-sm text-vsm rounded-lg transition hover:bg-lightblue'>
                        { isLoading ? 'SENDING...' : 'SEND' }
                    </button>
                </div>
            }

            {
                isSend &&
                <p className='font-kanit md:text-vsm text-vvsm text-center'>
                    Message sent successfully!
                </p>
            }
        </div>
    )
}

export default SendMeMessage