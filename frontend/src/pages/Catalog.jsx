import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Buy } from "../assets/Images";

const API_URL = import.meta.env.VITE_API_URL;

const Catalog = ({openCart, user, setUser}) => {
    const {id} = useParams();
    const [category, setCategory] = useState({});
    const [teas, setTea] = useState([]);

    const addToCart = async (teaId) => {
      await axios.post(`${API_URL}/api/cart`, {tea_id: teaId, quantity: 1}, {withCredentials: true});
      openCart();
    }

    const fetchProducts = async () => {
        const res = await axios.get(`${API_URL}/api/catalog/tea_type/${id}`);
        setCategory(res.data.types);
        setTea(res.data.teas);
    };

    useEffect(() => {
        if (id) fetchProducts();
    }, [id]);

    return (
        <div className="flex flex-col w-full min-h-screen">
            <Header user={user} setUser={setUser}/>
            <div className="flex flex-col justify-center items-center bg-center bg-[url(../src/assets/img/back-4.png)] w-full flex-1 bg-cover">
                <label className="font-cormorant text-[150px] font-bold text-[#0D3B24]">
                    {category.tea_type}</label>
                <div className="mt-[60px] mb-[150px] grid grid-cols-3 gap-[200px] items-center justify-between">
                  {teas.map(product => (

                    <div 
                        key={product.tea_id}
                        className="flex-col rounded-[35px] flex justify-center items-center h-[600px] w-[400px] bg-[#6E8061]
                                    hover:h-[630px] hover:bg-[#526247] duration-500">
                     
                        <div className="ml-[250px] mb-[520px] flex items-center justify-center absolute w-[50px] h-[50px] bg-[#445C32] rounded-[15px] 
                                        hover:cursor-pointer hover:bg-[#324722]"
                                        onClick={() => addToCart(product.tea_id)}>
                            <Buy/>
                        </div>

                        <div className="rounded-[35px] bg-[#FFFBFB] w-[270px] h-[340px] hover:w-[280px] hover:h-[350px] duration-500">
                           {product.image_tea && (
                            <img
                                src={product.image_tea}
                                className="rounded-[35px] w-full h-full object-cover"
                            />
                           )}
                        </div>
                            <p className="text-[40px] font-cormorant font-bold text-[#ffffff]">
                                {product.tea_name}
                            </p>
                            <p className="pl-[30px] pt-[10px] self-start text-[26px] font-cormorant font-light text-[#ffffff]">
                                {product.composition}
                            </p>
                            <p className="pr-[20px] self-end text-[38px] font-cormorant font-bold text-[#ffffff]">
                                {product.price}
                            </p>
                    </div>
                  ))}
                    
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Catalog;
