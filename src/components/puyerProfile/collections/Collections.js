"use client";
import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";
import "./collections.css";
import { useCart } from "@/context/CartContext"; // Import cart context
import axios from "axios";

const Gallary = () => {
  const { setCartCount } = useCart();
  const [items, setItems] = useState([
    {
      name: "Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum",
      price: "EGP 2,500",
      imageSrc: "/images/22.jpeg",
      artist: "Omar Mohsen",
      artistImage: "/images/avatar2.png",
      isFavorited: false,
    },
    {
      name: "Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum",
      price: "EGP 3,000",
      imageSrc: "/images/88.jpeg",
      artist: "Ahmed Ali",
      artistImage: "/images/avatar2.png",
      isFavorited: false,
    },
    {
      name: "Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum",
      price: "EGP 4,000",
      imageSrc: "/images/1.png",
      artist: "Fatma Nabil",
      artistImage: "/images/avatar2.png",
      isFavorited: false,
    },
    {
      name: "Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum",
      price: "EGP 5,000",
      imageSrc: "/images/view 2.png",
      artist: "Sara Ibrahim",
      artistImage: "/images/avatar2.png",
      isFavorited: false,
    },
    {
      name: "Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum",
      price: "EGP 6,000",
      imageSrc: "/images/view 4.png",
      artist: "Mohamed Youssef",
      artistImage: "/images/avatar2.png",
      isFavorited: false,
    },
    {
      name: "Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum",
      price: "EGP 7,500",
      imageSrc: "/images/view 5.png",
      artist: "Nadia Mansour",
      artistImage: "/images/avatar2.png",
      isFavorited: false,
    },
  ]);
  const [likedArtworks, setLikedArtworks] = useState(new Set());

  const addToCart = async (artworkId, size) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("User not authenticated");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/cart",
        { artwork_id: artworkId, size: size, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );

      // Fetch new cart count after adding item
      const response = await axios.get("http://127.0.0.1:8000/api/cart",
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setCartCount(response.data.items_count);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    const fetchLikedArtworks = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user/likes", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setLikedArtworks(new Set(response.data.likedArtworks)); // ✅ Store IDs as a Set
      } catch (error) {
        console.error("Error fetching liked artworks:", error);
      }
    };
    fetchLikedArtworks();
  }, []);

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
        await axios.delete(url, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        setLikedArtworks((prev) => {
          const newSet = new Set(prev);
          newSet.delete(artworkId);
          return newSet;
        });
      } else {
        await axios.post(url, {}, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        setLikedArtworks((prev) => new Set(prev).add(artworkId));
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="row">
      {items.map((item, index) => (
        <div key={index} className="collections-puyer col-md-4 col-6">
          <div className="item-image">
            <div className="overley"></div>
            <div className="photo">
              <Image
                src={item.imageSrc}
                alt={`Artwork ${index + 1}`}
                width={312}
                height={390}
                quality={70}
                loading="lazy"
              />
            </div>
            <div className="overley-info">
              <div className="add-cart"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(artwork.id, Object.keys(artwork.sizes_prices)[0]);
                }}>
                <span className="cart-shopping">
                  <i
                    className="reser-link"
                  >
                    <HiOutlineShoppingBag />
                  </i>
                </span>
                <span className="plus">
                  <i className="reser-link">
                    <GoPlus />
                  </i>
                </span>
              </div>
              <span className="heart">
                <Link
                  href="#"
                  className="reser-link"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleLike(artwork.id);
                  }}
                >
                  {likedArtworks.has(artwork.id) ? <FaHeart color="red" /> : <FaRegHeart />}
                </Link>
              </span>
              <div className="user-art">
                <div className="user-image">
                  <Image
                    src={item.artistImage}
                    alt="avatar"
                    width={50}
                    height={50}
                    quality={70}
                    loading="lazy"
                  />
                </div>
                <Link href={"/artist-profile?id=" + item.artist.id} className="reser-link">
                  <span>{item.artist}</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="photo-info">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <span>{item.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallary;
