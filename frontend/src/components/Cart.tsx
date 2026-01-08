import React from "react";
import axios from "axios";
import { Arrow } from "../assets/Images";
import { Garbage } from "../assets/Images";
import { useState, useEffect } from "react";
import Checkout from "./Checkout";

const API_URL = import.meta.env.VITE_API_URL;

const Cart = ({setCartOpen, user, setUser}) => {
    const [items, setItems] = useState([]);
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    const loadCart = async() => {
      const res = await axios.get(`${API_URL}/api/cart`, {withCredentials: true});
      setItems(res.data.items);
    };

    const increase = async (item) => {
      await axios.put(`${API_URL}/api/cart/item/${item.cart_item_id}`, {quantity: item.quantity +1}, {withCredentials: true});
      loadCart();
    };

    const decrease = async (item) => {
      await axios.put(`${API_URL}/api/cart/item/${item.cart_item_id}`, {quantity: item.quantity -1}, {withCredentials: true});
      loadCart();
    };

    const removeItem = async (id) => {
      await axios.delete(`${API_URL}/api/cart/item/${id}`, {withCredentials: true});
      loadCart();
    }

    const createOrder = async() => {
      await axios.post(`${API_URL}/api/orders`, {}, {withCredentials: true});
      setItems([]);
      setCartOpen(false);
    }

    useEffect(() => {
      loadCart();
    }, []);

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    );

    return (
      <>
          <div className="flex justify-end">
              <div className="bg-[#FDF3EF] w-[570px] min-h-screen flex flex-col">
                
                  <div className="flex items-center justify-between mx-[30px] mt-[30px]">
                      <label className="font-lora text-[24px] text-[#445C32]
                      hover:text-[#0D3B24]  duration-500">Shopping bag</label>
                      <Arrow className="hover:cursor-pointer"
                          onClick={() => setCartOpen(false)}
                      />
                  </div>
                {items.map((item) => ( 
                  <div className="my-[25px] flex flex-col items-center"> 
                      <div 
                      key={item.cart_item_id}
                      className="border-[2px] w-[500px] h-[0px] border-[#445C32]"></div>

                          <div 
          
                          className="m-[30px] w-[500px] h-[180px] flex flex-row justify-between items-center border-b-[1px] border-[#445C32]">
          
                              <div className="flex">
                                  <img 
                                    src={item.image_tea}
                                    className="w-[150px] h-[150px] rounded-[15px] object-cover"/>
                                    
                                      <div className="ml-[20px] flex flex-col justify-start">
                                          <p className="font-cormorant text-[24px] text-[#0D3B24]">{item.tea_name}</p>
                                          <div className="mt-[25px] font-lora font-bold text-[16px] text-[#ffffff] flex items-center rounded-[15px] bg-[#6E8061] w-[180px] h-[40px]">
                                              <div 
                                              onClick={()=>decrease(item)}
                                              className="flex-1 pl-[15px] rounded-l-[15px] h-full flex justify-center items-center hover:bg-[#0D3B24] hover:cursor-pointer duration-500">-</div>
                                              <div className="select-none px-[10px]">{item.quantity}</div>
                                              <div 
                                              onClick={()=>increase(item)}
                                              className="flex-1 pr-[15px] rounded-r-[15px] h-full flex justify-center  items-center hover:bg-[#0D3B24] hover:cursor-pointer duration-500">+</div>
                                          </div>
                                      </div>
                              </div>

                              <div className="flex flex-col justify-between items-end">
                                  <p className="font-lora text-[24px] text-[#0D3B24]">€{item.price * item.quantity}</p>
                                  <Garbage 
                                  onClick={()=> removeItem(item.cart_item_id)}
                                  className="mt-[15px] hover:color-[#0D3B24] hover:cursor-pointer duration-500"/>
                              </div>
                          </div>
                    
                  </div>
        ))}
                  <div className="flex flex-col items-start mt-auto pb-[60px]">
                      <p className="pb-[20px] pl-[35px] font-lora text-[24px] text-[#445C32]
                                      hover:text-[#0D3B24]  duration-500">Total: €{total}</p>
                      <button 
                      onClick={() => setCheckoutOpen(true)}
                      className="self-center rounded-[15px] font-lora font-bold text-[20px] text-[#ffffff] w-[500px] h-[60px] bg-[#445C32] border-[1px] border-[#0D3B24]
                                          hover:cursor-pointer hover:bg-[#0D3B24] duration-500">Checkout</button>
                  </div>

              </div>
          </div>
      <Checkout
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        total={total}
      />
    </>
    )
}

export default Cart;
