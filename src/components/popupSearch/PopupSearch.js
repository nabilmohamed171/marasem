import React, { useState } from "react";
import { useRouter } from "next/router";

const SearchPopup = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [categories] = useState([
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
  ]);

  const router = useRouter();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    // إجراء البحث عند النقر على الزر
    console.log("بحث عن:", searchQuery);
    router.push(`/search?query=${searchQuery}`);
  };

  const handleCategoryClick = (category) => {
    // عند النقر على الفئة، نقوم بالبحث بها
    setSearchQuery(category);
    console.log("بحث في الفئة:", category);
    router.push(`/search?query=${category}`);
  };

  return (
    <>
      <button onClick={() => setIsPopupOpen(true)}>فتح نافذة البحث</button>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button onClick={() => setIsPopupOpen(false)} className="close-btn">
              ×
            </button>
            <h3>بحث</h3>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="ابحث هنا..."
            />
            <button onClick={handleSearchClick}>بحث</button>

            <div className="categories">
              <h4>الفئات:</h4>
              <ul>
                {categories.map((category, index) => (
                  <li key={index} onClick={() => handleCategoryClick(category)}>
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .popup-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          position: relative;
          width: 300px;
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
        }
        .categories ul {
          list-style-type: none;
          padding: 0;
        }
        .categories li {
          cursor: pointer;
          padding: 5px 0;
          border-bottom: 1px solid #ddd;
        }
        .categories li:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </>
  );
};

export default SearchPopup;
