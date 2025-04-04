"use client";
import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { LuMapPin } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { CgNotes } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { TbCreditCard } from "react-icons/tb";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import PopupSearch from "@/components/popupSearch/PopupSearch";
import Image from "next/image";
import Link from "next/link";
import "./navbar.css";
import "./navbar-puyer.css";
import axios from "axios";
import { useRouter } from "next/navigation"; // For navigation after logout
import { useCart } from "@/context/CartContext";

const Navbar_Buyer = () => {
  const router = useRouter();
  const [user, setUser] = useState({}); // Store user data
  const { cartCount } = useCart();
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [featuredCollections, setFeaturedCollections] = useState([]);
  const [isStickyNavbar, setIsStickyNavbar] = useState(false);
  const [isPopupSearchOpen, setIsPopupSearchOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [likedArtworks, setLikedArtworks] = useState(new Set());

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchClick = () => {
    setIsPopupSearchOpen((prevState) => !prevState);
  };

  const handleScroll = () => {
    const navbar = document.querySelector(".navbar");
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > navbar.offsetTop) {
      setIsStickyNavbar(true);
    } else {
      setIsStickyNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        const userData = response.data;
        setUser(userData.user);
        setNotificationsCount(userData.notifications_count || 0);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/filters")
      .then((response) => {
        const data = response.data;
        setFeaturedCategories(data.featured_categories);
        setFeaturedCollections(data.featured_collections);
      })
      .catch((err) => {
        console.error("Error fetching filters:", err.response || err);
      });
  }, []);

  useEffect(() => {
    const fetchLikedArtworks = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user/likes", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setLikedArtworks(new Set(response.data.likedArtworks)); // ✅ Store IDs as a Set
      } catch (error) {
        console.error("Error fetching liked artworks:", error);
      }
    };
    fetchLikedArtworks();
  }, []);

  const forYourBudgetLinks = [
    { name: "EGP 500 & Under", href: "#" },
    { name: "EGP 1,000 to 5,000", href: "#" },
    { name: "EGP 5,000 to 10,000", href: "#" },
    { name: "EGP 10,000 & Over", href: "#" },
  ];

  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      localStorage.removeItem("authToken"); // ✅ Remove token from localStorage
      setUser({}); // Clear user state
      if (window.location.pathname === "/") {
        window.location.reload(); // ✅ Refresh if already on homepage
      } else {
        router.push("/"); // ✅ Redirect if not on homepage
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${isStickyNavbar ? "sticky-navbar" : ""
        }`}
    >
      <div className="container">
        <Link className="navbar-brand logo-pc" href="/">
          <img
            src="/images/main-logo.png"
            alt="main logo"
            className="d-inline-block align-text-top "
          />
        </Link>

        <Link className="navbar-brand logo-mobile" href="/">
          <img
            src="/images/marasem logo.png"
            alt="main logo"
            className="d-inline-block align-text-top"
          />
        </Link>

        <h2 className="type-page">marasem</h2>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="btn-mobile">
            {isOpen ? <IoClose /> : <HiOutlineBars3BottomRight />}
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active shop-art-menu"
                href="/shop-art"
                aria-current="page"
              >
                SHOP ART
              </Link>
              <div className="main-dropmenu-navbar">
                <div className="dropmenu-navbar-blur">
                  <div className="container">
                    <div className="row">
                      {featuredCategories.length > 0 ? (
                        featuredCategories.map((category) => (
                          <div key={category.id} className="col">
                            <div className="section-featured-category">
                              <h4>{category.name}</h4>
                              <ul className="list-unstyled">
                                {category.subcategories &&
                                  category.subcategories.map((subcat) => (
                                    <li key={subcat.id}>
                                      <Link
                                        className="link-style"
                                        href={`/shop-art?term=${subcat.name}`}
                                      >
                                        {subcat.name}
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        ))
                      ) : (
                        // Optionally, render a fallback if dynamic data isn't available.
                        <div className="col">
                          <div className="section-featured-category">
                            <h4>Loading...</h4>
                          </div>
                        </div>
                      )}
                      <div className="col">
                        <div className="section-featured-collections">
                          <h4>For You</h4>
                          <ul className="list-unstyled">
                            {featuredCollections &&
                              featuredCollections.map((collection) => (
                                <li key={collection.id}>
                                  <Link
                                    className="link-style"
                                    href={`/collections?id=${collection.id}`}
                                  >
                                    {collection.title}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col">
                        <div className="section-five">
                          <h4>For Your Budget</h4>
                          <ul className="list-unstyled">
                            {forYourBudgetLinks.map((link) => {
                              const params = new URLSearchParams();
                              params.set('price', link.name);
                              return (
                                <li key={link.name}>
                                  <Link className="link-style" href={`/shop-art?${params.toString()}`}>
                                    {link.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <Link className="nav-link" href="/shop-artist">
                ARTISTS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/event">
                EVENTS
              </Link>
            </li>
          </ul>

          <div className="nav-search" onClick={handleSearchClick}>
            <IoIosSearch />
          </div>
          <div className="nav-hr"></div>
          <div className="nav-buyer">
            <div className="row">
              <div className="col">
                <div className="your-name-account">
                  <span className="hello-name">Hello {user.first_name}</span>
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Your Account
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="/puyer-profile-page">
                          My Profile
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/puyer-profile-page?tab=favorites">
                          Favorites
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/puyer-profile-page?tab=addresses">
                          Addresses
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/puyer-profile-page?tab=orders">
                          Orders
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/puyer-profile-page?tab=credit">
                          Marasem Credit
                        </a>
                      </li>
                      <li>
                        <button type="button" onClick={handleLogout}>Logout</button>
                      </li>
                    </ul>
                    <span className="arrow-down-icon">
                      <IoIosArrowDown />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="nav-hr"></div>
          <div className="nav-notification notification-buyer">
            <div className="notification-icon-react">
              <IoMdNotificationsOutline />
            </div>
            <div className="notification-number">
              <span>0</span>
            </div>
          </div>
          <div className="nav-hr"></div>
          <Link href="/cart">
            <div className="nav-cart">
              <div className="cart-icon-react">
                <CiShoppingCart />
              </div>
              <div className="cart-number">
                <span>{cartCount}</span>
              </div>
            </div>
          </Link>
          <div className="puyer-menu-mobile">
            <div className="container">
              <div className="box-menu">
                <div className="box-search">
                  <form className="form-search">
                    <span className="search-icon-mobile">
                      <IoIosSearch />
                    </span>
                    <input placeholder="Search by"></input>
                  </form>
                </div>
                <div className="box-profile">
                  <div className="profile">
                    <div className="row">
                      <div className="col-2">
                        <div className="profile-image">
                          <Image
                            className="photo-profile-img"
                            src={user.profile_picture ?? "/images/avatar2.png"}
                            alt="photo"
                            width={60}
                            height={60}
                            quality={70}
                            loading="lazy"
                            objectFit="cover"
                          />
                        </div>
                      </div>
                      <div className="col-7">
                        <div className="profile-name">
                          <h3>{user.first_name + " " + user.last_name}</h3>
                          <span>
                            <span className="map-icon">
                              <LuMapPin />
                            </span>{" "}
                            {user.city} {user.zone}
                          </span>
                        </div>
                      </div>
                      <div className="col-3">
                        <span className="arrow-icon">
                          <IoIosArrowForward />
                        </span>
                      </div>
                    </div>
                    <div className="box-list-profile">
                      <ul className="list-unstyled">
                        <li className="cart-mobile">
                          <Link href="/cart">
                            My Cart
                            <div className="cart-icon-mobile">
                              <CiShoppingCart />
                              <div className="cart-number-mobile">
                                <span>{cartCount}</span>
                              </div>
                            </div>
                          </Link>
                        </li>
                        <li className="favorites-mobile">
                          <Link href="/puyer-profile-page?tab=favorites">
                            Favorites
                            <div className="favorites-icon-mobile">
                              <FaRegHeart />
                              <div className="favorites-number-mobile">
                                <span>{likedArtworks.size}</span>
                              </div>
                            </div>
                          </Link>
                        </li>
                        <li className="notification-mobile">
                          <Link href="">
                            Notification
                            <div className="notification-icon-mobile">
                              <IoMdNotificationsOutline />
                              <div className="notification-number-mobile">
                                <span>0</span>
                              </div>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="box-collection">
                  <div className="box-list-collection">
                    <ul className="list-unstyled">
                      <li>
                        <Link href="/shop-art">
                          Shop Art
                          <span className="arrow-icon-1">
                            <IoIosArrowForward />
                          </span>
                        </Link>
                      </li>
                      {/* <li>
                        <Link href="">
                          Collections
                          <span className="arrow-icon-2">
                            <IoIosArrowForward />
                          </span>
                        </Link>
                      </li> */}
                      <li>
                        <Link href="/artists">
                          Artists
                          <span className="arrow-icon-3">
                            <IoIosArrowForward />
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="box-orders">
                  <div className="box-list-orders">
                    <ul className="list-unstyled">
                      <li>
                        <Link href="/puyer-profile-page?tab=addresses">
                          Addresses
                          <span className="addresses-icon">
                            <LiaMapMarkedAltSolid />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/puyer-profile-page?tab=orders">
                          Orders
                          <span className="order-icon">
                            <CgNotes />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/puyer-profile-page?tab=credit">
                          Mrasem Credit
                          <span className="credit-icon">
                            <TbCreditCard />
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="box-button-logout">
                  <Link className="" href="">
                    <button type="button" className="logout-btn" onClick={handleLogout}>
                      <RiLogoutCircleRLine /> Logout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isPopupSearchOpen && <PopupSearch />}
    </nav>
  );
};

export default Navbar_Buyer;
