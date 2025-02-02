"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import "./shop-artist.css";

const Artists = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [artists, setArtists] = useState([
    {
      id: 1,
      name: "Omar Mohsen",
      location: "Cairo, Egypt",
      tags: ["Portrait", "Urban"],
      userImage: "/images/avatar2.png",
      projectImages: [
        "/images/view 1.png",
        "/images/view 2.png",
        "/images/view 3.png",
      ],
      projectViews: 5900,
      appreciations: 20300,
    },
    {
      id: 2,
      name: "Ahmed Ali",
      location: "Alexandria, Egypt",
      tags: ["Nature", "Landscape"],
      userImage: "/images/avatar.png",
      projectImages: [
        "/images/view 5.png",
        "/images/view 4.png",
        "/images/1.png",
      ],
      projectViews: 8000,
      appreciations: 15400,
    },
    {
      id: 3,
      name: "Sara Hassan",
      location: "Dubai, UAE",
      tags: ["Fashion", "Street"],
      userImage: "/images/avatar2.png",
      projectImages: ["/images/2.png", "/images/3.png", "/images/4.png"],
      projectViews: 15000,
      appreciations: 25000,
    },
    {
      id: 4,
      name: "Mona Samir",
      location: "London, UK",
      tags: ["Architectural", "Product"],
      userImage: "/images/avatar.png",
      projectImages: ["/images/2.png", "/images/3.png", "/images/4.png"],
      projectViews: 10000,
      appreciations: 18000,
    },
  ]);

  const [artistTags, setArtistTags] = useState([]);
  const [followedArtists, setFollowedArtists] = useState(new Set());
  const sliderContentRef = useRef(null);
  const nextButtonRef = useRef(null);
  const scrollStep = 150;
  const [scrollAmount, setScrollAmount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const getRandomArtists = (num) => {
    const shuffledArtists = [...artists].sort(() => 0.5 - Math.random());
    return shuffledArtists.slice(0, num);
  };

  useEffect(() => {
    const randomArtists = getRandomArtists(20);
    setArtistTags(randomArtists);
  }, [artists]);

  const handleTagSelection = (tag) => {
    const isTagSelected = selectedTags.includes(tag);
    const newSelectedTags = isTagSelected
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newSelectedTags);

    const filteredArtists = artists.filter((artist) =>
      artist.tags.some((artistTag) => newSelectedTags.includes(artistTag))
    );
    setArtistTags(filteredArtists);
  };

  const handleRemoveTag = (tagId) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.filter((id) => id !== tagId)
    );

    const filteredArtists = artists.filter((artist) =>
      artist.tags.some((tag) => tag !== tagId)
    );
    setArtistTags(filteredArtists);
  };

  const toggleFollow = (artistId) => {
    const newFollowedArtists = new Set(followedArtists);
    if (newFollowedArtists.has(artistId)) {
      newFollowedArtists.delete(artistId);
    } else {
      newFollowedArtists.add(artistId);
    }
    setFollowedArtists(newFollowedArtists);
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

  return (
    <>
      <div className="slider-tags">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-1 d-none d-md-block count-number-items">
              <span>745 Items</span>
            </div>
            <div className="col-1 d-none d-md-block">
              <div className="dropdown dropdown-sort-by-artist">
                <Link
                  className="btn btn-secondary dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sort By
                </Link>

                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" href="#">
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      Another action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      Something else here
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-10 position-relative">
              <div className="container">
                <div className="slider-wrapper ">
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
                    {[
                      "Portrait",
                      "Landscape",
                      "Urban",
                      "Minimalist",
                      "Fashion",
                      "Street",
                      "Product",
                      "Food",
                      "Nature",
                      "Black and White",
                      "Aerial",
                      "Macro",
                      "Event",
                      "Architectural",
                      "Abstract",
                    ].map((tag, index) => (
                      <div
                        className={`tags ${
                          selectedTags.includes(tag) ? "active" : ""
                        }`}
                        key={index}
                      >
                        <li onClick={() => handleTagSelection(tag)}>{tag}</li>
                        {selectedTags.includes(tag) && (
                          <span
                            onClick={() => handleRemoveTag(tag)}
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
                  <div
                    ref={nextButtonRef}
                    className="slider-scroll slider-next"
                  >
                    <IoIosArrowForward />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="artists">
          <div className="row">
            {artistTags.map((artist) => (
              <div className="col-lg-3 col-md-6 col-12" key={artist.id}>
                <div className="artist">
                  <div className="row">
                    <div className="col-4 p-r-0">
                      <div className="item-image">
                        <Image
                          className="image-one"
                          src={artist.projectImages[0]}
                          alt="Artist Image 1"
                          width={300}
                          height={200}
                          quality={100}
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="col-4 p-r-l-5">
                      <div className="item-image">
                        <Image
                          src={artist.projectImages[1]}
                          alt="Artist Image 2"
                          width={300}
                          height={200}
                          quality={100}
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="col-4 p-l-0">
                      <div className="item-image">
                        <Image
                          className="image-sec"
                          src={artist.projectImages[2]}
                          alt="Artist Image 3"
                          width={300}
                          height={200}
                          quality={100}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="artist-info text-center">
                    <div className="user-image">
                      <Link className="reser-link" href="/artist-profile">
                        <Image
                          src={artist.userImage}
                          alt="User Avatar"
                          width={80}
                          height={80}
                          quality={100}
                          loading="lazy"
                        />
                      </Link>
                    </div>
                    <h2 className="artist-name">
                      <Link className="reser-link" href="/artist-profile">
                        {artist.name}
                      </Link>
                    </h2>
                    <span className="address">
                      <FaMapMarkerAlt /> {artist.location}
                    </span>
                  </div>
                  <div className="extra-artist-info text-center">
                    <div className="row">
                      <div className="col-4">
                        <h4>{artist.projectViews}</h4>
                        <span>Project Views</span>
                      </div>
                      <div className="col-4">
                        <button
                          onClick={() => toggleFollow(artist.id)}
                          className={
                            followedArtists.has(artist.id)
                              ? "follow-unfollow-active"
                              : ""
                          }
                        >
                          {followedArtists.has(artist.id)
                            ? "Unfollow"
                            : "Follow"}
                        </button>
                      </div>
                      <div className="col-4">
                        <h4>{artist.appreciations}</h4>
                        <span>Appreciations</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Artists;
