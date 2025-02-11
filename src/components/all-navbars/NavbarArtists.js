"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { CgNotes } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { TbCreditCard } from "react-icons/tb";
import { LuMapPin } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import PopupSearch from "@/components/popupSearch/PopupSearch";
import "./navbar.css";
import "./navbar-artist.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        isStickyNavbar ? "sticky-navbar" : ""
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

        <div
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active shop-art-menu" href="shop-art">
                SHOP ART
              </Link>
              <div className="main-dropmenu-navbar">
                <div className="dropmenu-navbar-blur">
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <div className="section-one">
                          <h4>Fine Art</h4>
                          <ul className="list-unstyled">
                            <li>
                              <Link className="link-style" href="#">
                                Paintings
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Drawings
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Sculptures
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Mosaic
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Collage Art
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Glass Art
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Ceramics
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col">
                        <div className="section-two">
                          <h4>Hand Crafts</h4>
                          <ul className="list-unstyled">
                            <li>
                              <Link className="link-style" href="#">
                                Wood Craft
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Leather Craft
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Pottery Craft
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Macrame
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Home Decor
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Jewelry & Accessories
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Fashion Art
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Furniture
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col">
                        <div className="section-three">
                          <h4>Digital Prints</h4>
                          <ul className="list-unstyled">
                            <li>
                              <Link className="link-style" href="#">
                                Paintings & Illustrations
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                3D Prints
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Designs
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Photography
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Illustration Books
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Printed Products
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col">
                        <div className="section-four">
                          <h4>For You</h4>
                          <ul className="list-unstyled">
                            <li>
                              <Link className="link-style" href="#">
                                Egyptians
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Vintage
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Modern
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Abstract
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Minimalist
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Pop Art
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Bohemian
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                Gifts
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col">
                        <div className="section-five">
                          <h4>For Your Budget</h4>
                          <ul className="list-unstyled">
                            <li>
                              <Link className="link-style" href="#">
                                EGP 500 & Under
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                EGP 1,000 to 5,000
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style" href="#">
                                EGP 5,000 to 10,000
                              </Link>
                            </li>
                            <li>
                              <Link className="link-style nav-color" href="#">
                                EGP 10,000 & Over
                              </Link>
                            </li>
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
            <Link className="art" href="/sell-your-artwork">
              Sell Your Artwork
            </Link>
          </div>
          <div className="nav-hr"></div>
          <div className="nav-artist">
            <div className="row">
              <div className="col">
                <div className="photo-artist">
                  <Image
                    className="photo-artist-img"
                    src="/images/avatar2.png"
                    alt="photo"
                    width={40}
                    height={40}
                    quality={100}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="col">
                <span>Hello Omar</span>
                <div class="dropdown">
                  <button
                    class="btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Your Account
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="#">
                        My Profile
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Favorites
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Addresses
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Orders
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Marasem Credit
                      </a>
                    </li>
                    <li>
                      <button type="button">Logout</button>
                    </li>
                  </ul>
                  <span className="arrow-down-icon">
                    <IoIosArrowDown />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="nav-hr"></div>
          <div className="nav-notification notification-artists">
            <div className="notification-icon-react">
              <IoMdNotificationsOutline />
            </div>
            <div className="notification-number">
              <span>0</span>
            </div>
          </div>
          <div className="nav-hr"></div>
          <div className="nav-cart">
            <div className="cart-icon-react">
              <CiShoppingCart />
            </div>
            <div className="cart-number">
              <span>0</span>
            </div>
          </div>

          <div className="artist-menu-mobile">
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
                            src="/images/avatar2.png"
                            alt="photo"
                            width={60}
                            height={60}
                            quality={100}
                            loading="lazy"
                            objectFit="cover"
                          />
                        </div>
                      </div>
                      <div className="col-7">
                        <div className="profile-name">
                          <h3>Omer Mohsen</h3>
                          <span>
                            <span className="map-icon">
                              <LuMapPin />
                            </span>{" "}
                            Cairo, Egypt
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
                    <div className="box-button-profile">
                      <Link className="" href="">
                        Sell Your Artwork
                      </Link>
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
}
