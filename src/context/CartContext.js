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
        if (!token) return;
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/user", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCartCount(response.data.cart_items_count);
        } catch (error) {
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
