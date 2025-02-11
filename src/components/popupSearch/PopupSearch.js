"use client";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import "./search.css";

const PopupSearch = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("popup-search")) {
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  const tags = ["Fashion Art", "Macrame", "Wood Craft", "Leather Craft"];

  return (
    <div className="popup-search" onClick={handleClickOutside}>
      <div className="colse">
        <span className="close-icon" onClick={handleClose}>
          <IoClose />
        </span>
      </div>
      <div className="container">
        <div className="w-search">
          <h2>Search for your favorite arts</h2>
          <div className="search">
            <span className="search-icon">
              <IoSearchOutline />
            </span>
            <input type="text" placeholder="Search here..." />
          </div>
          <div className="tags">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupSearch;
