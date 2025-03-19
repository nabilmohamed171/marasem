"use client";
import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { LuMapPin } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { CgNotes } from "react-icons/cg";
import { TbCreditCard } from "react-icons/tb";
import { RiLogoutCircleRLine } from "react-icons/ri";
import PopupSearch from "@/components/popupSearch/PopupSearch";
import Image from "next/image";
import Link from "next/link";
import "./navbar.css";
import "./navbar-home.css";
import axios from "axios";

const Navbar_Home = () => {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [featuredCollections, setFeaturedCollections] = useState([]);

  const [isStickyNavbar, setIsStickyNavbar] = useState(false);
  const [isPopupSearchOpen, setIsPopupSearchOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  // Fetch filters (dynamic navigation data)
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

  const forYourBudgetLinks = [
    { name: "EGP 500 & Under", href: "#" },
    { name: "EGP 1,000 to 5,000", href: "#" },
    { name: "EGP 5,000 to 10,000", href: "#" },
    { name: "EGP 10,000 & Over", href: "#" },
  ];

  return (
    <nav
      className={`navbar navbar-expand-lg ${isStickyNavbar ? "sticky-navbar" : ""}`}
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
                                        href={`/product-list?subcategory=${subcat.id}`}
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
                            {forYourBudgetLinks.map((link) => (
                              <li key={link.name}>
                                <Link className="link-style" href={link.href}>
                                  {link.name}
                                </Link>
                              </li>
                            ))}
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
          <div className="nav-login">
            <Link className="art" href="/register?artist=true">
              Sell Your Artwork
            </Link>
            <Link className="login" href="/login">
              Login
            </Link>
          </div>

          <div className="nav-notification notification-home">
            <div className="notification-icon-react">
              <IoMdNotificationsOutline />
            </div>
            <div className="notification-number">
              <span>0</span>
            </div>
          </div>

          <div className="nav-cart">
            <div className="cart-icon-react">
              <CiShoppingCart />
            </div>
            <div className="cart-number">
              <span>0</span>
            </div>
          </div>
          <div className="home-menu-mobile">
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
                      <div className="col-7">
                        <Link className="art" href="/register">
                          Sell Your Artwork
                        </Link>
                      </div>
                      <div className="col-5">
                        <Link className="login" href="/login">
                          Login
                        </Link>
                      </div>
                    </div>
                    <div className="box-list-profile">
                      <ul className="list-unstyled">
                        <li className="cart-mobile">
                          <Link href="">
                            My Cart
                            <div className="cart-icon-mobile">
                              <CiShoppingCart />
                              <div className="cart-number-mobile">
                                <span>0</span>
                              </div>
                            </div>
                          </Link>
                        </li>
                        <li className="favorites-mobile">
                          <Link href="">
                            Favorites
                            <div className="favorites-icon-mobile">
                              <FaRegHeart />
                              <div className="favorites-number-mobile">
                                <span>0</span>
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
                        <Link href="">
                          Shop Art
                          <span className="arrow-icon-1">
                            <IoIosArrowForward />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="">
                          Collections
                          <span className="arrow-icon-2">
                            <IoIosArrowForward />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="">
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
                        <Link href="">
                          Addresses
                          <span className="addresses-icon">
                            <LiaMapMarkedAltSolid />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="">
                          Orders
                          <span className="order-icon">
                            <CgNotes />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="">
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
                    <span className="logout-icon">
                      <RiLogoutCircleRLine />
                    </span>
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isPopupSearchOpen && (
        <PopupSearch setIsPopupSearchOpen={setIsPopupSearchOpen} />
      )}
    </nav>
  );
};

export default Navbar_Home;
