"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { CgNotes } from "react-icons/cg";
import { TbCreditCard } from "react-icons/tb";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { GoPencil } from "react-icons/go";
import FooterAccordion from "@/components/footer/FooterAccordion";
import SectionFavorites from "@/components/puyerProfile/favorites/Favorites";
import SectionFollowing from "@/components/puyerProfile/following/Following";
import SectionAddresses from "@/components/puyerProfile/addresses/Addresses";
import SectionOrders from "@/components/puyerProfile/orders/Orders";
import SectionCredit from "@/components/puyerProfile/credit/Credit";
import SectionCollections from "@/components/puyerProfile/collections/Collections";
import SectionEditProfile from "@/components/puyerProfile/editProfile/EditProfile";
import Navbar_Home from "@/components/all-navbars/NavbarHome";
import Navbar_Buyer from "@/components/all-navbars/NavbarBuyer";
import Navbar from "@/components/all-navbars/NavbarArtists";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import Image from "next/image";
import "./profile.css";
import { useRouter } from "next/navigation";

const PuyerProfilePage = () => {
  const router = useRouter();
  const [userType, setUserType] = useState("guest");
  const [accountData, setAccountData] = useState(null);
  const [loadingAccount, setLoadingAccount] = useState(true);
  const [activeSection, setActiveSection] = useState("favorites");
  const [moreInfoActive, setMoreInfoActive] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(true);
  const [editPhotoProfileVisible, setEditPhotoProfileVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [avatar, setAvatar] = useState("/images/avatar2.png");

  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem("authToken");
      if (window.location.pathname === "/") {
        window.location.reload();
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
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
        if (response.data.user_type === "artist") {
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching user type:", error);
      }
    };
    fetchUserType();
  }, [router]);

  useEffect(() => {
    const fetchAccountData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user/account", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setAccountData(response.data);
        setAvatar(response.data.user.profile_picture);
        console.log("Account data:", response.data);
        setLoadingAccount(false);
      } catch (error) {
        console.error("Error fetching account data:", error);
        setLoadingAccount(false);
      }
    };
    fetchAccountData();
  }, []);

  useEffect(() => {
    setActiveSection("favorites");
  }, []);

  const handleMenuClick = (section) => {
    setActiveSection(section);
    setShowLinks(section === "following");
  };

  const handleMoreInfoClick = () => {
    setMoreInfoActive((prev) => !prev);
  };

  const handleEditProfileClick = () => {
    setEditProfileVisible(false);
    setEditPhotoProfileVisible(true);
    setOverlayVisible(true);
    setActiveSection("editProfile");
  };

  const handleAvatarImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const token = localStorage.getItem("authToken");
    const formData = new FormData();
    formData.append("profile_picture", file);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
      // Update the profile picture state with the new picture URL from the response
      setAvatar(response.data.profile_picture);
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  if (loadingAccount) return <div>Loading profile...</div>;

  const favoritesCount = accountData.orders ? accountData.orders.length : 0;
  const followingCount = accountData.followed_artists ? accountData.followed_artists.length : 0;
  const collectionsCount = accountData.followed_collections ? accountData.followed_collections.length : 0;
  const artistsCount = followingCount;

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
        <div className="row">
          <div className="col-md-3 col-12">
            <div className="puyer-profile-info">
              <div className="row">
                <div className="col-md-12 col-3">
                  <div className="puyer-photo">
                    <div className="overley" style={{ display: overlayVisible ? "block" : "none" }}></div>
                    <Image
                      src={avatar}
                      alt="Profile Avatar"
                      width={92}
                      height={92}
                      quality={70}
                      loading="lazy"
                    />
                    <div className={`edit-photo-profile ${editPhotoProfileVisible ? "d-block" : "d-none"}`}>
                      <form className="upload-photo-profile">
                        <input type="file" name="image" accept="image/*" onChange={handleAvatarImageChange} />
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
                    <h2>{accountData.user.first_name} {accountData.user.last_name}</h2>
                    <span>
                      <FaMapMarkerAlt /> {accountData.user.main_address?.city} {accountData.user.main_address?.zone}
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
                        className={`button-more-info ${moreInfoActive ? "active-more-info" : ""}`}
                        type="button"
                        aria-expanded="false"
                        aria-label="More options"
                        onClick={handleMoreInfoClick}
                      >
                        More Info
                        <span className={`arrow-down-icon ${moreInfoActive ? "active-more-info" : ""}`}>
                          <IoIosArrowDown />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`box-orders-profile-page ${moreInfoActive ? "d-block" : ""}`}>
                <div className="box-list-orders">
                  <ul className="list-unstyled">
                    <li className={activeSection === "favorites" ? "active" : ""}>
                      <Link href="#" onClick={() => handleMenuClick("favorites")}>
                        Favorites{" "}
                        <span className={`favorites-number ${activeSection === "favorites" ? "active-color" : ""}`}>
                          {accountData.liked_artworks.length}{" "}
                          <span className="arrow-next">
                            <IoIosArrowForward />
                          </span>
                        </span>
                      </Link>
                    </li>
                    <li className={activeSection === "following" ? "active" : ""}>
                      <Link href="#" onClick={() => handleMenuClick("following")}>
                        Following{" "}
                        <span className={`following-number ${activeSection === "following" ? "active-color" : ""}`}>
                          {accountData.followed_artists.length}{" "}
                          <span className="arrow-next">
                            <IoIosArrowForward />
                          </span>
                        </span>
                      </Link>
                    </li>
                    <li className={activeSection === "addresses" ? "active" : ""}>
                      <Link href="#" onClick={() => handleMenuClick("addresses")}>
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
                    <div className="button-logout" onClick={handleLogout}>
                      <button className="logout" type="button" aria-label="Logout">
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
          </div>

          <div className="col-md-9">
            <div className="custom-mobile">
              <div className="links-profile">
                <div className="nav-scroll">
                  <ul className="nav none-nav d-lg-none d-md-none d-xl-none d-sm-block">
                    <li className="nav-item">
                      <Link
                        href="#"
                        className={`nav-link ${activeSection === "favorites" ? "active-sub-menu" : ""}`}
                        onClick={() => handleMenuClick("favorites")}
                      >
                        Favorites
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="#"
                        className={`nav-link ${activeSection === "following" ? "active-sub-menu" : ""}`}
                        onClick={() => handleMenuClick("following")}
                      >
                        Following
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="#"
                        className={`nav-link ${activeSection === "addresses" ? "active-sub-menu" : ""}`}
                        onClick={() => handleMenuClick("addresses")}
                      >
                        Addresses
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="#"
                        className={`nav-link ${activeSection === "orders" ? "active-sub-menu" : ""}`}
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
                          className={`nav-link nav-collections-artists-sm ${activeSection === "artists" ? "active-sub-menu" : ""}`}
                          onClick={() => handleMenuClick("following")}
                        >
                          Artists{" "}
                          <span className="item-count">({artistsCount})</span>
                        </Link>
                      </li>
                      {/* <li className="nav-item">
                        <Link
                          href="#"
                          className={`nav-link nav-collections-artists-sm ${activeSection === "collections" ? "active-sub-menu" : ""}`}
                          onClick={() => handleMenuClick("collections")}
                        >
                          Collections{" "}
                          <span className="item-count">({collectionsCount})</span>
                        </Link>
                      </li> */}
                    </>
                  )}
                </ul>
              </div>
              {activeSection === "favorites" && <SectionFavorites items={accountData.liked_artworks} />}
              {activeSection === "following" && <SectionFollowing data={accountData.followed_artists} />}
              {activeSection === "addresses" && <SectionAddresses addresses={accountData.addresses} />}
              {activeSection === "orders" && <SectionOrders />}
              {activeSection === "credit" && <SectionCredit />}
              {/* {activeSection === "collections" && <SectionCollections data={accountData.followed_collections} />} */}
              {activeSection === "editProfile" && <SectionEditProfile data={accountData.user} />}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <FooterAccordion />
    </>
  );
};

export default PuyerProfilePage;
