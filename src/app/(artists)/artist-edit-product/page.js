"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Navbar from "@/components/all-navbars/NavbarArtists";
import Footer from "@/components/footer/Footer";
import FooterAccordion from "@/components/footer/FooterAccordion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import "./artist-edit-product.css";
import { Router } from "next/router";

const ArtistEditProduct = () => {
  const searchParams = useSearchParams();
  const artworkId = searchParams.get("id"); // Get artwork ID from URL
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("story");
  const [mainImage, setMainImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!artworkId) return;

    const fetchArtwork = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/artworks/${artworkId}/view`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.artist.id != JSON.parse(localStorage.getItem("user"))["id"]) {
          window.location.href = "/";
        }
        setArtwork(response.data);
        setMainImage(response.data.photos[0]); // Set first image as default
        setLoading(false);
      } catch (error) {
        console.error("Error fetching artwork details:", error);
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [artworkId]);

  const handleTabClick = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const handleImageClick = useCallback((imageSrc) => {
    setMainImage(imageSrc);
  }, []);

  const handleNext = useCallback(() => {
    if (!artwork) return;
    const newIndex = (currentIndex + 1) % artwork.photos.length;
    setCurrentIndex(newIndex);
    setMainImage(artwork.photos[newIndex]);
  }, [currentIndex, artwork]);

  const handlePrevious = useCallback(() => {
    if (!artwork) return;
    const newIndex = (currentIndex - 1 + artwork.photos.length) % artwork.photos.length;
    setCurrentIndex(newIndex);
    setMainImage(artwork.photos[newIndex]);
  }, [currentIndex, artwork]);

  if (loading) {
    return <div>Loading artwork details...</div>;
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="all-artworks-user">
          <span className="prev">
            <Link className="reser-link" href="/artist-profile-page">
              <IoIosArrowBack />
            </Link>
          </span>
          <div className="container-all-artworks-user">
            <div className="path">
              <p>
                <Link className="reser-link" href="/artist-profile-page">
                  My Artworks
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
                    <div className="image">
                      <Image
                        src={mainImage}
                        alt="Main artwork"
                        width={475}
                        height={475}
                        quality={70}
                        className="flex-r-image"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-5 col-12">
                  <div className="art-user">
                    <div className="row">
                      <div className="col-md-6 col-6">
                        <div className="user-name">
                          <Image
                            src={artwork.artist.profile_picture}
                            alt="Artist Avatar"
                            width={50}
                            height={50}
                            quality={70}
                            className="flex-r-image"
                            loading="lazy"
                          />
                        </div>
                        <span>
                          {artwork.artist.first_name} {artwork.artist.last_name}
                        </span>
                      </div>
                      <div className="col-md-6 col-6">
                        <div className="buttons-follow">
                          <Link href={`/edit-artwork?id=${artwork.id}`}>
                            <button className="edit-artwork">Edit Artwork
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="image-heading">
                    <h2>{artwork.name} - {artwork.art_type}</h2>
                    <p>Dimensions: {Object.keys(artwork.sizes_prices)[0]}</p>
                    <p className="custom">
                      {artwork.artwork_status !== "ready_to_ship"
                        ? "This artwork is customizable"
                        : "This artwork is ready to ship"}
                    </p>
                  </div>
                  <div className="price-custom">
                    <div className="row">
                      <div className="col-12">
                        <p>Price</p>
                        <h3>EGP {Object.values(artwork.sizes_prices)[0]}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="image-story-tap">
                    <div className="tabs">
                      <button
                        className={`tab-link ${activeTab === "story" ? "active" : ""}`}
                        onClick={() => handleTabClick("story")}
                      >
                        Story
                      </button>
                      <button
                        className={`tab-link ${activeTab === "specifications" ? "active" : ""}`}
                        onClick={() => handleTabClick("specifications")}
                      >
                        Specifications
                      </button>
                    </div>
                    <div
                      className={`tab-content ${activeTab === "story" ? "active" : ""}`}
                      id="story-content"
                      style={{ display: activeTab === "story" ? "block" : "none" }}
                    >
                      <p>{artwork.description}</p>
                    </div>

                    <div
                      className={`tab-content ${activeTab === "specifications" ? "active" : ""}`}
                      id="specifications-content"
                      style={{ display: activeTab === "specifications" ? "block" : "none" }}
                    >
                      <table className="table table-striped table-dark">
                        <tbody>
                          <tr>
                            <td>Variant</td>
                            <td>{artwork.art_type}</td>
                          </tr>
                          <tr>
                            <td>Type</td>
                            <td>{artwork.medium}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
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

export default ArtistEditProduct;
