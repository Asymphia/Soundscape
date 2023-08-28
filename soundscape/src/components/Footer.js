import { useAuthContext } from '../hooks/useAuthContext'

const Footer = () => {
    const { user } = useAuthContext()

    return (
        <div className={`bg-gray ${user ? 'md:w-[calc(100vw-205px)] w-[calc(100vw-170px)] md:ml-[200px] ml-[170px]' : 'w-full'} py-md px-lg font-kanit text-white md:text-vsm text-vvsm border-t-[1px] border-solid border-lightgray`}>
            &copy; 2023 - Soundscape <br />
            Soundscape is not related to Spotify AB or any of it´s partners in any way
        </div>
    )
}

export default Footer