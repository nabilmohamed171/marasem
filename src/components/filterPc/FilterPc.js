"use client";
import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import "./filter.css";

const FilterPc = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filterRef = useRef(null);

  const [isStickyFilter, setIsStickyFilter] = useState(false);
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [price, setPrice] = useState(searchParams.get("price") || "");
  const [forYou, setForYou] = useState(searchParams.get("forYou") || "");
  const [bestSellerOption, setBestSellerOption] = useState(searchParams.get("sort") || "");

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState({});
  const [prices, setPrices] = useState([
    "EGP 500 & Under",
    "EGP 1,000 to 5,000",
    "EGP 5,000 to 10,000",
    "EGP 10,000 & Over",
  ]);
  const [forYouOptions, setForYouOptions] = useState([]);
  const [bestSellers, setBestSellers] = useState(["Most Recent", "Best Seller", "Most Viewed", "Most Liked"]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/filters/get")
      .then((response) => {
        setCategories(response.data.featured_categories || []);
        setLocations(response.data.locations || {});
        setForYouOptions(response.data.featured_collections || []);
      })
      .catch((error) => console.error("Error fetching filters", error));
  }, []);

  // ✅ Use `useEffect` to sync state when URL parameters change
  useEffect(() => {
    setCategory(searchParams.get("category") || "");
    setLocation(searchParams.get("location") || "");
    setPrice(searchParams.get("price") || "");
    setForYou(searchParams.get("forYou") || "");
    setBestSellerOption(searchParams.get("sort") || "");
  }, [searchParams]);

  const updateFilters = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const newUrl = `/shop-art?${params.toString()}`;
    console.log("Updating URL:", newUrl);

    if (pathname !== "/shop-art") {
      router.push(newUrl);
    } else {
      router.replace(newUrl);
    }
  };

  return (
    <div className={`dropdown-filter ${isStickyFilter ? "sticky-filter" : ""}`} ref={filterRef}>
      <div className="container">
        <div className="row">
          <div className="col-md-1"><h2>Find</h2></div>

          {/* Category Dropdown */}
          <div className="col-md-2">
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                {category || "Category"}
              </button>
              <ul className="dropdown-menu">
                {categories.map((item) => (
                  <li key={item.id}>
                    <a href="#" className="dropdown-item" onClick={(e) => {
                      e.preventDefault();
                      updateFilters("category", item.name);
                    }}>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              <span className="arrow-down-icon"><IoIosArrowDown /></span>
            </div>
          </div>

          {/* Location Dropdown */}
          <div className="col-md-2">
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                {location || "Location"}
              </button>
              <ul className="dropdown-menu">
                {[...new Set(Object.values(locations).flatMap((cities) =>
                  cities.map((cityObj) => cityObj.city)
                ))].map((city, index) => (
                  <li key={index}>
                    <a href="#" className="dropdown-item" onClick={(e) => {
                      e.preventDefault();
                      updateFilters("location", city);
                    }}>
                      {city}
                    </a>
                  </li>
                ))}
              </ul>
              <span className="arrow-down-icon"><IoIosArrowDown /></span>
            </div>
          </div>

          {/* Price Dropdown */}
          <div className="col-md-2">
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                {price || "Price"}
              </button>
              <ul className="dropdown-menu">
                {prices.map((item, index) => (
                  <li key={index}>
                    <a href="#" className="dropdown-item" onClick={(e) => {
                      e.preventDefault();
                      updateFilters("price", item);
                    }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              <span className="arrow-down-icon"><IoIosArrowDown /></span>
            </div>
          </div>

          {/* For You Dropdown */}
          <div className="col-md-2">
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                {forYou || "For you"}
              </button>
              <ul className="dropdown-menu">
                {forYouOptions.map((item) => (
                  <li key={item.id}>
                    <a href="#" className="dropdown-item" onClick={(e) => {
                      e.preventDefault();
                      updateFilters("forYou", item.title);
                    }}>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
              <span className="arrow-down-icon"><IoIosArrowDown /></span>
            </div>
          </div>

          {/* Best Seller Dropdown */}
          <div className="col-md-2">
            <div className="dropdown">
              <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown">
                {bestSellerOption || "Best Seller"}
              </button>
              <ul className="dropdown-menu">
                {bestSellers.map((item, index) => (
                  <li key={index}>
                    <a href="#" className="dropdown-item" onClick={(e) => {
                      e.preventDefault();
                      updateFilters("sort", item);
                    }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              <span className="arrow-down-icon"><IoIosArrowDown /></span>
            </div>
          </div>

          {/* Clear All */}
          <div className="col-md-1">
            <button className="clear-all" type="button" onClick={() => router.replace("/shop-art")}>
              Clear all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPc;
