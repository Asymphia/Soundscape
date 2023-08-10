const FormInput = ({type, onChange, value, placeholder, error=false}) => {
    return (
        <input
            className={`bg-gray ${error ? 'border-red' : 'border-blue'} border-[1px] border-solid rounded-sm w-full px-lg py-md text-white transition focus:outline-none focus:border-lightblue font-kanit md:text-sm text-vsm`}
            type={type}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
        />
    )
}

export default FormInput