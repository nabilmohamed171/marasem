"use client";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer className="main-footer d-md-block d-sm-none">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="social-media">
                <div className="logo-image">
                  <Image
                    className="marasem-logo"
                    src="/images/main-logo.png"
                    alt="Marasem Logo"
                    width={122}
                    height={35}
                    quality={70}
                  />
                </div>
                <p>Art Finds a Home & Hearts Connect</p>
                <hr />
                <h4>Follow us</h4>
                <ul className="list-unstyled">
                  <li>
                    <Link
                      className="reser-link"
                      href="https://www.linkedin.com"
                      passHref
                    >
                      <FaLinkedinIn />
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="reser-link"
                      href="https://www.instagram.com"
                      passHref
                    >
                      <IoLogoInstagram />
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="reser-link"
                      href="https://twitter.com"
                      passHref
                    >
                      <FaXTwitter />
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="reser-link"
                      href="https://www.facebook.com"
                      passHref
                    >
                      <FaFacebookF />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <div className="company-info">
                <h2>COMPANY INFO</h2>
                <ul>
                  <li>
                    <Link className="reser-link" href="#" passHref>
                      <span className="company-info-link">About Marasem</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="reser-link" href="#" passHref>
                      <span className="company-info-link">
                        Terms And Conditions
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link className="reser-link" href="#" passHref>
                      <span className="company-info-link">Privacy policy</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="reser-link" href="#" passHref>
                      <span className="company-info-link">Return Policy</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="reser-link" href="#" passHref>
                      <span className="company-info-link">Delivery Policy</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <div className="help">
                <h2>HELP & SUPPORT</h2>
                <ul>
                  <li>
                    <Link className="reser-link" href="#" passHref>
                      <span className="help-link">HELP & SUPPORT</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="reser-link" href="#" passHref>
                      <span className="help-link">Returns</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="reser-link" href="#" passHref>
                      <span className="help-link">FAQs</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="reser-link" href="#" passHref>
                      <span className="help-link">Contact us</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div className="subscribe">
                <form>
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Type your email"
                      aria-label="Email"
                      required
                    />
                    <button className="btn btn-subscribe" type="submit">
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
              <div className="payment">
                <h3>PAYMENT METHOD</h3>
                <ul className="list-unstyled">
                  <li>
                    <Image
                      className="visa-image"
                      src="/images/visa.png"
                      alt="Visa"
                      width={68}
                      height={38}
                    />
                  </li>
                  <li>
                    <Image
                      className="visa2-image"
                      src="/images/card.png"
                      alt="Card"
                      width={49}
                      height={38}
                    />
                  </li>
                  <li>
                    <Image
                      className="valu-image"
                      src="/images/valu.png"
                      alt="Valu"
                      width={88}
                      height={38}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <hr />
      <div className="copyright d-md-block d-sm-none">
        <span>Marasem © 2024 All Right Reserved</span>
      </div>
    </>
  );
};

export default Footer;
