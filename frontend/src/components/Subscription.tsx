import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'


const Subscription = () => {

    const API_URL = import.meta.env.VITE_API_URL;
    console.log("API_URL", API_URL)

    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/api/mail/sendMail`, {
                userEmail: email,
                emailSubject: "Thank you for subscribing!",
                emailBody: `
                Hello,

                You have successfully subscribed to our tea newsletter. 
                You will now receive updates on our latest teas and promotions.

                Enjoy your tea time with us!🍵
                `
            });
        } catch (err) {
            console.error(err);
            alert("Error subcribing");
        }
    }

    return (
        <section className="relative w-full min-h-screen">
            <div className="absolute bg-[url(../src/assets/img/back-2.png)] bg-center bg-cover w-full h-full flex items-center justify-center">
                
                <div className="flex flex-col items-center w-[750px]">
                   
                    <label className=" w-[750px] mb-[60px] text-center font-cormorant text-[100px] text-[#0D3B24] hover:text-[#0B1D14]
                            hover:text-[#0D3B24] hover:text-[105px] duration-500 font-bold">Subscribe to our Newsletter</label>
                    
                    
                    <form onSubmit={handleSubmit}>
                        <input className="outline-none mb-[20px] border-[#0D3B24] border-[1px] rounded-[20px] bg-[#FFFCF7] w-[750px] h-[80px] font-lora text-[32px] text-[#0D3B24] pl-[40px]"
                                value={email}
                                placeholder="email"
                                type='email'
                                onChange={(e) => setEmail(e.target.value)}
                                required
                        />
                        <button
                            type='submit'
                            className="text-center relative border-[#0D3B24] border-[1px] rounded-[20px] bg-[#445C32] w-[750px] h-[90px] font-lora font-bold text-[32px] text-[#FFFFFF]
                                hover:cursor-pointer hover:bg-[#0D3B24] duration-500 ">
                        Subscribe</button>
                    </form>

                </div>

            </div>
        </section>
    )
}

export default Subscription;