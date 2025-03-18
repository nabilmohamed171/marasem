"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import "./filter.css";

const FilterPc = () => {
  const [isStickyFilter, setIsStickyFilter] = useState(false);

  // Selected filter values (for display)
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [forYou, setForYou] = useState("");
  const [bestSellerOption, setBestSellerOption] = useState("");

  // Dynamic dropdown options fetched from backend
  const [categories, setCategories] = useState([]);
  // locations is now expected to be an object with country keys and array of city objects as values.
  const [locations, setLocations] = useState({});
  const [prices, setPrices] = useState([
    "EGP 500 & Under",
    "EGP 1,000 to 5,000",
    "EGP 5,000 to 10,000",
    "EGP 10,000 & Over"
  ]);
  const [forYouOptions, setForYouOptions] = useState([]);
  const [bestSellers, setBestSellers] = useState(["Best Seller", "Most Viewed", "Most Liked"]);

  const filterRef = useRef(null);

  const handleScroll = () => {
    if (filterRef.current) {
      const filter = filterRef.current;
      const currentScrollPosition = window.scrollY;
      setIsStickyFilter(currentScrollPosition > filter.offsetTop - 20);
    }
  };

  const handleClearAll = () => {
    setCategory("");
    setLocation("");
    setPrice("");
    setForYou("");
    setBestSellerOption("");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fetch dynamic nav filters from the backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/filters/get")
      .then((response) => {
        const data = response.data;
        // Use featured_categories for the "Category" dropdown.
        setCategories(data.featured_categories || []);
        // Unique locations, now grouped by country.
        setLocations(data.locations || {});
        // Use featured_collections for the "For you" dropdown.
        setForYouOptions(data.featured_collections || []);
      })
      .catch((error) => {
        console.error("Error fetching filters", error);
      });
  }, []);

  return (
    <div
      className={`dropdown-filter ${isStickyFilter ? "sticky-filter" : ""}`}
      ref={filterRef}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-1">
            <h2>Find</h2>
          </div>

          {/* Category Dropdown */}
          <div className="col-md-2">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {category || "Category"}
              </button>
              <ul className="dropdown-menu">
                {categories.map((item) => (
                  <li key={item.id}>
                    <Link
                      className="dropdown-item"
                      href="#"
                      onClick={() => setCategory(item.name)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <span className="arrow-down-icon">
                <IoIosArrowDown />
              </span>
            </div>
          </div>

          {/* Location Dropdown */}
          <div className="col-md-2">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {location || "Location"}
              </button>
              <ul className="dropdown-menu">
                {Object.entries(locations).flatMap(([country, cities]) => {
                  if (country) {
                    return cities.map((cityObj, index) => (
                      <li key={`${country}-${index}`}>
                        <Link
                          className="dropdown-item"
                          href="#"
                          onClick={() => setLocation(cityObj.city)}
                        >
                          {cityObj.city}
                        </Link>
                      </li>
                    ));
                  } else {
                    return [];
                  }
                })}
              </ul>
              <span className="arrow-down-icon">
                <IoIosArrowDown />
              </span>
            </div>
          </div>

          {/* Price Dropdown */}
          <div className="col-md-2">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {price || "Price"}
              </button>
              <ul className="dropdown-menu">
                {prices.map((item, index) => (
                  <li key={index}>
                    <Link
                      className="dropdown-item"
                      href="#"
                      onClick={() => setPrice(item)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
              <span className="arrow-down-icon">
                <IoIosArrowDown />
              </span>
            </div>
          </div>

          {/* For You Dropdown: Now using dynamic collections */}
          <div className="col-md-2">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {forYou || "For you"}
              </button>
              <ul className="dropdown-menu">
                {forYouOptions.map((item) => (
                  <li key={item.id}>
                    <Link
                      className="dropdown-item"
                      href="#"
                      onClick={() => setForYou(item.title)}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <span className="arrow-down-icon">
                <IoIosArrowDown />
              </span>
            </div>
          </div>

          <div className="col-md-1">
            <button className="clear-all" type="button" onClick={handleClearAll}>
              Clear all
            </button>
          </div>

          {/* Best Seller Dropdown (static) */}
          <div className="col-md-2">
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {bestSellerOption || "Best Seller"}
              </button>
              <ul className="dropdown-menu">
                {bestSellers.map((item, index) => (
                  <li key={index}>
                    <Link
                      className="dropdown-item"
                      href="#"
                      onClick={() => setBestSellerOption(item)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
              <span className="arrow-down-icon">
                <IoIosArrowDown />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPc;
