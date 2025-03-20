"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import FilterMobile from "@/components/filterMobile/FilterMobile";

const FindMobile = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Function to toggle filter visibility
  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  // Function to close the filter (passed to FilterMobile)
  const closeFilter = () => {
    setIsFilterVisible(false);
  };

  // Get current sorting option from URL
  const currentSort = searchParams.get("sort") || "Best Seller";
  const [selectedBestSeller, setSelectedBestSeller] = useState(currentSort);

  const bestSellers = ["Best Seller", "Most Viewed", "Most Liked"];

  // ✅ Function to update sorting in URL and trigger a new request
  const updateSorting = (sortOption) => {
    setSelectedBestSeller(sortOption); // Update state for UI

    const params = new URLSearchParams(searchParams.toString()); // Clone current params
    params.set("sort", sortOption); // Set the new sort value

    // Update URL and trigger new request
    router.replace(`${pathname}?${params.toString()}`);
  };

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
                  {selectedBestSeller}
                </button>
                <ul className="dropdown-menu">
                  {bestSellers.map((item, index) => (
                    <li key={index}>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          updateSorting(item);
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

      {/* Pass closeFilter to FilterMobile */}
      {isFilterVisible && <FilterMobile closeFilter={closeFilter} />}
    </>
  );
};

export default FindMobile;
