"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Navbar_Home from "@/components/all-navbars/NavbarHome";
import Navbar_Buyer from "@/components/all-navbars/NavbarBuyer";
import Navbar from "@/components/all-navbars/NavbarArtists";
import FilterPc from "@/components/filterPc/FilterPc";
import CardsAllartworks from "@/components/cardsAllArtworks/CardsAllartworks";
import Footer from "@/components/footer/Footer";
import FooterAccordion from "@/components/footer/FooterAccordion";
import CustomizeArtwork from "@/components/customizeArtwork/CustomizeArtwork";
import FindMobile from "@/components/filterMobile/FindMobile";
import Image from "next/image";
import Link from "next/link";
import "./product-details.css";
import { useSearchParams } from "next/navigation";

const AllArtworks = () => {
  const searchParams = useSearchParams();
  const artworkId = searchParams.get("id"); // Get artwork ID from URL
  const [userType, setUserType] = useState(null);
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [isCustomizeVisible, setIsCustomizeVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("story");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mainImage, setMainImage] = useState(null);
  const [isFollowActive, setIsFollowActive] = useState(false);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    if (!artworkId) return;

    const fetchArtwork = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/artworks/${artworkId}/view`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setArtwork(response.data);
        setMainImage(response.data.photos[0]); // Set first image as default
        setLiked(response.data.liked); // Set like status
        setFollowed(response.data.artist.followed);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching artwork details:", error);
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [artworkId]);

  const toggleLike = async (artworkId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("User not authenticated");
      return;
    }
    const isLiked = liked;
    try {
      if (isLiked) {
        await axios.delete(`http://127.0.0.1:8000/api/artworks/${artworkId}/like`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setLiked(false);
      } else {
        await axios.post(`http://127.0.0.1:8000/api/artworks/${artworkId}/like`, {}, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setLiked(true);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const toggleFollow = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("User not authenticated");
      return;
    }
    try {
      if (followed) {
        await axios.post(`http://127.0.0.1:8000/api/artists/${artwork.artist.id}/unfollow`, {}, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setFollowed(false);
      } else {
        await axios.post(`http://127.0.0.1:8000/api/artists/${artwork.artist.id}/follow`, {}, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setFollowed(true);
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  useEffect(() => {
    const fetchUserType = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user-type", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          withCredentials: true,
        });
        setUserType(response.data.user_type);
      } catch (error) {
        console.error("Error fetching user type:", error);
      }
    };

    fetchUserType();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleCustomizeArtwork = () => {
    setIsCustomizeVisible(!isCustomizeVisible);
  };

  const handleImageClick = (imageSrc) => {
    setMainImage(imageSrc);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % artwork.photos;
    setCurrentIndex(newIndex);
    setMainImage(artwork.photos[newIndex]);
  };

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + artwork.photos.length) % artwork.photos.length;
    setCurrentIndex(newIndex);
    setMainImage(artwork.photos[newIndex]);
  };

  if (loading) {
    return <div>Loading artwork details...</div>;
  }
  return (
    <>
      {userType === "artist" ? (
        <Navbar />
      ) : userType === "buyer" ? (
        <Navbar_Buyer />
      ) : (
        <Navbar_Home />
      )}

      <div className="container">
        <div className="all-artworks-user">
          <span className="prev">
            <Link className="reser-link" href="/collections">
              <IoIosArrowBack />
            </Link>
          </span>
          <div className="container-all-artworks-user">
            <div className="path">
              <p>
                <Link className="reser-link" href="/shop-art">
                  All Artworks
                </Link>
                <IoIosArrowForward />
                <Link className="reser-link" href={"/artist-profile?id=" + artwork.artist.id}>
                  {artwork.artist.first_name + " " + artwork.artist.last_name}
                </Link>
                <IoIosArrowForward />
                <span className="main-color">{artwork.name}</span>
              </p>
            </div>
            <div className="all-artworks">
              <div className="row">
                <div className="col-md-2 col-12 d-none d-md-block">
                  <div className="left-images">
                    {artwork.photos.map((src, index) => (
                      <div
                        key={index}
                        className="images"
                        onClick={() => handleImageClick(src)}
                      >
                        <Image
                          src={src}
                          alt={`Artwork view ${index + 1}`}
                          width={150}
                          height={108}
                          quality={70}
                          className="flex-r-image"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-md-5 col-12">
                  <div className="main-image">
                    <div className="slider-buttons">
                      <button onClick={handlePrevious} className="prev-button">
                        <IoIosArrowBack />
                      </button>
                      <button onClick={handleNext} className="next-button">
                        <IoIosArrowForward />
                      </button>
                    </div>
                    <Image
                      src={artwork.photos[0]}
                      alt="Main artwork"
                      width={395}
                      height={475}
                      quality={70}
                      className="flex-r-image"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="col-md-5 col-12">
                  <div className="art-user">
                    <div className="row">
                      <div className="col-md-6 col-6">
                        <div className="user-name">
                          <Image
                            src={artwork.artist.profile_picture}
                            alt="Avatar"
                            width={50}
                            height={50}
                            quality={70}
                            className="flex-r-image"
                            loading="lazy"
                          />
                        </div>
                        <span>
                          <Link className="reser-link" href={"/artist-profile?id=" + artwork.artist.id}>
                            {artwork.artist.first_name + " " + artwork.artist.last_name}
                          </Link>
                        </span>
                      </div>
                      <div className="col-md-6 col-6">
                        <div className="buttons-follow">
                          <span className="icon-heart" onClick={() => toggleLike(artwork.id)}>
                            {liked ? <FaHeart color="red" /> : <FaRegHeart />}
                          </span>
                          <button className={followed ? "follow-active" : ""} onClick={toggleFollow}>
                            {followed ? "Unfollow" : "+ Follow"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="image-heading">
                    <h2>{artwork.name}</h2>
                    <p>{Object.keys(artwork.sizes_prices)[0]}</p>
                  </div>
                  <div className="price-custom">
                    <div className="row">
                      <div className="col-md-4 col-4">
                        <p>Price</p>
                        <h3>EGP {Object.values(artwork.sizes_prices)[0]}</h3>
                      </div>
                      <div className="col-md-8 col-12">
                        <div className="custom-buttons">
                          {artwork.artwork_status !== "ready_to_ship" ? (
                            <button onClick={toggleCustomizeArtwork}>
                              Customize
                            </button>
                          ) : (
                            ""
                          )}

                          <button>
                            <Link href="/cart" style={{ color: "inherit", textDecoration: "none" }}>Own It</Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="image-story-tap">
                    <div className="tabs">
                      <button
                        className={`tab-link ${activeTab === "story" ? "active" : ""
                          }`}
                        onClick={() => handleTabClick("story")}
                      >
                        Story
                      </button>
                      <button
                        className={`tab-link ${activeTab === "specifications" ? "active" : ""
                          }`}
                        onClick={() => handleTabClick("specifications")}
                      >
                        Specifications
                      </button>
                    </div>
                    <div
                      className={`tab-content ${activeTab === "story" ? "active" : ""
                        }`}
                      id="story-content"
                      style={{
                        display: activeTab === "story" ? "block" : "none",
                      }}
                    >
                      <p>
                        {artwork.description}
                      </p>
                    </div>

                    <div
                      className={`tab-content ${activeTab === "specifications" ? "active" : ""
                        }`}
                      id="specifications-content"
                      style={{
                        display:
                          activeTab === "specifications" ? "block" : "none",
                      }}
                    >
                      <table className="table table-striped table-dark">
                        <tbody>
                          <tr>
                            <td>Artwork Type</td>
                            <td>{artwork.art_type}</td>
                          </tr>
                          {artwork.artwork_status !== "ready_to_ship" && (
                            <tr>
                              <td>Customization Duration</td>
                              <td>{artwork.duration}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <FindMobile />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FilterPc />

      <CardsAllartworks stickyArtwork={artwork} />

      {isCustomizeVisible && <CustomizeArtwork artwork={artwork} />}

      <Footer />
      <FooterAccordion />
    </>
  );
};

export default AllArtworks;
