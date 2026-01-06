import { useState } from "react";
import { useSubmit } from "react-router-dom";
import React from "react";
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL;;

const Subscribe = () => {

    const [form, setForm] = useState({
        email_sub: "",
    });
    const [success, setSuccess] = useState(false);
    const [exist, setExist] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        setExist(false);
        try {
            const res = await axios.post(`${API_URL}/api/sub/sub`, form);
            if (res.data.exist) {
                setSuccess(false);
                setExist(true);
            }
            else {
                setSuccess(true);
                setExist(false);
            }
        } 
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="relative mt-[40px] w-full min-h-screen">
            <div className="absolute bg-[url($/img/back-2.png)] bg-no-repeat bg-center bg-cover w-full h-full flex items-center justify-center items">
               <form onSubmit={handleSubmit}>
                <div className="w-full max-w-[800px] flex flex-col items-center">
                    <label className="text-center font-cormorant font-bold text-[100px] text-[#0D3B24]
                    hover:text-[105px] hover:text-[#0B1D14]  duration-500">Subscribe to our Newsletter</label>
                    <div className="w-full mb-[5px]">
                            <input 
                            type="email" 
                            value={form.email_sub}
                            placeholder="e-mail" 
                            onChange={(e)=>setForm({...form, email_sub: e.target.value})}
                            className="peer bg-[#FFFCF7] border-[#0D3B24] border-solid border-1 w-full h-[80px] rounded-2xl flex justify-start items-center px-[40px] outline-none disabled:text-[#848484] text-[32px] font-lora text-[#0D3B24]"/>
                            <label className="font-lora text-[14px] text-[#0D3B24] invisible peer-invalid:visible">Please provide a valid email address.</label>
                    </div>

                        <button 
                        type="submit"
                        className="relative w-full h-[90px] rounded-2xl bg-[#445C32] border border-solid border-[#0D3B24] flex justify-center items-center
                        hover:cursor-pointer hover:bg-[#0D3B24] duration-500 font-lora font-bold text-[32px] text-[#ffffff]" >Subscribe
                        </button>
                        {success && (
                            <label className="mt-[5px] font-lora text-[14px] text-[#0D3B24]">You have successfully subscribed to the newsletter.</label>
                        )}
                        {exist && (
                            <label className="mt-[5px] font-lora text-[14px] text-[#0D3B24]">That's email already exists.</label>
                        )}
                </div>
                </form>
            </div>
        </div>
    );
};
export default Subscribe;