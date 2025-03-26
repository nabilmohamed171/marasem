"use client";
import DropFlag from "@/components/dropFlags/DropFlags";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from "axios";
import "./edit-profile.css";

const EditProfile = ({ data }) => {
  // Pre-fill basic artist data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [summary, setSummary] = useState("");
  const [socialMediaLink, setSocialMediaLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [otherLink, setOtherLink] = useState("");
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");
  const [address, setAddress] = useState("");

  // Preferences: subcategories selected by the artist
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  // Fetched categories grouped by category name
  const [categories, setCategories] = useState({});
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/get-cities", {
          params: { country: "Egypt" },
          withCredentials: true,
        });
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  // Pre-fill fields on mount
  useEffect(() => {
    if (data) {
      setFirstName(data.first_name || "");
      setLastName(data.last_name || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setCountryCode(data.country_code || "");
      setSummary(data.artist_details ? data.artist_details.summary || "" : "");
      setSocialMediaLink(data.artist_details ? data.artist_details.social_media_link || "" : "");
      setWebsiteLink(data.artist_details ? data.artist_details.website_link || "" : "");
      setPortfolioLink(data.artist_details ? data.artist_details.portfolio_link || "" : "");
      setOtherLink(data.artist_details ? data.artist_details.other_link || "" : "");
      setCity(data.artist_details.pickup_location ? data.artist_details.pickup_location.city || "" : "");
      setZone(data.artist_details.pickup_location ? data.artist_details.pickup_location.zone || "" : "");
      setAddress(data.artist_details.pickup_location ? data.artist_details.pickup_location.address || "" : "");
      // Pre-fill subcategories if available (assuming data.subcategories is an array of objects with id)
      if (data.subcategories) {
        setSelectedSubcategories(data.subcategories.map((sub) => sub.id));
      }
    }
  }, [data]);

  // Fetch categories (and subcategories) for preferences
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://127.0.0.1:8000/api/get-categories", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setCategories(response.data.categories);
        console.log("Categories:", response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubcategoryToggle = (subcategoryId) => {
    setSelectedSubcategories((prev) => {
      if (prev.includes(subcategoryId)) {
        return prev.filter((id) => id !== subcategoryId);
      } else {
        return [...prev, subcategoryId];
      }
    });
  };

  // address
  const handleSavePickupLocation = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/add-pickup-location",
        { city, zone, address },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      console.log(response.data.message);
      data.artist_details.pickup_location.city = city;
      data.artist_details.pickup_location.zone = zone;
      data.artist_details.pickup_location.address = address;
    } catch (error) {
      console.error("Error updating pickup location:", error);
    }
  };

  const handleResetPickupLocation = () => {
    if (data && data.artist_details && data.artist_details.pickup_location) {
      setCity(data.artist_details.pickup_location.city || "");
      setZone(data.artist_details.pickup_location.zone || "");
      setAddress(data.artist_details.pickup_location.address || "");
    } else {
      setCity("");
      setZone("");
      setAddress("");
    }
  };

  // subcategories
  const handleUpdateSubcategories = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/subcategories",
        { subcategories: selectedSubcategories },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error updating subcategories:", error);
    }
  };

  // Reset function for focus section
  const handleResetFocus = () => {
    if (data && data.subcategories) {
      setSelectedSubcategories(data.subcategories.map((sub) => sub.id));
    } else {
      setSelectedSubcategories([]);
    }
  };

  const handleUpdateGeneralInfo = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/artist/update-general-info",
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          country_code: countryCode,
          phone: phone,
        },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error updating general info:", error);
    }
  };

  const handleResetGeneralInfo = () => {
    setFirstName(data.first_name || "");
    setLastName(data.last_name || "");
    setEmail(data.email || "");
    setPhone(data.phone || "");
    setCountryCode(data.country_code || "");
  };

  const handleUpdateAboutMe = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/artist/update-about-me",
        {
          summary: summary,
          social_media_link: socialMediaLink,
          website_link: websiteLink,
          portfolio_link: portfolioLink,
          other_link: otherLink,
        },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error updating about me:", error);
    }
  };

  const handleResetAboutMe = () => {
    setSummary(data.artist_details ? data.artist_details.summary || "" : "");
    setSocialMediaLink(data.artist_details ? data.artist_details.social_media_link || "" : "");
    setWebsiteLink(data.artist_details ? data.artist_details.website_link || "" : "");
    setPortfolioLink(data.artist_details ? data.artist_details.portfolio_link || "" : "");
    setOtherLink(data.artist_details ? data.artist_details.other_link || "" : "");
  }

  return (
    <div className="section-edit-profile">
      {/* General Info Section */}
      <form className="form-edit-profile">
        <div className="row">
          <div className="col-4">
            <h2>General Info</h2>
          </div>
          <div className="col-8">
            <div className="button-reset-update">
              <button type="button" className="reset" onClick={handleResetGeneralInfo}>
                Reset
              </button>
              <button type="button" className="update" onClick={handleUpdateGeneralInfo}>
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
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="dropdown-country">
                <div className="dropdown-flags-create-account">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <DropFlag
                    onChange={(data) => {
                      setCountryCode(data.countryCode);
                      setPhone(data.phone);
                    }}
                    initialCountryCode={countryCode}
                    initialPhone={phone}
                  />
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
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="button" className="change-password">
              Change Password
            </button>
          </div>
        </div>
      </form>
      {/* About Me Section */}
      <form className="form-edit-about-me">
        <div className="about-me">
          <div className="row">
            <div className="col-4">
              <h2>About Me</h2>
            </div>
            <div className="col-8">
              <div className="button-reset-update">
                <button type="button" className="reset" onClick={handleResetAboutMe}>
                  Reset
                </button>
                <button type="button" className="update" onClick={handleUpdateAboutMe}>
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
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
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
                  placeholder="https://www.behance.net/yourprofile"
                  value={socialMediaLink}
                  onChange={(e) => setSocialMediaLink(e.target.value)}
                />
              </div>
              <div className="instagram">
                <label htmlFor="Website" className="form-label">
                  Website Link
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="Website"
                  placeholder="https://www.instagram.com/yourprofile"
                  value={websiteLink}
                  onChange={(e) => setWebsiteLink(e.target.value)}
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
                  placeholder="https://www.portfolio.com/yourprofile"
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
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
                  value={otherLink}
                  onChange={(e) => setOtherLink(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Pickup Location Section */}
      <form
        className="form-pickup-location"
        onSubmit={(e) => {
          e.preventDefault();
          handleSavePickupLocation();
        }}
      >
        <div className="pickup-location">
          <div className="row">
            <div className="col-4">
              <h2>Pickup Location</h2>
            </div>
            <div className="col-8">
              <div className="button-reset-update">
                <button type="button" className="reset" onClick={handleResetPickupLocation}>
                  Reset
                </button>
                <button type="submit" className="update">
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
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                >
                  <option value="">{city || "Select City"}</option>
                  {cities.map((cityOption, index) => (
                    <option key={index} value={cityOption}>
                      {cityOption}
                    </option>
                  ))}
                </select>
                <span>
                  <IoIosArrowDown />
                </span>
              </div>
            </div>
            <div className="col-md-6 col-6">
              <div className="dropdown-selected">
                <label>Zone</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Zone"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                />
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
                    placeholder="Enter your detailed address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Focus Section */}
      <form className="form-focus">
        <div className="focus">
          <div className="row">
            <div className="col-4">
              <h2>Focus</h2>
            </div>
            <div className="col-8">
              <div className="button-reset-update">
                <button type="button" className="reset" onClick={handleResetFocus}>
                  Reset
                </button>
                <button type="button" className="update" onClick={handleUpdateSubcategories}>
                  Save Update
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {Object.entries(categories).map(([categoryName, subcats]) => (
                <div key={categoryName} className="category-section">
                  <p>{categoryName}</p>
                  <ul>
                    {subcats.map((sub) => (
                      <li
                        key={sub.id}
                        onClick={() => handleSubcategoryToggle(sub.id)}
                        className={selectedSubcategories.includes(sub.id) ? "active" : ""}
                      >
                        {sub.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
