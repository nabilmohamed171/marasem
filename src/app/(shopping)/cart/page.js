"use client";
import { useState } from "react";
import { ImBin } from "react-icons/im";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Upper from "@/components/all-navbars/NavbarUpper";
import NabvarBuyer from "@/components/all-navbars/NavbarBuyer";
import Footer from "@/components/footer/Footer";
import FooterAccordion from "@/components/footer/FooterAccordion";
import Image from "next/image";
import Link from "next/link";
import "./cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: "/images/1.png",
      title: "Art Work Name,Type,Calligraphy",
      description:
        "Omar Mohsen, Calligraphy , 2021, 48/58 Ink on Paper 7.87 x 11.41 x 1.37 Inches 20 x 29 x 3.5 cm",
      price: 2079,
      isFavorite: false,
    },
    {
      id: 2,
      image: "/images/2.png",
      title: "Art Work Name,Type,Calligraphy",
      description:
        "Omar Mohsen, Calligraphy , 2021, 48/58 Ink on Paper 7.87 x 11.41 x 1.37 Inches 20 x 29 x 3.5 cm",
      price: 2079,
      isFavorite: false,
    },
    {
      id: 3,
      image: "/images/3.png",
      title: "Art Work Name,Type,Calligraphy",
      description:
        "Omar Mohsen, Calligraphy , 2021, 48/58 Ink on Paper 7.87 x 11.41 x 1.37 Inches 20 x 29 x 3.5 cm",
      price: 2079,
      isFavorite: false,
    },
    {
      id: 4,
      image: "/images/4.png",
      title: "Art Work Name,Type,Calligraphy",
      description:
        "Omar Mohsen, Calligraphy , 2021, 48/58 Ink on Paper 7.87 x 11.41 x 1.37 Inches 20 x 29 x 3.5 cm",
      price: 2079,
      isFavorite: false,
    },
    {
      id: 5,
      image: "/images/5.png",
      title: "Art Work Name,Type,Calligraphy",
      description:
        "Omar Mohsen, Calligraphy , 2021, 48/58 Ink on Paper 7.87 x 11.41 x 1.37 Inches 20 x 29 x 3.5 cm",
      price: 2079,
      isFavorite: false,
    },
    {
      id: 6,
      image: "/images/6.png",
      title: "Art Work Name,Type,Calligraphy",
      description:
        "Omar Mohsen, Calligraphy , 2021, 48/58 Ink on Paper 7.87 x 11.41 x 1.37 Inches 20 x 29 x 3.5 cm",
      price: 3079,
      isFavorite: false,
    },
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const toggleFavorite = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);

  const promocodeDiscount = 50;

  const totalPrice = subtotal - promocodeDiscount;

  return (
    <>
      <Upper />
      <NabvarBuyer />
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
                <div key={item.id} className="item">
                  <div className="row">
                    <div className="col-md-2 col-3">
                      <div className="image-item">
                        <Image
                          src={item.image}
                          alt="Artwork Image"
                          width={150}
                          height={150}
                          objectFit="cover"
                          quality={100}
                        />
                      </div>
                    </div>
                    <div className="col-md-7 col-9">
                      <div className="info-item">
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <span>EGP {item.price}</span>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <span className="view-details">
                        <Link href="#" className="reser-link main-color">
                          view Details <IoIosArrowForward />
                        </Link>
                      </span>
                      <div className="remove-heart">
                        <span
                          className="remove"
                          onClick={() => removeItem(item.id)}
                        >
                          <ImBin />
                        </span>
                        <span
                          className="heart"
                          onClick={() => toggleFavorite(item.id)}
                        >
                          {item.isFavorite ? <FaHeart /> : <FaRegHeart />}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="button-add-artwork">
                <button>+ Add Artwork</button>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="order-summary">
                <h2>Order Summary</h2>
                <div className="row">
                  <div className="col-md-6 col-6">
                    <p className="subtotal">
                      Subtotal / {cartItems.length} items
                    </p>
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
