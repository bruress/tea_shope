import React from "react";
import { Arrow } from "../assets/Images";
import { Garbage } from "../assets/Images";

const Cart = () => {
    return (
        <div className="flex justify-end">
            <div className="bg-[#FDF3EF] w-[570px] min-h-screen flex flex-col">
               
                <div className="flex items-center justify-between mx-[30px] mt-[30px]">
                    <label className="font-lora text-[24px] text-[#445C32]
                    hover:text-[#0D3B24]  duration-500">Shopping bag</label>
                    <Arrow className="hover:cursor-pointer"/>
                </div>

                <div className="my-[25px] flex flex-col items-center"> 
                    <div className="border-[2px] w-[500px] h-[0px] border-[#445C32]"></div>

                        <div className="m-[30px] w-[500px] h-[180px] flex flex-row justify-between items-center border-b-[1px] border-[#445C32]">
        
                            <div className="flex">
                                <div className="w-[150px] h-[150px] rounded-[15px]"></div>
                                    <div className="ml-[20px] flex flex-col justify-start">
                                        <p className="font-cormorant text-[24px] text-[#0D3B24]">Text</p>
                                        <div className="mt-[25px] font-lora font-bold text-[16px] text-[#ffffff] flex items-center rounded-[15px] bg-[#6E8061] w-[180px] h-[40px]">
                                            <div className="flex-1 pl-[15px] rounded-l-[15px] h-full flex justify-center items-center hover:bg-[#0D3B24] hover:cursor-pointer duration-500">-</div>
                                            <div className="select-none px-[10px]">N</div>
                                            <div className="flex-1 pr-[15px] rounded-r-[15px] h-full flex justify-center  items-center hover:bg-[#0D3B24] hover:cursor-pointer duration-500">+</div>
                                        </div>
                                    </div>
                            </div>

                            <div className="flex flex-col justify-between items-end">
                                <p className="font-lora text-[24px] text-[#0D3B24]">price</p>
                                <Garbage className="mt-[15px]
                                        hover:color-[#0D3B24] hover:cursor-pointer duration-500"/>
                            </div>
                        </div>
                 
                </div>

                <div className="flex flex-col items-start mt-auto pb-[60px]">
                    <p className="pb-[20px] pl-[35px] font-lora text-[24px] text-[#445C32]
                                    hover:text-[#0D3B24]  duration-500">Total: price</p>
                    <button className="self-center rounded-[15px] font-lora font-bold text-[20px] text-[#ffffff] w-[500px] h-[60px] bg-[#445C32] border-[1px] border-[#0D3B24]
                                        hover:cursor-pointer hover:bg-[#0D3B24] duration-500">Text</button>
                </div>

            </div>
        </div>
    )
}

export default Cart;