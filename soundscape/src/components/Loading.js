const LoadingSpinner = () => {
    return (
        <div className="h-screen md:w-[calc(100%-200px)] w-[calc(100%-170px)] md:ml-[200px] ml-[170px] flex justify-center items-center">
            <div className="animate-spin infinite rounded-full border-blue border-t-4 border-solid h-xxl w-xxl"></div>
        </div>
    );
};

export default LoadingSpinner