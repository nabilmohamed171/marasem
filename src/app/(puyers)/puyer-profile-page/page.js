"use client";
import { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { CgNotes } from "react-icons/cg";
import { TbCreditCard } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { GoPencil } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import FooterAccordion from "@/components/footer/FooterAccordion";
import SectionFavorites from "@/components/puyerProfile/favorites/Favorites";
import SectionFollowing from "@/components/puyerProfile/following/Following";
import SectionAddresses from "@/components/puyerProfile/addresses/Addresses";
import SectionOrders from "@/components/puyerProfile/orders/Orders";
import SectionCredit from "@/components/puyerProfile/credit/Credit";
import SectionCollections from "@/components/puyerProfile/collections/Collections";
import SectionEditProfile from "@/components/puyerProfile/editProfile/EditProfile";
import NavbarBuyer from "@/components/all-navbars/NavbarBuyer";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import Image from "next/image";
import "./profile.css";

const puyerProfilePage = () => {
  const [activeSection, setActiveSection] = useState("favorites");
  const [moreInfoActive, setMoreInfoActive] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(true);
  const [editPhotoProfileVisible, setEditPhotoProfileVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  const [avatar, setAvatar] = useState("/images/avatar2.png");

  const artistData = {
    name: "Nour Elmasry",
    location: "Cairo, Egypt",
    avatar: "/images/avatar2.png",
  };

  const itemsCount = {
    favorites: 737,
    following: 55,
    collections: 20,
    artists: 10,
  };

  useEffect(() => {
    setActiveSection("favorites");
  }, []);

  const handleMenuClick = (section) => {
    setActiveSection(section);
    if (section === "following") {
      setShowLinks(true);
    } else {
      setShowLinks(false);
    }
  };

  const handleMoreInfoClick = () => {
    setMoreInfoActive(!moreInfoActive);
  };

  const handleEditProfileClick = () => {
    setEditProfileVisible(false);
    setEditPhotoProfileVisible(true);
    setOverlayVisible(true);
    setActiveSection("editProfile");
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
      <NavbarBuyer />

      <div className="container">
        <div className="row">
          <div className="col-md-3 col-12">
            <div className="puyer-profile-info">
              <div className="row">
                <div className="col-md-12 col-3">
                  <div className="puyer-photo">
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

              <div className="puyer-name text-center">
                <div className="row">
                  <div className="col-md-12 col-6">
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
                  <div className="col-md-12 col-6">
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
                className={`box-orders-profile-page ${
                  moreInfoActive ? "d-block" : ""
                }`}
              >
                <div className="box-list-orders">
                  <ul className="list-unstyled">
                    <li
                      className={activeSection === "favorites" ? "active" : ""}
                    >
                      <Link
                        href="#"
                        onClick={() => handleMenuClick("favorites")}
                      >
                        Favorites{" "}
                        <span
                          className={`favorites-number ${
                            activeSection === "favorites" ? "active-color" : ""
                          }`}
                        >
                          {itemsCount.favorites}{" "}
                          <span className="arrow-next">
                            <IoIosArrowForward />
                          </span>
                        </span>
                      </Link>
                    </li>
                    <li
                      className={activeSection === "following" ? "active" : ""}
                    >
                      <Link
                        href="#"
                        onClick={() => handleMenuClick("following")}
                      >
                        Following{" "}
                        <span
                          className={`following-number ${
                            activeSection === "following" ? "active-color" : ""
                          }`}
                        >
                          {itemsCount.following}{" "}
                          <span className="arrow-next">
                            <IoIosArrowForward />
                          </span>
                        </span>
                      </Link>
                    </li>
                    <li
                      className={activeSection === "addresses" ? "active" : ""}
                    >
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
                    <li className={activeSection === "orders" ? "active" : ""}>
                      <Link href="#" onClick={() => handleMenuClick("orders")}>
                        <span className="order-icon">
                          <CgNotes />
                        </span>
                        Orders
                      </Link>
                    </li>
                    <li className={activeSection === "credit" ? "active" : ""}>
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
                  <ul className="nav none-nav d-lg-none d-md-none d-xl-none d-sm-block">
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
                          activeSection === "following" ? "active-sub-menu" : ""
                        }`}
                        onClick={() => handleMenuClick("following")}
                      >
                        Following
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="#"
                        className={`nav-link ${
                          activeSection === "addresses" ? "active-sub-menu" : ""
                        }`}
                        onClick={() => handleMenuClick("addresses")}
                      >
                        Addresses
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="#"
                        className={`nav-link ${
                          activeSection === "orders" ? "active-sub-menu" : ""
                        }`}
                        onClick={() => handleMenuClick("orders")}
                      >
                        Orders
                      </Link>
                    </li>
                  </ul>
                </div>
                <ul className="nav">
                  {showLinks && (
                    <>
                      <li className="nav-item">
                        <Link
                          href="#"
                          className={`nav-link nav-collections-artists-sm ${
                            activeSection === "collections"
                              ? "active-sub-menu"
                              : ""
                          }`}
                          onClick={() => handleMenuClick("collections")}
                        >
                          Collections{" "}
                          <span className="item-count">
                            ({itemsCount.collections})
                          </span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          href="#"
                          className={`nav-link nav-collections-artists-sm ${
                            activeSection === "artists" ? "active-sub-menu" : ""
                          }`}
                          onClick={() => handleMenuClick("following")}
                        >
                          Artists{" "}
                          <span className="item-count">
                            ({itemsCount.artists})
                          </span>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              {activeSection === "favorites" && <SectionFavorites />}
              {activeSection === "following" && <SectionFollowing />}
              {activeSection === "addresses" && <SectionAddresses />}
              {activeSection === "orders" && <SectionOrders />}
              {activeSection === "credit" && <SectionCredit />}
              {activeSection === "collections" && <SectionCollections />}
              {activeSection === "editProfile" && <SectionEditProfile />}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <FooterAccordion />
    </>
  );
};

export default puyerProfilePage;
