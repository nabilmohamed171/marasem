"use client";
import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import "./sold-out.css";

const SoldOut = () => {
  const [favorites, setFavorites] = useState([
    {
      imageSrc: "/images/22.jpeg",
      name: "Artwork 1",
      price: "EGP 2,500",
      isFavorited: false,
      soldTo: "Ahmed Nasser",
    },
    {
      imageSrc: "/images/33.jpeg",
      name: "Lorem Ipsum",
      price: "EGP 2,500",
      isFavorited: false,
      soldTo: "Sara Ahmed",
    },
    {
      imageSrc: "/images/44.jpeg",
      name: "Lorem Ipsum",
      price: "EGP 2,500",
      isFavorited: false,
      soldTo: "Mohamed Ali",
    },
    {
      imageSrc: "/images/66.jpeg",
      name: "Lorem Ipsum",
      price: "EGP 2,500",
      isFavorited: false,
      soldTo: "Fatima Youssef",
    },
    {
      imageSrc: "/images/88.jpeg",
      name: "Lorem Ipsum",
      price: "EGP 2,500",
      isFavorited: false,
      soldTo: "Omar Khattab",
    },
    {
      imageSrc: "/images/77.jpeg",
      name: "Lorem Ipsum",
      price: "EGP 2,500",
      isFavorited: false,
      soldTo: "Laila Samir",
    },
  ]);
  const [likedArtworks, setLikedArtworks] = useState(new Set());

  useEffect(() => {
    const fetchLikedArtworks = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user/likes", {
          headers: { Authorization: `Bearer ${token}` },
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
              <div className="overley-sold-out"></div>
              <div className="photo">
                <Image
                  src={item.imageSrc}
                  alt={`Artwork ${index + 1}`}
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
                              toggleLike(artwork.id);
                            }}
                          >
                            {likedArtworks.has(artwork.id) ? <FaHeart color="red" /> : <FaRegHeart />}
                          </Link>
                        </span>
                <div className="sold-to">
                  <span className="current-owner">Current Owner</span>
                  <span>{item.soldTo}</span>
                </div>
              </div>
            </div>
            <div className="photo-info">
              <h2>{item.name}</h2>
              <p>Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,</p>
              <span>{item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoldOut;
