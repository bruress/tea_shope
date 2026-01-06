import {Mountain} from '../assets/Images'
import {Vitamin} from '../assets/Images'
import {Leaf} from '../assets/Images'
import {Aroma} from '../assets/Images'

const AboutUs = () => {
    return (
        <section className="relative mt-[40px] w-full min-h-screen">
            <div className="absolute bg-[url(src/assets/img/back-1.png)] bg-no-repeat bg-center bg-cover w-full h-full flex-col flex justify-center">
                <div className="flex items-end-safe flex-col mr-[200px] items-center mb-[300px]">
                    <label className="font-cormorant text-[#0D3B24] text-[150px] mb-[20px]
                    hover:text-[#0B1D14] hover:text-[155px] duration-500">
                        About us
                    </label>
                    <div className="grid grid-cols-2 grid-row-2 gap-x-[150px] gap-y-[60px] w-full max-w-[650px]">
                        <div className="flex justify-end font-lato text-[36px] text-[#0B1D14] font-extralight gap-[20px] items-center
                        hover:text-[40px] duration-500">
                            <Leaf className="w-[50px] h-[50px]"/>
                            <label>Finest Tea Leaves</label>
                        </div>
                        <div className="flex justify-end font-lato text-[36px] text-[#0B1D14] font-extralight gap-[20px] items-center
                        hover:text-[40px] duration-500">
                            <Mountain className="w-[50px] h-[40px]"/>
                            <label>Authentic Flavors</label>
                        </div>
                        <div className="flex justify-end font-lato text-[36px] text-[#0B1D14] font-extralight gap-[20px] items-center
                         hover:text-[40px] duration-500">
                            <Vitamin className="w-[50px] h-[50px]"/>
                            <label>Natural Vitamins</label>
                        </div>
                         <div className="flex justify-end font-lato text-[36px] text-[#0B1D14] font-extralight gap-[20px] items-center
                          hover:text-[40px] duration-500">
                            <Aroma className="w-[40px] h-[50px]"/>
                            <label>Fresh Aroma</label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default AboutUs;