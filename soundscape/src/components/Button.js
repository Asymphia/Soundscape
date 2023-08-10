const Button = ({ text, onClick = () => {}, additionalStyles='', disabled=false }) => {
    return (
        <button onClick={onClick} disabled={disabled} className={`px-xl py-md w-fit bg-blue font-kanit md:text-sm text-vsm rounded-lg transition hover:bg-lightblue ${additionalStyles}`}>
            { text }
        </button>
    )
}

export default Button