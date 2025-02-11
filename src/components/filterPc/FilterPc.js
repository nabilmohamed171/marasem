"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import "./filter.css";

const FilterPc = () => {
  const [isStickyFilter, setIsStickyFilter] = useState(false);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [forYou, setForYou] = useState("");
  const [bestSeller, setBestSeller] = useState("");

  const filterRef = useRef(null);

  const handleScroll = () => {
    if (filterRef.current) {
      const filter = filterRef.current;
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition > filter.offsetTop - 20) {
        setIsStickyFilter(true);
      } else {
        setIsStickyFilter(false);
      }
    }
  };

  const handleClearAll = () => {
    setCategory("");
    setLocation("");
    setPrice("");
    setForYou("");
    setBestSeller("");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const categories = ["Action", "Another action", "Something else here"];
  const locations = ["Action", "Another action", "Something else here"];
  const prices = ["Action", "Another action", "Something else here"];
  const forYouOptions = ["Action", "Another action", "Something else here"];
  const bestSellers = ["Action", "Another action", "Something else here"];

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
                {categories.map((item, index) => (
                  <li key={index}>
                    <Link
                      className="dropdown-item"
                      href="#"
                      onClick={() => setCategory(item)}
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
                {locations.map((item, index) => (
                  <li key={index}>
                    <Link
                      className="dropdown-item"
                      href="#"
                      onClick={() => setLocation(item)}
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
                {forYouOptions.map((item, index) => (
                  <li key={index}>
                    <Link
                      className="dropdown-item"
                      href="#"
                      onClick={() => setForYou(item)}
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

          <div className="col-md-1">
            <button
              className="clear-all"
              type="button"
              onClick={handleClearAll}
            >
              Clear all
            </button>
          </div>

          <div className="col-md-2">
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {bestSeller || "Best Seller"}
              </button>
              <ul className="dropdown-menu">
                {bestSellers.map((item, index) => (
                  <li key={index}>
                    <Link
                      className="dropdown-item"
                      href="#"
                      onClick={() => setBestSeller(item)}
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
