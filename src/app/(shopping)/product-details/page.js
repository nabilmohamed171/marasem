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

const AllArtworks = () => {
  const [userType, setUserType] = useState("guest");

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
  const [activeTab, setActiveTab] = useState("story");
  const [isCustomizeVisible, setIsCustomizeVisible] = useState(false);
  const [mainImage, setMainImage] = useState("/images/88.jpeg");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFollowActive, setIsFollowActive] = useState(false);
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleCustomizeArtwork = () => {
    setIsCustomizeVisible(!isCustomizeVisible);
  };

  const handleImageClick = (imageSrc) => {
    setMainImage(imageSrc);
  };

  const thumbnails = [
    "/images/88.jpeg",
    "/images/view 1.png",
    "/images/view 2.png",
    "/images/view 3.png",
  ];

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % thumbnails.length;
    setCurrentIndex(newIndex);
    setMainImage(thumbnails[newIndex]);
  };

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    setCurrentIndex(newIndex);
    setMainImage(thumbnails[newIndex]);
  };

  const handleFollowClick = () => {
    setIsFollowActive(!isFollowActive);
  };

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

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
                <Link className="reser-link" href="/collections">
                  All Artworks
                </Link>
                <IoIosArrowForward />
                <Link className="reser-link" href="/artist-profile">
                  Omer Mohsen
                </Link>
                <IoIosArrowForward />
                <span className="main-color"> Balzi Rossi</span>
              </p>
            </div>
            <div className="all-artworks">
              <div className="row">
                <div className="col-md-2 col-12 d-none d-md-block">
                  <div className="left-images">
                    {thumbnails.map((src, index) => (
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
                      src={mainImage}
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
                            src="/images/avatar2.png"
                            alt="Avatar"
                            width={50}
                            height={50}
                            quality={70}
                            className="flex-r-image"
                            loading="lazy"
                          />
                        </div>
                        <span>
                          <Link className="reser-link" href="/artist-profile">
                            Omer Mohsen
                          </Link>
                        </span>
                      </div>
                      <div className="col-md-6 col-6">
                        <div className="buttons-follow">
                          <span
                            className={`icon-heart ${isHeartFilled ? "filled" : ""
                              }`}
                            onClick={handleHeartClick}
                          >
                            {isHeartFilled ? <FaHeart /> : <FaRegHeart />}
                          </span>
                          <button
                            className={isFollowActive ? "follow-active" : ""}
                            onClick={handleFollowClick}
                          >
                            {isFollowActive ? "Unfollow" : "+ Follow"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="image-heading">
                    <h2>Balzi Rossi Oil Painting</h2>
                    <p>20 x 29 x 3.5 cm , 2024 , 48/58 Lnk On Paper</p>
                  </div>
                  <div className="price-custom">
                    <div className="row">
                      <div className="col-md-4 col-4">
                        <p>Price</p>
                        <h3>EGP 2.500</h3>
                      </div>
                      <div className="col-md-8 col-12">
                        <div className="custom-buttons">
                          <button onClick={toggleCustomizeArtwork}>
                            Customize
                          </button>

                          <button disabled>
                            <Link href="/cart"></Link>Own It
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
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                      </p>
                      <p>
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
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
                            <td>Variant</td>
                            <td>Oil Painting</td>
                          </tr>
                          <tr>
                            <td>Type</td>
                            <td>Lace, Leather</td>
                          </tr>
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

      <CardsAllartworks />

      {isCustomizeVisible && <CustomizeArtwork />}

      <Footer />
      <FooterAccordion />
    </>
  );
};

export default AllArtworks;
