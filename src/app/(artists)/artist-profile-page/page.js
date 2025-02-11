"use client";
import { useState, useEffect } from "react";
import NavbarArtists from "@/components/navbar/NavbarArtists";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/footer/Footer";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { CgNotes } from "react-icons/cg";
import { TbCreditCard } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { GoPencil } from "react-icons/go";
import FooterAccordion from "@/components/footer/FooterAccordion";
import SectionFavorites from "@/components/artistsProfile/favorites/Favorites";
import SectionSoldOut from "@/components/artistsProfile/soldOut/SoldOut";
import SectionGallery from "@/components/artistsProfile/gallery/Gallary";
import SectionToDo from "@/components/artistsProfile/toDo/ToDo";
import SectionDraft from "@/components/artistsProfile/draft/Draft";
import SectionInsights from "@/components/artistsProfile/insights/Insights";
import SectionEditProfile from "@/components/artistsProfile/edit-profile-artist/EditProfile";
import SectionOrders from "@/components/artistsProfile/orders/Orders";
import SectionCredit from "@/components/artistsProfile/credit/Credit";
import SectionCollections from "@/components/artistsProfile/collections/Collections";
import SectionAddresses from "@/components/artistsProfile/addresses/Addresses";
import "./profile.css";

const MyProfilePage = () => {
  const [activeSection, setActiveSection] = useState("gallery");
  const [moreInfoActive, setMoreInfoActive] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(true);
  const [editCoverProfileVisible, setEditCoverProfileVisible] = useState(false);
  const [editPhotoProfileVisible, setEditPhotoProfileVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const [avatar, setAvatar] = useState("/images/avatar2.png");
  const [headerImage, setHeaderImage] = useState("/images/header3.jpg");

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

  useEffect(() => {
    setActiveSection("gallery");
  }, []);

  const handleMenuClick = (section) => {
    setActiveSection(section);
  };

  const handleMoreInfoClick = () => {
    setMoreInfoActive(!moreInfoActive);
  };

  const handleEditProfileClick = () => {
    setEditProfileVisible(false);
    setEditCoverProfileVisible(true);
    setEditPhotoProfileVisible(true);
    setOverlayVisible(true);
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeaderImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <NavbarArtists />

      <div className="header-artist-profile">
        <div className="overley"></div>
        <Image
          src={headerImage}
          alt="Artist Header"
          width={1920}
          height={600}
          quality={100}
          loading="lazy"
        />
        <form className="upload-cover-profile">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleCoverImageChange}
          />
        </form>

        <div
          className={`edit-cover-profile ${
            editCoverProfileVisible ? "d-block" : "d-none"
          }`}
        >
          <span className="pen-icon">
            {" "}
            <GoPencil />
          </span>
          <span className="edit-cover">Edit Cover</span>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-3 col-12">
            <div className="artist-profile-info">
              <div className="row">
                <div className="col-md-12 col-3">
                  <div className="artist-photo">
                    <div
                      className="overley"
                      style={{ display: overlayVisible ? "block" : "none" }}
                    ></div>
                    <Image
                      src={avatar}
                      alt="Artist Avatar"
                      width={150}
                      height={150}
                      loading="lazy"
                      quality={100}
                    />
                    <div
                      className={`edit-photo-profile ${
                        editPhotoProfileVisible ? "d-block" : "d-none"
                      }`}
                    >
                      <form className="upload-photo-profile">
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={handleAvatarImageChange}
                        />
                      </form>
                      <span className="pen-icon">
                        <GoPencil />
                      </span>
                      <span className="edit">Edit</span>
                    </div>
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
                    {editProfileVisible && (
                      <button
                        type="button"
                        aria-label="Edit Profile"
                        className="edit-profile-button"
                        onClick={() => {
                          handleEditProfileClick();
                          handleMenuClick("editProfile");
                        }}
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                  <div className="col-md-12 col-4">
                    <div className="d-block d-md-none">
                      <button
                        className={`button-more-info ${
                          moreInfoActive ? "active-more-info" : ""
                        }`}
                        type="button"
                        aria-expanded="false"
                        aria-label="More options"
                        onClick={handleMoreInfoClick}
                      >
                        More Info
                        <span
                          className={`arrow-down-icon ${
                            moreInfoActive ? "active-more-info" : ""
                          }`}
                        >
                          <IoIosArrowDown />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`artist-public-info ${
                  moreInfoActive ? "d-block" : ""
                }`}
              >
                <div className="row">
                  <div className="col-md-8 col-6">
                    <p>Project Views</p>
                    <p>Appreciations</p>
                    <p>Followers</p>
                    <p>Following</p>
                  </div>
                  <div className="col-md-4 col-6 number">
                    <p>{artistData.stats.projectViews}</p>
                    <p>{artistData.stats.appreciations}</p>
                    <p>{artistData.stats.followers}</p>
                    <p>{artistData.stats.following}</p>
                  </div>
                </div>
              </div>

              <div
                className={`box-orders-profile-page ${
                  moreInfoActive ? "d-block" : ""
                }`}
              >
                <div className="box-list-orders">
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        href="#"
                        onClick={() => handleMenuClick("addresses")}
                      >
                        <span className="addresses-icon">
                          <LiaMapMarkedAltSolid />
                        </span>
                        Addresses
                      </Link>
                    </li>
                    <li>
                      <Link href="#" onClick={() => handleMenuClick("orders")}>
                        <span className="order-icon">
                          <CgNotes />
                        </span>
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link href="#" onClick={() => handleMenuClick("credit")}>
                        <span className="credit-icon">
                          <TbCreditCard />
                        </span>
                        Mrasem Credit
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {editProfileVisible && (
                <>
                  <div
                    className={`about-me ${moreInfoActive ? "d-block" : ""}`}
                  >
                    <h2>About Me</h2>
                    <p>{artistData.about}</p>
                  </div>

                  <div className={`tags ${moreInfoActive ? "d-block" : ""}`}>
                    <h2>Focus</h2>
                    {artistData.focus.map((tag, index) => (
                      <span key={index}>{tag}</span>
                    ))}
                  </div>

                  <p className="text-center member">
                    MEMBER SINCE {artistData.memberSince}
                  </p>
                </>
              )}

              <div className={`buttons ${moreInfoActive ? "d-block" : ""}`}>
                <div className="row">
                  <div className="col-md-12 text-center">
                    <button
                      className="logout"
                      type="button"
                      aria-label="Logout"
                    >
                      <span className="logout-icon">
                        <RiLogoutCircleRLine />
                      </span>
                      Logout
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
                          activeSection === "toDo" ? "active-sub-menu" : ""
                        }`}
                        onClick={() => handleMenuClick("toDo")}
                      >
                        To Do
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
                          activeSection === "insights" ? "active-sub-menu" : ""
                        }`}
                        onClick={() => handleMenuClick("insights")}
                      >
                        Insights
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="#"
                        className={`nav-link ${
                          activeSection === "draft" ? "active-sub-menu" : ""
                        }`}
                        onClick={() => handleMenuClick("draft")}
                      >
                        Draft
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
                  <SectionCollections />
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
              {activeSection === "toDo" && (
                <div className="collections-to-do">
                  <SectionToDo />
                </div>
              )}
              {activeSection === "draft" && (
                <div className="collections-draft">
                  <SectionDraft />
                </div>
              )}
              {activeSection === "insights" && (
                <div className="collections-insights">
                  <SectionInsights />
                </div>
              )}
              {activeSection === "editProfile" && (
                <div className="collections-edit-profile">
                  <SectionEditProfile />
                </div>
              )}
              {activeSection === "addresses" && (
                <div className="collections-addresses">
                  <SectionAddresses />
                </div>
              )}
              {activeSection === "orders" && (
                <div className="collections-orders">
                  <SectionOrders />
                </div>
              )}
              {activeSection === "credit" && (
                <div className="collections-credit">
                  <SectionCredit />
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

export default MyProfilePage;
