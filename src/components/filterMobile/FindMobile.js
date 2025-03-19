"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import FilterMobile from "@/components/filterMobile/FilterMobile";

const FindMobile = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  const [selectedBestSeller, setSelectedBestSeller] = useState("");
  const [bestSellers, setBestSellers] = useState([
    "Best Seller",
    "Most Viewed",
    "Most Liked",
  ]);

  return (
    <>
      <div className="find-photo">
        <div className="container d-md-none d-sm-block">
          <div className="row">
            <div className="col">
              <div className="find-mobile">
                <div className="find-click-popup">
                  <button onClick={toggleFilter} type="button">
                    Find
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="best-seller">
                <button
                  className="best-seller btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {selectedBestSeller || "Best Seller"}
                </button>
                <ul className="dropdown-menu">
                  {bestSellers.map((item, index) => (
                    <li key={index}>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedBestSeller(item);
                        }}
                      >
                        {item}
                      </a>
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
      {isFilterVisible && <FilterMobile />}
    </>
  );
};

export default FindMobile;
