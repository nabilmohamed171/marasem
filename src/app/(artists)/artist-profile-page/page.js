"use client";
import { useState, useEffect, useCallback } from "react";
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
import Navbar_Home from "@/components/all-navbars/NavbarHome";
import Navbar_Buyer from "@/components/all-navbars/NavbarBuyer";
import Navbar from "@/components/all-navbars/NavbarArtists";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import Image from "next/image";
import "./profile.css";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const MyProfilePage = () => {
  const router = useRouter();
  const [userType, setUserType] = useState("guest");
  const [loading, setLoading] = useState(true);
  const [artistData, setArtistData] = useState(null);
  const [activeSection, setActiveSection] = useState("gallery");
  const [moreInfoActive, setMoreInfoActive] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [editCoverProfileVisible, setEditCoverProfileVisible] = useState(false);
  const [editPhotoProfileVisible, setEditPhotoProfileVisible] = useState(false);
  const [headerImage, setHeaderImage] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const searchParams = useSearchParams();
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveSection(tab);
    }
  }, [searchParams]);

  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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

  // Fetch the user type and redirect if not an artist
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
        console.log("User type:", response.data.user_type);
        setUserType(response.data.user_type);
        if (response.data.user_type !== "artist") {
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching user type:", error);
        if (error.response && error.response.status === 403) {
          router.push("/");
        }
      }
    };

    fetchUserType();
  }, [router]);

  // Fetch profile data only if user is an artist
  useEffect(() => {
    if (userType !== "artist") return;

    const fetchProfileData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/artist/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArtistData(response.data);
        setAvatar(response.data.artist.profile_picture);
        setHeaderImage(response.data.artist.cover_img);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching artist data:", err);
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [userType]);

  useEffect(() => {
    setActiveSection("gallery");
  }, []);

  const handleMenuClick = useCallback((section) => {
    setActiveSection(section);
  }, []);

  const handleMoreInfoClick = useCallback(() => {
    setMoreInfoActive((prev) => !prev);
  }, []);

  const handleEditProfileClick = useCallback(() => {
    setEditProfileVisible(false);
    setEditCoverProfileVisible(true);
    setEditPhotoProfileVisible(true);
    setOverlayVisible(true);
  }, []);

  const handleCoverImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const token = localStorage.getItem("authToken");
    const formData = new FormData();
    formData.append("cover_img", file);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/cover-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
      setHeaderImage(response.data.cover_img);
    } catch (error) {
      console.error("Error updating cover image:", error);
    }
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
      setAvatar(response.data.profile_picture);
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };


  if (loading) return <div>Loading profile...</div>;

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
          src={headerImage ?? "/images/header3.jpg"}
          alt="Artist Header"
          width={1920}
          height={200}
          quality={70}
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
          className={`edit-cover-profile ${editCoverProfileVisible ? "d-block" : "d-none"
            }`}
        >
          <span className="pen-icon">
            {" "}
            <GoPencil />
          </span>
          <span className="edit-cover">Edit Cover</span>
        </div>
      </div>

      <div className="container artists-profiles">
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
                      width={92}
                      height={92}
                      quality={70}
                      loading="lazy"
                    />
                    <div
                      className={`edit-photo-profile ${editPhotoProfileVisible ? "d-block" : "d-none"
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
                    <h2>{artistData.artist.first_name} {artistData.artist.last_name}</h2>
                    <span>
                      <FaMapMarkerAlt /> {artistData.artist.artist_details.pickup_location.city} {artistData.artist.artist_details.pickup_location.zone}
                    </span>
                  </div>
                </div>
              </div>

              <div className="artist-name text-center">
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
                        className={`button-more-info ${moreInfoActive ? "active-more-info" : ""
                          }`}
                        type="button"
                        aria-expanded="false"
                        aria-label="More options"
                        onClick={handleMoreInfoClick}
                      >
                        More Info
                        <span
                          className={`arrow-down-icon ${moreInfoActive ? "active-more-info" : ""
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
                className={`artist-public-info ${moreInfoActive ? "d-block" : ""
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
                    <p>{artistData.insights.project_views}</p>
                    <p>{artistData.insights.appreciations}</p>
                    <p>{artistData.insights.followers}</p>
                    <p>{artistData.insights.following}</p>
                  </div>
                </div>
              </div>

              <div
                className={`box-orders-profile-page ${moreInfoActive ? "d-block" : ""
                  }`}
              >
                <div className="box-list-orders">
                  <ul className="list-unstyled">
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

              {editProfileVisible && (
                <>
                  <div
                    className={`about-me ${moreInfoActive ? "d-block" : ""}`}
                  >
                    <h2>About Me</h2>
                    <p>{artistData.artist.artist_details.summary}</p>
                  </div>

                  <div className={`tags ${moreInfoActive ? "d-block" : ""}`}>
                    <h2>Focus</h2>
                    {artistData.artist.subcategories.map((tag, index) => (
                      <span key={index}>{tag.name}</span>
                    ))}
                  </div>

                  <p className="text-center member">
                    MEMBER SINCE {new Date(artistData.artist.created_at).toLocaleDateString()}
                  </p>
                </>
              )}

              <div className={`buttons ${moreInfoActive ? "d-block" : ""}`}>
                <div className="row">
                  <div className="col-md-12 text-center">
                    <div className="button-logout"
                      onClick={handleLogout}>
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
          </div>

          <div className="col-md-9">
            <div className="custom-mobile">
              <div className="links-profile">
                <div className="nav-scroll">
                  <ul className="nav">
                    <li className="nav-item">
                      <Link
                        href="#"
                        className={`nav-link ${activeSection === "gallery" ? "active-sub-menu" : ""
                          }`}
                        onClick={() => handleMenuClick("gallery")}
                      >
                        Gallery
                      </Link>
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
                      <Link
                        href="#"
                        className={`nav-link ${activeSection === "toDo" ? "active-sub-menu" : ""
                          }`}
                        onClick={() => handleMenuClick("toDo")}
                      >
                        To Do <span className="todo-count-number">({artistData.insights.to_do_count ?? 0})</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="#"
                        className={`nav-link ${activeSection === "favorites" ? "active-sub-menu" : ""
                          }`}
                        onClick={() => handleMenuClick("favorites")}
                      >
                        Favorites
                        <span className="favorites-count-number"> ({artistData.liked_artworks.length})</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="#"
                        className={`nav-link ${activeSection === "insights" ? "active-sub-menu" : ""
                          }`}
                        onClick={() => handleMenuClick("insights")}
                      >
                        Insights
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="#"
                        className={`nav-link ${activeSection === "draft" ? "active-sub-menu" : ""
                          }`}
                        onClick={() => handleMenuClick("draft")}
                      >
                        Draft
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="#"
                        className={`nav-link ${activeSection === "soldOut" ? "active-sub-menu" : ""
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
                  <SectionGallery artworks={artistData.artworks} />
                </div>
              )}
              {/* {activeSection === "collections" && (
                <div className="collections-artist">
                  <SectionCollections />
                </div>
              )} */}
              {activeSection === "favorites" && (
                <div className="collections-favorites">
                  <SectionFavorites artworks={artistData.liked_artworks} />
                </div>
              )}
              {activeSection === "soldOut" && (
                <div className="collections-sold-out">
                  <SectionSoldOut artworks={artistData.sold_out_artworks} />
                </div>
              )}
              {activeSection === "toDo" && (
                <div className="collections-to-do">
                  <SectionToDo toDo={artistData.to_do} />
                </div>
              )}
              {activeSection === "draft" && (
                <div className="collections-draft">
                  <SectionDraft drafts={artistData.drafts} />
                </div>
              )}
              {activeSection === "insights" && (
                <div className="collections-insights">
                  <SectionInsights insights={artistData} />
                </div>
              )}
              {activeSection === "editProfile" && (
                <div className="collections-edit-profile">
                  <SectionEditProfile data={artistData.artist} />
                </div>
              )}
              {activeSection === "addresses" && (
                <div className="collections-addresses">
                  <SectionAddresses pickup={artistData.artist.artist_details.pickup_location} addresses={artistData.artist.addresses} />
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
