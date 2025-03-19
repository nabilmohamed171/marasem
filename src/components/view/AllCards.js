"use client";
import { useState, useEffect, useRef } from "react";
import { IoIosArrowForward, IoMdClose } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import "./all-cards.css";
import Pagination from "@/components/paginations/Pagination";

const SliderTags = () => {
  const sliderContentRef = useRef(null);
  const nextButtonRef = useRef(null);
  const [scrollAmount, setScrollAmount] = useState(0);
  const scrollStep = 200;

  // Dynamic data states.
  const [artworksData, setArtworksData] = useState([]);
  const [totalArtworks, setTotalArtworks] = useState(0);
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  // Pagination state.
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Fetch artworks from backend when currentPage or selectedTags change.
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const params = {
          limit: itemsPerPage,
          offset: (currentPage - 1) * itemsPerPage,
        };
        if (selectedTags.length > 0) {
          params.tags = selectedTags.join(",");
        }
        const response = await axios.get("http://127.0.0.1:8000/api/artworks", {
          params,
        });
        setArtworksData(response.data.artworks);
        setTotalArtworks(response.data.total);
      } catch (error) {
        console.error("Error fetching artworks", error);
      }
    };
    fetchArtworks();
  }, [currentPage, selectedTags]);

  // Fetch all tags sorted by admin.
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tags/all")
      .then((response) => {
        setAllTags(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tags", error);
      });
  }, []);

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
            {artworksData.map((artwork) => (
              <div key={artwork.id} className="col-lg-3 col-md-4 col-6">
                <div className="items-collections-info">
                  <div className="image-card">
                    <Link href={'/product-details/' + artwork.id} className="reser-link">
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
                      <div className="add-cart">
                        <span className="cart-shopping main-color">
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
                        <Link href="#" className="reser-link">
                          <FaRegHeart />
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
                        <Link href={"/artist-profile/" + artwork.artist.id} className="reser-link">
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
