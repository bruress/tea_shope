import {BlackTea} from '../assets/Images';
import {FlowerTea} from '../assets/Images';
import {GreenTea} from '../assets/Images';
import {OrangeTea} from '../assets/Images';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import React from 'react';

const API_URL = import.meta.env.VITE_API_URL;


const CatalogTea = () => {

    return (
        <div className="mt-[40px] relative w-full ">
            <div className='bg-[#ffffff] flex justify-center py-[40px]'>
                <label className='text-center font-cormorant text-[128px] text-[#0D3B24]
                hover:text-[#0B1D14] duration-500 self-center items-center'>
                    Catalog
                </label>
            </div>
            <div className="relative grid grid-cols-2 grid-rows-2 w-full h-[1040px] font-cormorant text-[96px] font-bold
            hover:cursor-pointer">
                <Link to="/catalog/1" className="group flex bg-[#FDFFFE] w-full h-full justify-center items-center gap-[50px] text-[#0D3B24]
                hover:bg-[#FDF2E7] hover:text-[#0B1D14] duration-500">
                    <img src={BlackTea} alt="" className='w-[370px] h-[370px]
                    group-hover:w-[400px] group-hover:h-[400px] duration-500'/>
                    <label>Black Tea</label>
                </Link>
                <Link to="/catalog/4" className="group flex bg-[#D74F4F] w-full h-full justify-center items-center gap-[50px] text-[#ffffff]
                hover:bg-[#FF4A4A] duration-500">
                    <img src={FlowerTea} alt="" className='w-[370px] h-[370px]
                    group-hover:w-[400px] group-hover:h-[400px] duration-500'/>
                    <label>Flower Tea</label>
                </Link>
                <Link to="/catalog/2" className="group flex bg-[#76845A] w-full h-full not-first:justify-center items-center gap-[50px] text-[#ffffff]
                hover:bg-[#637442] duration-500">
                    <img src={GreenTea} alt="" className='w-[370px] h-[370px]
                    group-hover:w-[400px] group-hover:h-[400px] duration-500'/>
                    <label>Green Tea</label>
                </Link>
                <Link to="/catalog/3" className="group flex bg-[#FFC76C] w-full h-full justify-center items-center gap-[50px] text-[#0D3B24]
                hover:bg-[#FF8B43] hover:text-[#ffffff] duration-500">
                    <img src={OrangeTea} alt="" className='w-[370px] h-[370px]
                    group-hover:w-[400px] group-hover:h-[400px] duration-500'/>
                    <label>Orange Tea</label>
                </Link>
                           
            </div>
        </div>

    );
};
export default CatalogTea;