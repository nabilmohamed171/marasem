"use client";
import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import Footer from "@/components/footer/Footer";
import Navbar_Home from "@/components/all-navbars/NavbarHome";
import Navbar_Buyer from "@/components/all-navbars/NavbarBuyer";
import Navbar from "@/components/all-navbars/NavbarArtists";
import FooterAccordion from "@/components/footer/FooterAccordion";
import SectionFavorites from "@/components/artistsProfile/favorites/Favorites";
import SectionSoldOut from "@/components/artistsProfile/soldOut/SoldOut";
import SectionGallery from "@/components/artistsProfile/gallery/Gallary";
import Link from "next/link";
import Image from "next/image";

import "./artist-profile.css";

const ArtistProfile = () => {
  const searchParams = useSearchParams();
  const artistId = searchParams.get("id"); // Extract artist ID from URL
  const [userType, setUserType] = useState("guest");
  const [artistData, setArtistData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("gallery");
  const [isFollowing, setIsFollowing] = useState(false);

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

  const handleMenuClick = useCallback((section) => {
    setActiveSection(section);
  }, []);

  useEffect(() => {
    if (!artistId) {
      setError("Artist ID is missing");
      setLoading(false);
      return;
    }

    const fetchArtistData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/artists/${artistId}`);
        setArtistData(response.data);
        setIsFollowing(response.data.artist.is_followed);
        setLoading(false);
      } catch (error) {
        setError("Artist not found");
        setLoading(false);
      }
    };

    fetchArtistData();
  }, [artistId]);

  const toggleFollow = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("User must be logged in to follow artists.");
      return;
    }

    try {
      const url = `http://127.0.0.1:8000/api/artists/${artistId}/follow`;
      if (isFollowing) {
        await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.post(url, {}, { headers: { Authorization: `Bearer ${token}` } });
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  if (loading) return <div>Loading artist profile...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <>
      {userType === "artist" ? (
        <Navbar />
      ) : userType === "buyer" ? (
        <Navbar_Buyer />
      ) : (
        <Navbar_Home />
      )}

      <div className="header-artist-profile">
        <div className="overley"></div>
        <Image
          src={artistData.artist.cover_img || "/images/header3.jpg"}
          alt="Artist Header"
          width={1920}
          height={200}
          quality={70}
          loading="lazy"
        />
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-3 col-12">
            <div className="artist-profile-info">
              <div className="row">
                <div className="col-md-12 col-3">
                  <div className="artist-photo">
                    <Image
                      src={artistData.artist.profile_picture || "/avatar.png"}
                      alt="Artist Avatar"
                      width={92}
                      height={92}
                      quality={70}
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="col-md-12 col-9">
                  <div className="art-name">
                    <h2>{artistData.artist.first_name} {artistData.artist.last_name}</h2>
                    {artistData.artist.artist_details.pickup_location &&
                      <span>
                        <FaMapMarkerAlt /> {artistData.artist.artist_details.pickup_location.city}, {artistData.artist.artist_details.pickup_location.zone}
                      </span>
                    }
                  </div>
                </div>
              </div>

              <div className="artist-name text-center">
                <div className="row">
                  <div className="col-md-12 col-8">
                    <button type="button" onClick={toggleFollow} className={isFollowing ? "follow-active" : ""}>
                      {isFollowing ? "UnFollow" : "+ Follow"}
                    </button>
                  </div>
                  {/* <div className="col-md-12 col-4">
                    <div className="dropdown-more-info-mobile d-block d-md-none">
                      <button
                        className="btn dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        aria-label="More options"
                      >
                        More Info
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <Link className="dropdown-item" href="#">
                            Action
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="#">
                            Another action
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="#">
                            Something else here
                          </Link>
                        </li>
                      </ul>
                      <span className="arrow-down-icon">
                        <IoIosArrowDown />
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>

              <div className="artist-public-info">
                <div className="row">
                  <div className="col-md-8">
                    <p>Project Views</p>
                    <p>Appreciations</p>
                    <p>Followers</p>
                    <p>Following</p>
                  </div>
                  <div className="col-md-4 number">
                    <p>{artistData.artwork_views}</p>
                    <p>{artistData.appreciations}</p>
                    <p>{artistData.artist.followers_count}</p>
                    <p>{artistData.artist.following_count}</p>
                  </div>
                </div>
              </div>

              <div className="about-me">
                <h2>About Me</h2>
                <p>{artistData.artist.artist_details.summary}</p>
              </div>

              <div className="tags">
                <h2>Focus</h2>
                {artistData.artist.subcategories.map((subcategory, index) => (
                  <span key={index}>{subcategory.name}</span>
                ))}
              </div>

              <p className="text-center member">
                MEMBER SINCE {new Date(artistData.artist.created_at).toLocaleDateString()}
              </p>

              {/* <div className="buttons">
                <div className="row">
                  <div className="col-md-5">
                    <button type="button" aria-label="Report Artist">
                      Report
                    </button>
                  </div>
                  <div className="col-md-2">
                    <div className="nav-hr"></div>
                  </div>
                  <div className="col-md-5">
                    <button type="button" aria-label="Block Artist">
                      Block
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          <div className="col-md-9">
            <div className="custom-mobile">
              <div className="links-profile">
                <div className="nav-scroll">
                  <ul className="nav">
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeSection === "gallery" ? "active-sub-menu" : ""
                          }`}
                        onClick={() => handleMenuClick("gallery")}
                      >
                        Gallery
                      </button>
                    </li>
                    {/* <li className="nav-item">
                      <Link
                        href="#"
                        className={`nav-link ${activeSection === "collections"
                          ? "active-sub-menu"
                          : ""
                          }`}
                        onClick={() => handleMenuClick("collections")}
                      >
                        Collections
                      </Link>
                    </li> */}
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeSection === "favorites" ? "active-sub-menu" : ""
                          }`}
                        onClick={() => handleMenuClick("favorites")}
                      >
                        Favorites
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeSection === "soldOut" ? "active-sub-menu" : ""
                          }`}
                        onClick={() => handleMenuClick("soldOut")}
                      >
                        Sold Out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {activeSection === "gallery" && <SectionGallery artworks={artistData.artworks} />}
              {activeSection === "favorites" && <SectionFavorites artworks={artistData.liked_artworks} />}
              {activeSection === "soldOut" && <SectionSoldOut artworks={artistData.sold_out_artworks} />}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <FooterAccordion />
    </>
  );
};

export default ArtistProfile;
