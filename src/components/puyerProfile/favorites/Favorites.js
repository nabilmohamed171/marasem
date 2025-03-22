"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const Favorites = ({ items }) => {
  const { setCartCount } = useCart();
  const [favorites, setFavorites] = useState(items);
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
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const response = await axios.get("http://127.0.0.1:8000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
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
        });
        setLikedArtworks(new Set(response.data.likedArtworks));
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

  return (
    <div className="collections-artist">
      <div className="row">
        {favorites.map((item, index) => (
          <div key={index} className="col-md-4 col-6">
            <div className="item-image">
              <div className="overley"></div>
              <div className="photo">
                <Image
                  src={item.photos[0]}
                  alt={`Artwork ${index + 1}`}
                  width={312}
                  height={390}
                  quality={70}
                  loading="lazy"
                />
              </div>
              <div className="overley-info">
                <div
                  className="add-cart"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(item.id, Object.keys(item.sizes_prices)[0]);
                  }}
                >
                  <span className="cart-shopping">
                    <HiOutlineShoppingBag />
                  </span>
                  <span className="plus">
                    <GoPlus />
                  </span>
                </div>
                <span className="heart">
                  <Link
                    href="#"
                    className="reser-link"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleLike(item.id);
                    }}
                  >
                    {likedArtworks.has(item.id) ? <FaHeart color="red" /> : <FaRegHeart />}
                  </Link>
                </span>
                <div className="user-art">
                  <div className="user-image">
                    <Image
                      src={item.artist.profile_picture}
                      alt="artist avatar"
                      width={50}
                      height={50}
                      quality={70}
                      loading="lazy"
                    />
                  </div>
                  <Link href={"/artist-profile?id=" + item.artist.id} className="reser-link">
                    <span>{`${item.artist.first_name} ${item.artist.last_name}`}</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="photo-info">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <span>{`EGP ${item.min_price}`}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
