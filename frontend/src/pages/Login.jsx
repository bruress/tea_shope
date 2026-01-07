import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Logo } from "../assets/Images";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Login = ({setUser}) => {
    const [form, setForm] = useState({
        email:"",
        password:"",
    });
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/api/auth/login`, form);
            setUser(res.data.user);
            navigate("/");
        } catch (err) {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="absolute bg-cover bg-[url(../src/assets/img/back-3.png)] w-full min-h-screen">
            <form onSubmit={handleSubmit}>

                <Link to="/" className="flex justify-center items-center mt-[30px]">
                    <Logo className="hover:cursor-pointer"/>
                    <label className="hover:cursor-pointer text-[48px] font-cormorant text-[#0D3B24] ml-[8px]">TEA SHOP</label>
                </Link>

                <div className="mt-[190px] flex flex-col justify-center items-center">
                    <label className="text-[128px] font-cormorant text-[#0D3B24] font-semiboldbold">Sign in</label>
                    <input className="
                        bg-[#FFFCF7]
                        border-[#0D3B24]
                        border-[1px]
                        rounded-[15px]
                        w-[550px]
                        h-[50px]
                        text-center
                        font-lora
                        text-[24px]
                        text-[#0D3B24]
                        outline-none
                        mt-[15px]"
                        placeholder="e-mail"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                    />
                    <input
                        className="
                        bg-[#FFFCF7]
                        border-[#0D3B24]
                        border-[1px]
                        rounded-[15px]
                        w-[550px]
                        h-[50px]
                        text-center
                        font-lora
                        text-[24px]
                        text-[#0D3B24]
                        outline-none
                        mt-[15px]"
                        placeholder="password"
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({...form, password: e.target.value})}
                    />
                    <button
                        type="submit"
                        className="mt-[30px] text-center border-[#0D3B24] border-[1px] rounded-[15px] bg-[#445C32] w-[350px] h-[50px] font-lora font-bold text-[20px] text-[#FFFFFF]
                                    hover:cursor-pointer hover:bg-[#0D3B24] duration-500 "
                    >Sign in</button>
                </div>
            </form>
        </div>
    )

}

export default Login;