"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
                <li>
                  <Link
                    className="dropdown-item"
                    href="#"
                    onClick={() => setCategory("Action")}
                  >
                    Action
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    href="#"
                    onClick={() => setCategory("Another action")}
                  >
                    Another action
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    href="#"
                    onClick={() => setCategory("Something else here")}
                  >
                    Something else here
                  </Link>
                </li>
              </ul>
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
                <li>
                  <Link
                    className="dropdown-item"
                    href="#"
                    onClick={() => setLocation("Action")}
                  >
                    Action
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    href="#"
                    onClick={() => setLocation("Another action")}
                  >
                    Another action
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    href="#"
                    onClick={() => setLocation("Something else here")}
                  >
                    Something else here
                  </Link>
                </li>
              </ul>
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
                <li>
                  <Link
                    className="dropdown-item"
                    href="#"
                    onClick={() => setPrice("Action")}
                  >
                    Action
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    href="#"
                    onClick={() => setPrice("Another action")}
                  >
                    Another action
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    href="#"
                    onClick={() => setPrice("Something else here")}
                  >
                    Something else here
                  </Link>
                </li>
              </ul>
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
                <li>
                  <Link
                    className="dropdown-item"
                    href="#"
                    onClick={() => setForYou("Action")}
                  >
                    Action
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    href="#"
                    onClick={() => setForYou("Another action")}
                  >
                    Another action
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    href="#"
                    onClick={() => setForYou("Something else here")}
                  >
                    Something else here
                  </Link>
                </li>
              </ul>
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
                className="btn best-seller btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {bestSeller || "Best Seller"}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    className="dropdown-item"
                    href="#"
                    onClick={() => setBestSeller("Action")}
                  >
                    Action
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    href="#"
                    onClick={() => setBestSeller("Another action")}
                  >
                    Another action
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    href="#"
                    onClick={() => setBestSeller("Something else here")}
                  >
                    Something else here
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPc;
