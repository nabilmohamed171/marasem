"use client";
import DropFlag from "@/components/dropFlags/DropFlags";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import "./edit-profile.css";

const EditProfile = () => {
  const [activeItems, setActiveItems] = useState([]);

  const handleItemClick = (index) => {
    setActiveItems((prevActiveItems) => {
      if (prevActiveItems.includes(index)) {
        return prevActiveItems.filter((item) => item !== index);
      } else {
        return [...prevActiveItems, index];
      }
    });
  };

  return (
    <div className="section-edit-profile">
      <form className="form-edit-profile">
        <div className="row">
          <div className="col-4">
            <h2>General Info</h2>
          </div>
          <div className="col-8">
            <div className="button-reset-update">
              <button type="button" className="reset">
                Reset
              </button>
              <button type="button" className="update">
                Save Update
              </button>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="general-info">
              <div className="first-name">
                <label htmlFor="firstName" className="form-label">
                  First name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Omar"
                />
              </div>
              <div className="dropdown-country">
                <div className="dropdown-flags-create-account">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <DropFlag onChange={(country) => console.log(country)} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="last-name">
              <label htmlFor="lastName" className="form-label">
                Last name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Mohsen"
              />
            </div>
            <div className="email-address">
              <label htmlFor="emailAddress" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="emailAddress"
                placeholder="o.m.elkhodty@gmail.com"
              />
            </div>
            <button type="button" className="change-password">
              Change Password
            </button>
          </div>
        </div>
      </form>
      <form className="form-edit-about-me">
        <div className="about-me">
          <div className="row">
            <div className="col-4">
              <h2>About Me</h2>
            </div>
            <div className="col-8">
              <div className="button-reset-update">
                <button type="button" className="reset">
                  Reset
                </button>
                <button type="button" className="update">
                  Save Update
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="text-erea">
                <label>Summary</label>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a Summary here"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="social-media">
                <label htmlFor="socialMedia" className="form-label">
                  Social media Link
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="socialMedia"
                  placeholder="https://www.behance.net/omer"
                />
              </div>
              <div className="instagram">
                <label htmlFor="Instagram" className="form-label">
                  Instagram
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="Instagram"
                  placeholder="https://www.instagram.net/omer"
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="portofolio">
                <label htmlFor="portofolio" className="form-label">
                  Portofolio
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="portofolio"
                  placeholder="https://www.portofolio.net/omer"
                />
              </div>
              <div className="other-social">
                <label htmlFor="otherSocial" className="form-label">
                  Other Social Media
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="otherSocial"
                  placeholder="https://"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      <form className="form-pickup-location">
        <div className="pickup-location">
          <div className="row">
            <div className="col-4">
              <h2>Pickup Location</h2>
            </div>
            <div className="col-8">
              <div className="button-reset-update">
                <button type="button" className="reset">
                  Reset
                </button>
                <button type="button" className="update">
                  Save Update
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-6">
              <div className="dropdown-selected">
                <label>City</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option defaultValue>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <span>
                  <IoIosArrowDown />
                </span>
              </div>
            </div>
            <div className="col-md-6 col-6">
              <div className="dropdown-selected">
                <label>Zone</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option defaultValue>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <span>
                  <IoIosArrowDown />
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="text-erea">
                <label>Address Details</label>
                <div className="form-floating address-details">
                  <textarea
                    className="form-control"
                    placeholder="87 at, Sakanat Elmaadi, 10th floor, building 8."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <form className="form-focus">
        <div className="focus">
          <div className="row">
            <div className="col-4">
              <h2>Focus</h2>
            </div>
            <div className="col-8">
              <div className="button-reset-update">
                <button type="button" className="reset">
                  Reset
                </button>
                <button type="button" className="update">
                  Save Update
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="fine-art">
                <p>Paintings, Wood Craft, Digital Painting, Photography</p>
                <h3>Fine Art</h3>
                <ul>
                  <li
                    onClick={() => handleItemClick(1)}
                    className={activeItems.includes(1) ? "active" : ""}
                  >
                    Painting
                  </li>
                  <li
                    onClick={() => handleItemClick(2)}
                    className={activeItems.includes(2) ? "active" : ""}
                  >
                    drawing
                  </li>
                  <li
                    onClick={() => handleItemClick(3)}
                    className={activeItems.includes(3) ? "active" : ""}
                  >
                    mosaic
                  </li>
                  <li
                    onClick={() => handleItemClick(4)}
                    className={activeItems.includes(4) ? "active" : ""}
                  >
                    soulptures
                  </li>
                  <li
                    onClick={() => handleItemClick(5)}
                    className={activeItems.includes(5) ? "active" : ""}
                  >
                    collage art
                  </li>
                  <li
                    onClick={() => handleItemClick(6)}
                    className={activeItems.includes(6) ? "active" : ""}
                  >
                    glass art
                  </li>
                </ul>
              </div>
              <div className="hand-craft">
                <h3>Hand Craft</h3>
                <ul>
                  <li>ceramics</li>
                  <li>leather craft</li>
                  <li>wood craft</li>
                  <li>furniture</li>
                  <li>jewelry & accessories</li>
                  <li>fashion art</li>
                </ul>
              </div>
              <div className="digital-prints">
                <h3>Digital Prints</h3>
                <ul>
                  <li>digital paintings</li>
                  <li>illustrations</li>
                  <li>posters</li>
                  <li>3d print</li>
                  <li>Photography</li>
                  <li>illustration books</li>
                  <li>printed products</li>
                  <li>+ add other</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
