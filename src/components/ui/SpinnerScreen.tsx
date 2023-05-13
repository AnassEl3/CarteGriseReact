const SpinnerScreen = () => {
    return (
        <div className="absolute flex justify-center items-center bg-black dark: bg-opacity-30 dark:bg-opacity-60 w-full h-full z-30">
            
            <div
                className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white"
                role="status"
                aria-label="loading"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default SpinnerScreen;
