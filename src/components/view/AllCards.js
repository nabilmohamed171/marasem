"use client";
import { useState, useEffect, useRef } from "react";
import { IoIosArrowForward, IoMdClose } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Import both icons
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import "./all-cards.css";
import Pagination from "@/components/paginations/Pagination";
import { useCart } from "@/context/CartContext"; // Import cart context

const SliderTags = () => {
  const { setCartCount } = useCart();
  const sliderContentRef = useRef(null);
  const nextButtonRef = useRef(null);
  const [scrollAmount, setScrollAmount] = useState(0);
  const scrollStep = 200;

  // Dynamic data states.
  const [artworksData, setArtworksData] = useState([]);
  const [totalArtworks, setTotalArtworks] = useState(0);
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [likedArtworks, setLikedArtworks] = useState(new Set());

  // Pagination state.
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("term") || "";

  const addToCart = async (artworkId, size) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("User not authenticated");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/cart",
        { artwork_id: artworkId, size: size, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Fetch new cart count after adding item
      const response = await axios.get("http://127.0.0.1:8000/api/cart",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartCount(response.data.items_count);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Fetch artworks from backend when currentPage or selectedTags change.
  useEffect(() => {
    const fetchArtworks = async () => {
      console.log("Fetching with params:", searchParams.toString());

      try {
        // Prepare request parameters
        const params = {
          limit: itemsPerPage,
          offset: (currentPage - 1) * itemsPerPage,
        };

        let endpoint = "http://127.0.0.1:8000/api/artworks";

        // Get all search parameters
        const term = searchParams.get("term");
        const category = searchParams.get("category");
        const location = searchParams.get("location");
        const price = searchParams.get("price");
        const forYou = searchParams.get("forYou");
        const sort = searchParams.get("sort");

        if (term) {
          // If a term exists, perform a full-text search
          endpoint = "http://127.0.0.1:8000/api/search";
          params.q = term;
        } else {
          // If no term, apply filters
          if (category) params.category = category;
          if (location) params.location = location;
          if (price) params.price = price;
          if (forYou) params.forYou = forYou;
          if (sort) params.sort = sort;
        }

        const response = await axios.get(endpoint, { params });
        setArtworksData(response.data.artworks);
        setTotalArtworks(response.data.total);
        setAllTags(response.data.tags);
      } catch (error) {
        console.error("Error fetching artworks", error);
      }
    };

    fetchArtworks();
  }, [currentPage, selectedTags, searchParams.toString()]);

  useEffect(() => {
    const fetchLikedArtworks = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user/likes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLikedArtworks(new Set(response.data.likedArtworks)); // ✅ Store IDs as a Set
      } catch (error) {
        console.error("Error fetching liked artworks:", error);
      }
    };
    fetchLikedArtworks();
  }, []);

  const toggleLike = async (artworkId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("You must be logged in to like artworks.");
      return;
    }

    const isLiked = likedArtworks.has(artworkId);
    const url = `http://127.0.0.1:8000/api/artworks/${artworkId}/like`;

    try {
      if (isLiked) {
        await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
        setLikedArtworks((prev) => {
          const newSet = new Set(prev);
          newSet.delete(artworkId);
          return newSet;
        });
      } else {
        await axios.post(url, {}, { headers: { Authorization: `Bearer ${token}` } });
        setLikedArtworks((prev) => new Set(prev).add(artworkId));
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // Scrolling and dragging handlers for the tags slider.
  const handleWheel = (e) => {
    if (sliderContentRef.current) {
      const maxScroll =
        sliderContentRef.current.scrollWidth - sliderContentRef.current.clientWidth;
      if (e.deltaY > 0) {
        setScrollAmount((prev) => Math.min(prev + scrollStep, maxScroll));
      } else if (e.deltaY < 0) {
        setScrollAmount((prev) => Math.max(prev - scrollStep, 0));
      }
    }
  };

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const moveX = e.clientX - startX;
    const newScrollAmount = Math.max(
      0,
      Math.min(
        scrollAmount - moveX,
        sliderContentRef.current.scrollWidth - sliderContentRef.current.clientWidth
      )
    );
    setScrollAmount(newScrollAmount);
    setStartX(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const moveX = e.touches[0].clientX - startX;
    const newScrollAmount = Math.max(
      0,
      Math.min(
        scrollAmount - moveX,
        sliderContentRef.current.scrollWidth - sliderContentRef.current.clientWidth
      )
    );
    setScrollAmount(newScrollAmount);
    setStartX(e.touches[0].clientX);
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleTouchEnd = () => setIsDragging(false);

  useEffect(() => {
    if (sliderContentRef.current) {
      sliderContentRef.current.style.transform = `translateX(-${scrollAmount}px)`;
    }
  }, [scrollAmount]);

  const handleTagClick = (tagId) => {
    // When a tag is clicked, update selected tags and reset page to 1.
    setSelectedTags((prev) => {
      if (prev.includes(tagId)) {
        return prev.filter((id) => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
    setCurrentPage(1);
  };

  const handleRemoveTag = (tagId) => {
    setSelectedTags((prev) => prev.filter((id) => id !== tagId));
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Tags Slider */}
      <div className="slider-tags">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-1 col-3">
              <span>{totalArtworks} Items</span>
            </div>
            <div className="col-md-10 col-9 position-relative">
              <div className="slider-wrapper">
                <ul
                  ref={sliderContentRef}
                  className="list-unstyled slider-content"
                  onWheel={handleWheel}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {allTags.map((tag) => (
                    <div
                      key={tag.id}
                      className={`tags ${selectedTags.includes(tag.id) ? "active" : ""}`}
                    >
                      <li onClick={() => handleTagClick(tag.id)}>{tag.name}</li>
                      {selectedTags.includes(tag.id) && (
                        <span
                          onClick={() => handleRemoveTag(tag.id)}
                          className="icon-x-tags"
                          style={{
                            display: "inline-block",
                            cursor: "pointer",
                            marginLeft: "10px",
                          }}
                        >
                          <IoMdClose />
                        </span>
                      )}
                    </div>
                  ))}
                </ul>
              </div>
              <div className="col-md-1 d-sm-none d-md-block">
                <div ref={nextButtonRef} className="slider-scroll slider-next">
                  <IoIosArrowForward />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Artworks Grid */}
      <div className="images-items-collections">
        <div className="container">
          <div className="row">
            {artworksData
              .filter((artwork) =>
                selectedTags.length === 0
                  ? true
                  : artwork.tags.some((tag) => selectedTags.includes(tag.id))
              )
              .map((artwork) => (
                <div key={artwork.id} className="col-lg-3 col-md-4 col-6">
                  <div className="items-collections-info">
                    <div className="image-card">
                      <Link href={'/product-details?id=' + artwork.id} className="reser-link">
                        <div className="overley"></div>
                        <div className="items-collections-image">
                          <Image
                            src={artwork.photos[0]}
                            alt={artwork.name}
                            width={312}
                            height={390}
                            quality={70}
                            className="flex-r-image"
                            loading="lazy"
                          />
                        </div>
                      </Link>
                      <div className="overley-info">
                      <div className="add-cart"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(artwork.id, Object.keys(artwork.sizes_prices)[0]);
                        }}>
                        <span className="cart-shopping">
                          <i
                            className="reser-link"
                          >
                            <HiOutlineShoppingBag />
                          </i>
                        </span>
                        <span className="plus">
                          <i className="reser-link">
                            <GoPlus />
                          </i>
                        </span>
                      </div>
                        <span className="heart">
                          <Link
                            href="#"
                            className="reser-link"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleLike(artwork.id);
                            }}
                          >
                            {likedArtworks.has(artwork.id) ? <FaHeart color="red" /> : <FaRegHeart />}
                          </Link>
                        </span>
                        <div className="user-art">
                          <div className="user-image">
                            <Image
                              src={artwork.artist.profile_picture}
                              alt="avatar"
                              width={50}
                              height={50}
                              quality={70}
                              className="flex-r-image"
                              loading="lazy"
                            />
                          </div>
                          <Link href={"/artist-profile?id=" + artwork.artist.id} className="reser-link">
                            <span>{artwork.artist.first_name} {artwork.artist.last_name}</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <h2>{artwork.name}</h2>
                    <p>{artwork.description}</p>
                    <h3>
                      {"EGP " +
                        Number(Object.values(artwork.sizes_prices)[0]).toLocaleString("en-US")}
                    </h3>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalArtworks}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default SliderTags;
