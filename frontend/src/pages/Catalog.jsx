import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import { Buy } from "../assets/Images";

const API_URL = import.meta.env.VITE_API_URL;

const Catalog = ({ openCart, user, setUser }) => {
    const { id } = useParams(); // category id
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search");

    const [category, setCategory] = useState({});
    const [teas, setTeas] = useState([]);
    const [loading, setLoading] = useState(false);

    const addToCart = async (teaId) => {
        await axios.post(
            `${API_URL}/api/cart`,
            { tea_id: teaId, quantity: 1 },
            { withCredentials: true }
        );
        openCart();
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                // 🔎 ПОИСК
                if (search) {
                    const res = await axios.get(`${API_URL}/api/search`, {
                        params: { search }
                    });
                    setTeas(res.data);
                    setCategory({ tea_type: `Search: "${search}"` });
                }

                // 📂 КАТЕГОРИЯ
                else if (id) {
                    const res = await axios.get(
                        `${API_URL}/api/catalog/tea_type/${id}`
                    );
                    setCategory(res.data.types);
                    setTeas(res.data.teas);
                }
            } catch (err) {
                console.error("Catalog load error", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, search]);

    return (
        <div className="flex flex-col w-full min-h-screen">
            <Header user={user} setUser={setUser} />

            <div className="flex flex-col items-center bg-center bg-[url(../src/assets/img/back-4.png)] w-full flex-1 bg-cover">
                <label className="font-cormorant text-[120px] font-bold text-[#0D3B24] mt-[40px]">
                    {category.tea_type}
                </label>

                {loading ? (
                    <div className="text-[32px] mt-[100px]">Loading...</div>
                ) : (
                    <div className="mt-[60px] mb-[150px] grid grid-cols-3 gap-[200px]">
                        {teas.map(product => (
                            <div
                                key={product.tea_id}
                                className="relative flex-col rounded-[35px] flex justify-center items-center h-[600px] w-[400px] bg-[#6E8061]
                                           hover:h-[630px] hover:bg-[#526247] duration-500"
                            >
                                <div
                                    className="absolute top-[20px] right-[20px] flex items-center justify-center w-[50px] h-[50px]
                                               bg-[#445C32] rounded-[15px] hover:bg-[#324722] cursor-pointer"
                                    onClick={() => addToCart(product.tea_id)}
                                >
                                    <Buy />
                                </div>

                                <div className="rounded-[35px] bg-[#FFFBFB] w-[270px] h-[340px] hover:w-[280px] hover:h-[350px] duration-500">
                                    <img
                                        src={product.image_tea}
                                        className="rounded-[35px] w-full h-full object-cover"
                                    />
                                </div>

                                <p className="text-[36px] font-cormorant font-bold text-white mt-[20px]">
                                    {product.tea_name}
                                </p>

                                <p className="px-[30px] pt-[10px] text-[22px] font-cormorant text-white text-center">
                                    {product.composition}
                                </p>

                                <p className="self-end pr-[30px] text-[32px] font-cormorant font-bold text-white">
                                    €{product.price}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Catalog;
