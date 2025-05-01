"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        fetchCartCount();
    }, []);

    const fetchCartCount = async () => {
        const token = localStorage.getItem("authToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        try {
            const response = await axios.get("https://marasem-art.net/api/user", {
                headers,
                withCredentials: true,
            });
            setCartCount(response.data.cart_items_count);
        } catch (error) {
            setCartCount(0);
            console.error("Error fetching cart count:", error);
        }
    };

    return (
        <CartContext.Provider value={{ cartCount, setCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
