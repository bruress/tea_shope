import { Link } from "react-router-dom";
import React from "react";


const Footer = () => {

    return (
        <footer className="bg-[#0D3B24] px-4 md:px-16 lg:px-28 w-full h-[450px]" >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-[80px] pl-[100px]">
                <div>
                    <label className="font-lora font-bold text-[32px] text-[#ffffff] hover:text-[35px] duration-500">
                        About us
                    </label>
                    <p className="w-[560px] pt-[20px] font-lora italic text-[32px] text-[#ffffff]">
                        Morning dew, one leaf falls in silence — the taste of calm.
                    </p>
                </div>
                <div className="pl-[110px]">
                    <label className="font-lora font-bold text-[32px] text-[#ffffff] hover:text-[35px] duration-500">
                        Quick Links
                    </label>
                    <ul className="flex flex-col">
                        <Link to="/"
                        className="font-lora text-[32px] text-[#ffffff] hover:underline">Main page
                        </Link>
                       <Link to="/catalog/1"
                       className="font-lora text-[32px] text-[#ffffff] hover:underline">Black Tea
                       </Link>
                       <Link to="/catalog/2"
                       className="font-lora text-[32px] text-[#ffffff] hover:underline">Green Tea
                       </Link>
                       <Link to="/catalog/3"
                       className="font-lora text-[32px] text-[#ffffff] hover:underline">Orange tea
                       </Link>
                       <Link to="/catalog/4"
                       className="font-lora text-[32px] text-[#ffffff] hover:underline">Flower tea
                       </Link>
                    </ul>
                </div>
            </div>
        </footer>
    );
};
export default Footer;