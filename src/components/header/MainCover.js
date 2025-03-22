"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import "./main-cover.css";
import axios from "axios";
import { useCart } from "@/context/CartContext"; // Import cart context

const MainCover = () => {
  const { setCartCount } = useCart();
  const [headerData, setHeaderData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  // Fetch header data from the backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/headers")
      .then((response) => {
        setHeaderData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching header data", error);
        setLoading(false);
      });
  }, []);

  if (loading || !headerData) {
    return <div>Loading...</div>;
  }

  // Destructure the header data
  const {
    cover_img,
    most_recent_artwork,
    featured_subcategories,
    featured_categories,
  } = headerData;

  // Use the first artwork from most_recent_artwork if available
  const recentArtwork = most_recent_artwork;

  const firstThreeCategories = featured_categories
    ? featured_categories.slice(0, 3)
    : [];

  return (
    <div className="cover-header">
      <div className="row">
        <div className="col-md-4">
          <div className="image-header full">
            <Link href={"/product-details?id=" + recentArtwork.id}>
              <Image
                className="full-image"
                src={cover_img} // Dynamic cover image from backend
                alt="Image 1"
                width={515}
                height={578}
                quality={70}
                loading="lazy"
              />
            </Link>
            <div className="full-info">
              <div className="container">
                <ul className="list-unstyled">
                  {featured_subcategories &&
                    featured_subcategories.slice(0, 3).map((subcat) => (
                      <li key={subcat.id} className="full-link">
                        <Link
                          className="reser-link"
                          href={`/shop-art?term=${subcat.name}`}
                        >
                          {subcat.name}
                        </Link>
                      </li>
                    ))}
                  <li className="full-link">
                    <Link className="reser-link" href="/shop-art">
                      & More
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="row">
            <div className="col-md-5">
              <div className="image-header small">
                <div className="overley"></div>
                <Link href={"/product-details?id=" + recentArtwork.id}>
                  {recentArtwork ? (
                    <Image
                      className="small-image"
                      src={recentArtwork.photos.length > 0 ? recentArtwork.photos[0] : "/images/22.jpeg"}
                      alt={recentArtwork.name}
                      width={500}
                      height={338}
                      quality={100}
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      className="small-image"
                      src="/images/22.jpeg"
                      alt="Small Image"
                      width={500}
                      height={338}
                      quality={100}
                      loading="lazy"
                    />
                  )}
                </Link>
                <div className="addons">
                  <div className="add-heart">
                    <span className="heart">
                      <FaRegHeart />
                    </span>
                  </div>
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
                </div>
                <div className="small-info">
                  <h4>{recentArtwork ? recentArtwork.name : "Artwork Title"}</h4>
                  <p>
                    {recentArtwork
                      ? `${Object.keys(recentArtwork.sizes_prices)[0]} - ${recentArtwork.description}`
                      : "Description here"}
                  </p>
                  <span>
                    {recentArtwork ? `EGP ${Object.values(recentArtwork.sizes_prices)[0]}` : ""}
                  </span>
                  <div className="user">
                    <div className="user-image">
                      <Link href={"/artist-profile?id=" + recentArtwork.artist.id}>
                        <Image
                          src={recentArtwork.artist ? recentArtwork.artist.profile_picture : "/images/avatar.avif"}
                          alt="User Avatar"
                          width={40}
                          height={40}
                          quality={100}
                          loading="lazy"
                        />
                      </Link>
                    </div>
                    <span>
                      {recentArtwork && recentArtwork.artist
                        ? `${recentArtwork.artist.first_name} ${recentArtwork.artist.last_name}`
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="image-header large">
                <Link href="#">
                  <Image
                    className="large-image"
                    src="/images/55.jpg"
                    alt="Large Image"
                    width={700}
                    height={338}
                    quality={70}
                    loading="lazy"
                  />
                </Link>
                <div className="large-info">
                  <h2>
                    <Link href="#">
                      SPECIAL <br /> COLLECTIONS
                    </Link>
                  </h2>
                </div>
              </div>
            </div>
            {firstThreeCategories.map((category) => (
              <div key={category.id} className="col-md-4">
                <div className="image-header x-small">
                  <div className="overley-o-b"></div>
                  <Link href={`/shop-art?term=${category.name}`}>
                    <Image
                      className="x-small-imge"
                      // Use a category image if available; otherwise use a default image.
                      src={category.picture ? category.picture : "/images/6.png"}
                      alt={category.name}
                      width={337}
                      height={220}
                      quality={50}
                      loading="lazy"
                    />
                  </Link>
                  <div className="x-small-info">
                    <h2>
                      <Link href={`/shop-art?term=${category.name}`}>
                        {category.name}
                      </Link>
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCover;
