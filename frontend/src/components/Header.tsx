import { useEffect, useState } from 'react';
import {Logo} from '../assets/Images'
import {IconCart} from '../assets/Images'
import {ProfileImg} from '../assets/Images'
import { useNavigate } from 'react-router-dom';
import axios, { formToJSON } from 'axios';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import { Search } from '../assets/Images';

const API_URL = import.meta.env.VITE_API_URL;

const Header = ({user, setUser}) => {
    const [open, setOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    const handleLogout = async() => {
        try {
            await axios.post(`${API_URL}/api/auth/logout`, null, {withCredentials: true} );
            setUser(null);
            navigate("/")
        } catch (err) {
            setUser(null);
            navigate("/")
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!search.trim()) return;

        navigate(`/catalog?search=${encodeURIComponent(search)}`);
        setSearch("");
    };
    return(
        <>
            <header className='bg-[#FCFBF7] w-full h-[120px] drop-shadow-lg drop-shadow-[#CEDCB6]/50 flex justify-between items-center py-[30px] px-[190px] relative z-10'>
                <Link to="/" className="flex justify-center">
                    <Logo className='text-[#445C32] w-[23px] h-[27px] self-center hover:text-[#0D3B24] duration-200'/>
                    <label className="pl-[8px] font-cormorant text-[48px] text-[#445C32] hover:cursor-pointer hover:text-[#0D3B24] duration-200">TEA SHOP</label>
                </Link>

                <form 
                    onSubmit={handleSearch}
                    className="flex items-center justify-center bg-white border border-[#CEDCB6] hover:border-[#91b375] rounded-[25px] px-[16px] py-[6px] w-[800px]">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="search..."
                        className="flex-1 outline-none font-lora text-[16px] text-[#0D3B24]"
                    />
                    <button type='submit'>
                        <Search className="hover:cursor-pointer"/>
                    </button>
                </form>

                <div className="relative flex justify-center items-center">
                    
                    <IconCart 
                        className="mr-[50px] cursor-pointer w-10 h-10 text-[#445C32] hover:text-[#0D3B24] duration-500" 
                        onClick={() => setCartOpen(prev=>!prev)}/>

                    <button
                        className='cursor-pointer text-[#445C32] hover:text-[#0D3B24] duration-500'
                        onMouseEnter={()=>setOpen(prev => !prev)}
                    >
                    <ProfileImg />
                    </button>
                    {open && (
                        <div className='ml-[90px] absolute top-[50px] flex flex-col bg-[#FCFBF7] rounded-[15px]'>
                        {user ? ( // пользователь залогинен
                            <button className='font-lora text-[18px] py-[8px] px-[80px] text-[#445C32] hover:text-[#0D3B24] duration-200 hover:bg-[#76845A] hover:text-[#ffffff] rounded-b-[15px]'
                            onClick={handleLogout}>Logout</button>
                        ) : (
                            <>
                            <button 
                            onClick={() => navigate("/login")}
                            className='font-lora text-[18px] py-[8px] px-[80px] text-[#445C32] hover:text-[#0D3B24] duration-200 hover:bg-[#76845A] hover:text-[#ffffff] rounded-t-[15px]'>Login</button>
                            <button 
                            onClick={()=>navigate("/register")}
                            className='whitespace-nowrap font-lora text-[18px] py-[8px] px-[80px] text-[#445C32] hover:text-[#0D3B24] duration-200 hover:bg-[#76845A] hover:text-[#ffffff] rounded-b-[15px]'>Sign up</button>
                            </>
                        )}
                        </div>

                    )}
                </div>
            </header>
            {cartOpen && (
                <div className='drop-shadow-2xl drop-shadow-[#CEDCB6]/80 fixed top-0 right-0 h-full z-50'>
                    <Cart cartOpen={cartOpen} setCartOpen={setCartOpen}/>
                </div>
            )}
        </>
    );
};
export default Header;

