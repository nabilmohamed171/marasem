"use client";
import { useState, useCallback } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import Footer from "@/components/footer/Footer";
import NavbarArtists from "@/components/all-navbars/NavbarArtists";
import FooterAccordion from "@/components/footer/FooterAccordion";
import SectionFavorites from "@/components/artistsProfile/favorites/Favorites";
import SectionSoldOut from "@/components/artistsProfile/soldOut/SoldOut";
import SectionGallery from "@/components/artistsProfile/gallery/Gallary";
import Link from "next/link";
import Image from "next/image";

import "./artist-profile.css";

const ArtistProfile = () => {
  const [activeSection, setActiveSection] = useState("gallery");
  const [isFollowing, setIsFollowing] = useState(false);

  const artistData = {
    name: "Nour Elmasry",
    location: "Cairo, Egypt",
    avatar: "/images/avatar2.png",
    headerImage: "/images/header3.jpg",
    stats: {
      projectViews: 5989,
      appreciations: 6403,
      followers: 3352,
      following: 1329,
    },
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s...",
    focus: ["Posters", "Painting", "Drawing"],
    memberSince: "DECEMBER 2, 2014",
  };

  const handleMenuClick = useCallback((section) => {
    setActiveSection(section);
  }, []);

  const toggleFollow = useCallback(() => {
    setIsFollowing((prev) => !prev);
  }, []);

  return (
    <>
      <NavbarArtists />

      <div className="header-artist-profile">
        <div className="overley"></div>
        <Image
          src={artistData.headerImage}
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
                      src={artistData.avatar}
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
                    <h2>{artistData.name}</h2>
                    <span>
                      <FaMapMarkerAlt /> {artistData.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="artist-name text-center">
                <div className="row">
                  <div className="col-md-12 col-8">
                    <button
                      type="button"
                      onClick={toggleFollow}
                      aria-label={
                        isFollowing ? "Unfollow Artist" : "Follow Artist"
                      }
                      className={isFollowing ? "follow-active" : ""}
                    >
                      {isFollowing ? "UnFollow" : "+ Follow"}
                    </button>
                  </div>
                  <div className="col-md-12 col-4">
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
                  </div>
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
                    <p>{artistData.stats.projectViews}</p>
                    <p>{artistData.stats.appreciations}</p>
                    <p>{artistData.stats.followers}</p>
                    <p>{artistData.stats.following}</p>
                  </div>
                </div>
              </div>

              <div className="about-me">
                <h2>About Me</h2>
                <p>{artistData.about}</p>
              </div>

              <div className="tags">
                <h2>Focus</h2>
                {artistData.focus.map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>

              <p className="text-center member">
                MEMBER SINCE {artistData.memberSince}
              </p>

              <div className="buttons">
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
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="custom-mobile">
              <div className="links-profile">
                <div className="nav-scroll">
                  <ul className="nav">
                    <li className="nav-item">
                      <Link
                        href="#"
                        className={`nav-link ${
                          activeSection === "gallery" ? "active-sub-menu" : ""
                        }`}
                        onClick={() => handleMenuClick("gallery")}
                      >
                        Gallery
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="#"
                        className={`nav-link ${
                          activeSection === "collections"
                            ? "active-sub-menu"
                            : ""
                        }`}
                        onClick={() => handleMenuClick("collections")}
                      >
                        Collections
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="#"
                        className={`nav-link ${
                          activeSection === "favorites" ? "active-sub-menu" : ""
                        }`}
                        onClick={() => handleMenuClick("favorites")}
                      >
                        Favorites
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="#"
                        className={`nav-link ${
                          activeSection === "soldOut" ? "active-sub-menu" : ""
                        }`}
                        onClick={() => handleMenuClick("soldOut")}
                      >
                        Sold Out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {activeSection === "gallery" && (
                <div className="collections-artist">
                  <SectionGallery />
                </div>
              )}
              {activeSection === "collections" && (
                <div className="collections-artist">
                  <SectionGallery />
                </div>
              )}
              {activeSection === "favorites" && (
                <div className="collections-favorites">
                  <SectionFavorites />
                </div>
              )}
              {activeSection === "soldOut" && (
                <div className="collections-sold-out">
                  <SectionSoldOut />
                </div>
              )}
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
