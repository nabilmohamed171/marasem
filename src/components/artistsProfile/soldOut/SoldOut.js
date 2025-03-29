"use client";
import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import "./sold-out.css";
import axios from "axios";

const SoldOut = ({ artworks }) => {
  console.log(artworks);
  const [soldOutArtworks, setSoldOutArtworks] = useState(artworks);
  const [likedArtworks, setLikedArtworks] = useState(new Set());

  // Fetch liked artworks on mount
  useEffect(() => {
    const fetchLikedArtworks = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/user/likes",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        // Assuming response.data.likedArtworks is an array of artwork IDs
        setLikedArtworks(new Set(response.data.likedArtworks));
      } catch (error) {
        console.error("Error fetching liked artworks:", error);
      }
    };
    fetchLikedArtworks();
  }, []);

  // Handle liking an artwork
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
        await axios.delete(url, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setLikedArtworks((prev) => {
          const newSet = new Set(prev);
          newSet.delete(artworkId);
          return newSet;
        });
      } else {
        await axios.post(
          url,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setLikedArtworks((prev) => new Set(prev).add(artworkId));
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="collections-artist">
      <div className="row">
        {soldOutArtworks.map((item) => (
          <div key={item.id} className="col-md-4 col-6">
            <div className="item-image">
              <div className="overley-sold-out"></div>
              <div className="photo">
                <Image
                  src={item.artwork.photos[0]} // Use first image from photos array
                  alt={item.artwork.name}
                  width={312}
                  height={390}
                  quality={70}
                />
              </div>
              <div className="overley-info-sold-out">
                <div className="add-cart">
                  <span className="sold-out">Sold Out</span>
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
                    {likedArtworks.has(item.id) ? (
                      <FaHeart color="red" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </Link>
                </span>
                <div className="sold-to">
                  <span className="current-owner">Current Owner</span>
                  <span>{item.artwork.sold_to || "N/A"}</span>
                </div>
              </div>
            </div>
            <div className="photo-info">
              <h2>{item.artwork.name}</h2>
              <p>{item.artwork.description}</p>
              <span>
                EGP{" "}
                {Object.values(item.artwork.sizes_prices)[0]
                  ? Number(Object.values(item.artwork.sizes_prices)[0]).toLocaleString("en-US")
                  : "N/A"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoldOut;
