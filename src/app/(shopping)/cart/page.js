"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ImBin } from "react-icons/im";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Upper from "@/components/all-navbars/NavbarUpper";
import Navbar_Home from "@/components/all-navbars/NavbarHome";
import Navbar_Buyer from "@/components/all-navbars/NavbarBuyer";
import Navbar from "@/components/all-navbars/NavbarArtists";
import Footer from "@/components/footer/Footer";
import FooterAccordion from "@/components/footer/FooterAccordion";
import Image from "next/image";
import Link from "next/link";
import "./cart.css";

const Cart = () => {
  const [userType, setUserType] = useState("guest");
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [likedArtworks, setLikedArtworks] = useState(new Set());

  useEffect(() => {
    const fetchUserType = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user-type", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setUserType(response.data.user_type);
      } catch (error) {
        console.error("Error fetching user type:", error);
      }
    };

    fetchUserType();
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data.cart_items);
        setSubtotal(response.data.total);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    const fetchLikedArtworks = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user/likes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLikedArtworks(new Set(response.data.likedArtworks));
      } catch (error) {
        console.error("Error fetching liked artworks:", error);
      }
    };
    fetchLikedArtworks();
  }, []);

  const removeItem = async (artworkId, size) => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      await axios.delete("http://127.0.0.1:8000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
        data: { artwork_id: artworkId, size },
      });

      setCartItems((prev) => prev.filter((item) => !(item.artwork.id === artworkId && item.size === size)));
      setSubtotal((prev) => prev - cartItems.find((item) => item.artwork.id === artworkId).price);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const toggleLike = async (artworkId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("You must be logged in to like artworks.");
      return;
    }

    const isLiked = likedArtworks.has(artworkId);
    const url = `http://127.0.0.1:8000/api/artworks/${artworkId}/like`;

    try {
      if (isLiked) {
        await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
        setLikedArtworks((prev) => {
          const newSet = new Set(prev);
          newSet.delete(artworkId);
          return newSet;
        });
      } else {
        await axios.post(url, {}, { headers: { Authorization: `Bearer ${token}` } });
        setLikedArtworks((prev) => new Set(prev).add(artworkId));
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const promocodeDiscount = 0;
  const totalPrice = subtotal - promocodeDiscount;

  return (
    <>
      <Upper />
      {userType === "artist" ? <Navbar /> : userType === "buyer" ? <Navbar_Buyer /> : <Navbar_Home />}
      <div className="container">
        <div className="cart-items">
          <div className="item-number">
            <span>Cart</span>
            <span>{cartItems.length} Items</span>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="items-in-cart">
          <div className="row">
            <div className="col-md-8 col-12">
              {cartItems.map((item) => (
                <div key={`${item.artwork.id}-${item.size}`} className="item">
                  <div className="row">
                    <div className="col-md-2 col-4">
                      <div className="image-item">
                        <Image
                          src={item.artwork.photos[0]}
                          alt={item.artwork.name}
                          width={105}
                          height={105}
                          quality={70}
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="col-md-7 col-8">
                      <div className="info-item">
                        <h2>{item.artwork.name}</h2>
                        <p>{item.artwork.description}</p>
                        <span>EGP {item.price}</span>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <span className="view-details">
                        <Link href={"/product-details?id=" + item.artwork.id} className="reser-link main-color">
                          view Details <IoIosArrowForward />
                        </Link>
                      </span>
                      <div className="remove-heart">
                        <span className="remove" onClick={() => removeItem(item.artwork.id, item.size)}>
                          <ImBin />
                        </span>
                        <span className="heart">
                          <Link
                            href="#"
                            className="reser-link"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleLike(item.artwork.id);
                            }}
                          >
                            {likedArtworks.has(item.artwork.id) ? <FaHeart color="red" /> : <FaRegHeart />}
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <a className="button-add-artwork" href="/shop-art">
                <button>+ Add Artwork</button>
              </a>
            </div>
            <div className="col-md-4 col-12">
              <div className="order-summary">
                <h2>Order Summary</h2>
                <div className="row">
                  <div className="col-md-6 col-6">
                    <p className="subtotal">Subtotal / {cartItems.length} items</p>
                  </div>
                  <div className="col-md-6 col-6">
                    <p className="price-all-items t-r">EGP {subtotal}</p>
                  </div>
                  <div className="col-md-6 col-6">
                    <p className="promocode">Promocode</p>
                  </div>
                  <div className="col-md-6 col-6">
                    <p className="price-promocode">EGP {promocodeDiscount}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-6 col-6">
                    <p className="total-price">Total Price</p>
                  </div>
                  <div className="col-md-6 col-6">
                    <p className="total-price-number">EGP {totalPrice}</p>
                  </div>
                </div>
                <div className="order-summary-button">
                  <Link href="/checkout">Go to Checkout</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FooterAccordion />
    </>
  );
};

export default Cart;
