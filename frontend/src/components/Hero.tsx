const Hero = () => {
    return (
        <div className="relative w-full min-h-screen">
            <div className="absolute bg-[url(../src/assets/img/back.png)] bg-no-repeat bg-center bg-cover w-full h-full flex-col flex justify-center">
                <div className="mb-[200px] ml-[200px] mb-[50px] w-full max-w-[490px] h-[200px] font-cormorant text-[48px] font-semibold text-[#0D3B24] 
                hover:font-bold hover:text-[#0B1D14] hover:text-[50px] hover:max-w-[510px] duration-500">
                    <label>
                        Morning dew, one leaf falls in silence — the taste of calm.
                    </label>
                    <div className="border-solid border-b-1 border-[#0D3B24] w-[350px]"></div>
                </div>
            </div>
        </div>
    );
};
export default Hero;
