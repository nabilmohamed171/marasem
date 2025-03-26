"use client";
import { useState, useEffect } from "react";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import axios from "axios";
import "./search.css";

const PopupSearch = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [tags, setTags] = useState([]);
  const router = useRouter();
  const pathname = usePathname(); // Get the current route
  const searchParams = useSearchParams(); // Get existing query params

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/tags/all", {
          withCredentials: true,
        });
        setTags(response.data.slice(0, 4)); // Show only the first 4 tags
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("popup-search")) {
      setIsVisible(false);
    }
  };

  const navigateToSearch = (query) => {
    const newUrl = `/shop-art?term=${encodeURIComponent(query)}`;

    if (pathname === "/shop-art") {
      router.replace(newUrl);
    } else {
      // If navigating from another page, just update the URL
      router.push(newUrl);
    }
    setIsVisible(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateToSearch(searchQuery);
    }
  };

  const handleTagClick = (tag) => {
    navigateToSearch(tag);
  };

  if (!isVisible) return null;

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
          <form onSubmit={handleSearchSubmit}>
            <div className="search">
              <span className="search-icon">
                <IoSearchOutline />
              </span>
              <input
                type="text"
                placeholder="Search here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          <div className="tags">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="tag"
                onClick={() => handleTagClick(tag.name)}
                style={{ cursor: "pointer" }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupSearch;
