"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation"; // To get query params
import { IoIosArrowForward } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Import both icons
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import "./collections-page.css";

const SliderTags = () => {
  const searchParams = useSearchParams();
  const collectionId = searchParams.get("id"); // Get collection ID from URL
  const [collection, setCollection] = useState(null);
  const [likedArtworks, setLikedArtworks] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const sliderContentRef = useRef(null);
  const nextButtonRef = useRef(null);

  const [scrollAmount, setScrollAmount] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const scrollStep = 200;

  useEffect(() => {
    if (!collectionId) return;
    const fetchCollection = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/collections/${collectionId}`);
        setCollection(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching collection data:", error);
        setLoading(false);
      }
    };
    fetchCollection();
  }, [collectionId]);

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

  const handleTagClick = (tagId) => {
    setSelectedTags((prev) => {
      if (prev.includes(tagId)) {
        return prev.filter((id) => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
  };

  const handleRemoveTag = (tagId) => {
    setSelectedTags((prev) => prev.filter((id) => id !== tagId));
  };

  const handleWheel = (e) => {
    if (sliderContentRef.current) {
      const maxScroll =
        sliderContentRef.current.scrollWidth -
        sliderContentRef.current.clientWidth;
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
        sliderContentRef.current.scrollWidth -
        sliderContentRef.current.clientWidth
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
        sliderContentRef.current.scrollWidth -
        sliderContentRef.current.clientWidth
      )
    );
    setScrollAmount(newScrollAmount);
    setStartX(e.touches[0].clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const nextButton = nextButtonRef.current;
    const sliderContent = sliderContentRef.current;

    if (!nextButton || !sliderContent) return;

    const handleNextClick = () => {
      const maxScroll = sliderContent.scrollWidth - sliderContent.clientWidth;
      if (scrollAmount + scrollStep > maxScroll) {
        setScrollAmount(0);
      } else {
        setScrollAmount((prev) => prev + scrollStep);
      }
    };

    nextButton.addEventListener("click", handleNextClick);

    return () => {
      nextButton.removeEventListener("click", handleNextClick);
    };
  }, [scrollAmount]);

  useEffect(() => {
    if (sliderContentRef.current) {
      sliderContentRef.current.style.transform = `translateX(-${scrollAmount}px)`;
    }
  }, [scrollAmount]);

  if (loading) {
    return <div>Loading collection data...</div>;
  }

  return (
    <div>
      <div className="slider-tags">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-10 position-relative">
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
                  {collection?.tags.map((tag) => (
                    <div
                      className={`tags ${selectedTags.includes(tag.id) ? "active" : ""}`}
                      key={tag.id}
                    >
                      <li onClick={() => handleTagClick(tag.id)}>
                        {tag.name}
                      </li>
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
              <div className="col-md-1">
                <div ref={nextButtonRef} className="slider-scroll slider-next">
                  <IoIosArrowForward />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="images-items-collections">
        <div className="container">
          <div className="row">
            {collection?.artworks
              .filter(
                (artwork) =>
                  selectedTags.length === 0 ||
                  artwork.tagIds.some(tagId => selectedTags.includes(tagId)) // ✅ Check if any tag matches
              )
              .slice(0, 28)
              .map((artwork) => (
                <div key={artwork.id} className={`col-lg-3 col-md-4 col-6`}>
                  <div className="items-collections-info">
                    <div className="image-card">
                      <div className="overley"></div>
                      <Link href="/product-details" className="reser-link">
                        <div className="items-collections-image">
                          <Image
                            src={artwork.images[0]}
                            alt={artwork.name}
                            width={312}
                            height={390}
                            quality={70}
                            loading="lazy"
                          />
                        </div>
                      </Link>
                      <div className="overley-info">
                        <div className="add-cart">
                          <span className="cart-shopping">
                            <Link href="#" className="reser-link">
                              <HiOutlineShoppingBag />
                            </Link>
                          </span>
                          <span className="plus">
                            <Link href="#" className="reser-link">
                              <GoPlus />
                            </Link>
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
                            <Link href="/artist-profile" className="reser-link">
                              <Image
                                src={artwork.artist.profile_picture}
                                alt="avatar"
                                width={50}
                                height={50}
                                quality={70}
                                loading="lazy"
                              />
                            </Link>
                          </div>
                          <Link href="/artist-profile" className="reser-link">
                            <span>{artwork.artist.name}</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <h2>{artwork.name}</h2>
                    <p>{artwork.desc}</p>
                    <h3>EGP {Number(Object.values(artwork.sizes_prices)[0]).toLocaleString("en-US")}</h3>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderTags;
