import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Import both icons
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import { HiDotsHorizontal } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import "./cards-allartworks.css";
import { useSearchParams } from "next/navigation";

const CardsAllartworks = ({ stickyArtwork }) => {
  const searchParams = useSearchParams();
  const artworkId = searchParams.get("id");
  const [likedArtworks, setLikedArtworks] = useState(new Set());
  const [relatedArtworks, setRelatedArtworks] = useState([]);

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

  useEffect(() => {
    if (!artworkId) return;

    const fetchRelatedArtworks = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/artworks/${artworkId}/related`);
        setRelatedArtworks(response.data.related_artworks);
      } catch (error) {
        console.error("Error fetching related artworks:", error);
      }
    };

    fetchRelatedArtworks();
  }, [artworkId]);

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
    <div className="cards-allartworks">
      <div className="container">
        <h2>Related Artworks</h2>
        <div className="row">
          <div className="col-md-9">
            <div className="row">
              {relatedArtworks.map((artwork) => (
                <div key={artwork.id} className="col-md-4 col-6">
                  <div className="card-image">
                    <div className="overley"></div>
                    <Image
                      src={artwork.photos[0]}
                      alt={artwork.name}
                      width={312}
                      height={390}
                      quality={70}
                      loading="lazy"
                    />
                    <div className="overley-info">
                      <div className="add-cart">
                        <span className="cart-shopping main-color">
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
                            toggleLike(artwork.id);
                          }}
                        >
                          {likedArtworks.has(artwork.id) ? <FaHeart color="red" /> : <FaRegHeart />}
                        </Link>
                      </span>
                      <div className="user-art">
                        <div className="user-image">
                          <Image
                            src={artwork.artist.profile_picture}
                            alt={artwork.artist.first_name}
                            width={50}
                            height={50}
                            quality={70}
                            loading="lazy"
                          />
                        </div>
                        <span>{artwork.artist.first_name} {artwork.artist.last_name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-info">
                    <h2>{artwork.name}</h2>
                    <p>{artwork.description}</p>
                    <h3>EGP {Number(Object.values(artwork.sizes_prices)[0]).toLocaleString("en-US")}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-3 col-12">
            {stickyArtwork && (
              <div className="fixed-card d-md-block d-sm-none">
                <div className="main-image">
                  <Image
                    src={stickyArtwork.photos[0]}
                    alt={stickyArtwork.name}
                    width={312}
                    height={390}
                    quality={70}
                    loading="lazy"
                  />
                  <div className="info-card">
                    <h2>{stickyArtwork.name}</h2>
                    <span>{stickyArtwork.art_type}</span>
                    <p>{stickyArtwork.description}</p>
                    <p className="price">EGP {Object.values(stickyArtwork.sizes_prices)[0]}</p>
                    <hr />
                    <div className="row">
                      <div className="col-md-6">
                        <h4 className="fees">Fees</h4>
                      </div>
                      {/* <div className="col-md-6">
                        <p className="value-fees">2%</p>
                      </div> */}
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-md-6">
                        <h4 className="total-price">Total Price</h4>
                      </div>
                      <div className="col-md-6">
                        <p className="value-total-price">
                          {Number(Object.values(stickyArtwork.sizes_prices)[0]).toLocaleString("en-US")}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      {/* <div className="col-md-2">
                        <span className="pars-icon">
                          <HiDotsHorizontal />
                        </span>
                      </div> */}
                      <div className="col-md-12">
                        <button className="btn-own">Own It</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsAllartworks;
