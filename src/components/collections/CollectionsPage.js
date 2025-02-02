"use client";
import { useState, useEffect, useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import "./collections-page.css";

const SliderTags = () => {
  const sliderContentRef = useRef(null);
  const nextButtonRef = useRef(null);

  const [scrollAmount, setScrollAmount] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const scrollStep = 200;

  const images = [
    {
      id: 1,
      tagId: 1,
      src: "/images/view 1.png",
      alt: "Image 1",
      title: "Lorem Ipsum",
      price: "EGP 2,500",
      artist: {
        name: "Omar Mohsen",
        avatar: "/images/avatar2.png",
      },
    },
    {
      id: 2,
      tagId: 1,
      src: "/images/view 2.png",
      alt: "Image 2",
      title: "Lorem Ipsum",
      price: "EGP 2,500",
      artist: {
        name: "Sara Ahmed",
        avatar: "/images/avatar2.png",
      },
    },
    {
      id: 3,
      tagId: 2,
      src: "/images/view 3.png",
      alt: "Image 3",
      title: "Lorem Ipsum",
      price: "EGP 2,500",
      artist: {
        name: "Ahmed Ali",
        avatar: "/images/avatar2.png",
      },
    },
    {
      id: 4,
      tagId: 2,
      src: "/images/view 4.png",
      alt: "Image 4",
      title: "Lorem Ipsum",
      price: "EGP 2,500",
      artist: {
        name: "Lina Khaled",
        avatar: "/images/avatar2.png",
      },
    },
  ];

  const tags = [
    { id: 1, label: "Men's" },
    { id: 2, label: "Women's Fashion" },
    { id: 3, label: "Electronics" },
    { id: 4, label: "ArtWork" },
    { id: 5, label: "Fashion" },
    { id: 6, label: "Women's" },
    { id: 7, label: "Vintage" },
    { id: 8, label: "Modern" },
    { id: 9, label: "Abstract" },
    { id: 10, label: "Minimalist" },
    { id: 11, label: "Pop Art" },
    { id: 12, label: "Bohemian" },
    { id: 13, label: "Decor" },
    { id: 14, label: "Contemporary" },
    { id: 15, label: "Digital" },
  ];

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
                  {tags.map((tag) => (
                    <div
                      className={`tags ${
                        selectedTags.includes(tag.id) ? "active" : ""
                      }`}
                      key={tag.id}
                    >
                      <li onClick={() => handleTagClick(tag.id)}>
                        {tag.label}
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
            {images
              .filter(
                (image) =>
                  selectedTags.length === 0 ||
                  selectedTags.includes(image.tagId)
              )
              .slice(0, 28)
              .map((image) => (
                <div key={image.id} className={`col-lg-3 col-md-4 col-6`}>
                  <div className="items-collections-info">
                    <div className="image-card">
                      <div className="overley"></div>
                      <Link href="/product-details" className="reser-link">
                        <div className="items-collections-image">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            width={500}
                            height={500}
                            quality={100}
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
                          <Link href="#" className="reser-link">
                            <FaRegHeart />
                          </Link>
                        </span>
                        <div className="user-art">
                          <div className="user-image">
                            <Link href="/artist-profile" className="reser-link">
                              <Image
                                src={image.artist.avatar}
                                alt="avatar"
                                width={500}
                                height={500}
                                quality={100}
                                loading="lazy"
                              />
                            </Link>
                          </div>
                          <Link href="/artist-profile" className="reser-link">
                            <span>{image.artist.name}</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <h2>{image.title}</h2>
                    <p>
                      {image.title}, {image.title}, {image.title}
                    </p>
                    <h3>{image.price}</h3>
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
