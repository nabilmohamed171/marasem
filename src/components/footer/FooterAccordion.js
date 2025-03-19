// Accordion.js (مكون React)
"use client";
import { useState } from "react";
import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(1);
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="footer-mobile d-md-none d-sm-block">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="social-media">
                <div className="logo-image">
                  <Image
                    className="marasem-logo"
                    src="/images/main-logo.png"
                    alt="Marasem Logo"
                    width={122}
                    height={35}
                    quality={100}
                  />
                </div>
                <p>Art Finds a Home & Hearts Connect</p>
              </div>
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
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className={`accordion-button ${
                        openIndex === 1 ? "" : "collapsed"
                      }`}
                      type="button"
                      onClick={() => toggleAccordion(1)}
                      aria-expanded={openIndex === 1 ? "true" : "false"}
                      aria-controls="collapseOne"
                    >
                      COMPANY INFO
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className={`accordion-collapse collapse ${
                      openIndex === 1 ? "show" : ""
                    }`}
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body info-mobile">
                      <ul>
                        <li>
                          <a className="company-info-link" href="#">
                            About Marasem
                          </a>
                        </li>
                        <li>
                          <a className="company-info-link" href="#">
                            Terms And Conditions
                          </a>
                        </li>
                        <li>
                          <a className="company-info-link" href="#">
                            Privacy policy
                          </a>
                        </li>
                        <li>
                          <a className="company-info-link" href="#">
                            Return Policy
                          </a>
                        </li>
                        <li>
                          <a className="company-info-link" href="#">
                            Delivery Policy
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className={`accordion-button ${
                        openIndex === 2 ? "" : "collapsed"
                      }`}
                      type="button"
                      onClick={() => toggleAccordion(2)}
                      aria-expanded={openIndex === 2 ? "true" : "false"}
                      aria-controls="collapseTwo"
                    >
                      HELP & SUPPORT
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className={`accordion-collapse collapse ${
                      openIndex === 2 ? "show" : ""
                    }`}
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body help-mobile">
                      <ul>
                        <li>
                          <a className="help-link" href="#">
                            HELP & SUPPORT
                          </a>
                        </li>
                        <li>
                          <a className="help-link" href="#">
                            Returns
                          </a>
                        </li>
                        <li>
                          <a className="help-link" href="#">
                            FAQs
                          </a>
                        </li>
                        <li>
                          <a className="help-link" href="#">
                            Contact us
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className={`accordion-button ${
                        openIndex === 3 ? "" : "collapsed"
                      }`}
                      type="button"
                      onClick={() => toggleAccordion(3)}
                      aria-expanded={openIndex === 3 ? "true" : "false"}
                      aria-controls="collapseThree"
                    >
                      PAYMENT METHOD
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className={`accordion-collapse collapse ${
                      openIndex === 3 ? "show" : ""
                    }`}
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body payment">
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
            </div>
            <hr />
            <div className="social-media">
              <h4>Follow us</h4>
              <ul className="list-unstyled">
                <li>
                  <FaLinkedinIn />
                </li>
                <li>
                  <IoLogoInstagram />
                </li>
                <li>
                  <FaXTwitter />
                </li>
                <li>
                  <FaFacebookF />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* حقوق الطبع والنشر */}
      <hr />
      <div className="copyright-mobile d-md-none d-sm-block">
        <span>Marasem © 2024 All Right Reserved</span>
      </div>
    </>
  );
};

export default Accordion;
