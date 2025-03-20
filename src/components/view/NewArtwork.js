"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Import both icons
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";
import "./most-views.css";
import axios from "axios";
import { useCart } from "@/context/CartContext"; // Import cart context

const NewArtwork = () => {
  const { setCartCount } = useCart();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedArtworks, setLikedArtworks] = useState(new Set());

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/latest-artworks?limit=6")
      .then((response) => {
        setArtworks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching latest artworks", error);
        setLoading(false);
      });
  }, []);

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

      // Fetch new cart count after adding item
      const response = await axios.get("http://127.0.0.1:8000/api/cart",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartCount(response.data.items_count);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) {
    return <div>Loading artworks...</div>;
  }

  return (
    <div className="new-artwork">
      <div className="container">
        <div className="see-all">
          <h2>New Artwork</h2>
          <Link href="/shoop-art">
            See All <IoIosArrowForward />
          </Link>
        </div>
        <div className="new-artwork">
          <Swiper
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 10 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className="mySwiper"
          >
            {artworks.map((artwork) => (
              <SwiperSlide key={artwork.id}>
                <div className="new-artwork-info">
                  <div className="image-card">
                    <Link href={artwork.productLink} className="reser-link">
                      <div className="overley"></div>
                      <div className="new-artwork-image">
                        <Image
                          src={artwork.photos[0]}
                          alt={artwork.title}
                          width={312}
                          height={390}
                          quality={70}
                          loading="lazy"
                        />
                      </div>
                    </Link>
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
                          <Link href={artwork.artistLink}>
                            <Image
                              src={artwork.artistImage}
                              alt="avatar"
                              width={50}
                              height={50}
                              quality={70}
                              loading="lazy"
                            />
                          </Link>
                        </div>
                        <Link href={artwork.artistLink} className="reser-link">
                          <span>{artwork.artistName}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <h2>{artwork.title}</h2>
                  <p>{artwork.description}</p>
                  {Object.values(artwork.sizes_prices)[0] ? (
                    <h3>
                      {"EGP " +
                        Number(Object.values(artwork.sizes_prices)[0]).toLocaleString("en-US")}
                    </h3>
                  ) : (
                    <h3>N/A</h3>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default NewArtwork;
