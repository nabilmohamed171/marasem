"use client";
import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";
import "./navbar.css";

const Navbar_Home = () => {
  const [isStickyNavbar, setIsStickyNavbar] = useState(false);

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
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="btn-mobile">
            <HiOutlineBars3BottomRight />
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active shop-art-menu"
                href="/product-list"
                aria-current="page"
              >
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
              <Link className="nav-link" href="/collections">
                COLLECTIONS
              </Link>
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

          <div className="nav-search">
            <IoIosSearch />
          </div>
          <div className="nav-login">
            <Link className="art" href="/share-artwork">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar_Home;
