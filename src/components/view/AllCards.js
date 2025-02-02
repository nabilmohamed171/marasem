"use client";
import { useState, useEffect, useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import "./all-cards.css";

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
    },
    {
      id: 2,
      tagId: 1,
      src: "/images/view 2.png",
      alt: "Image 2",
      title: "Lorem Ipsum",
      price: "EGP 2,500",
    },
    {
      id: 3,
      tagId: 2,
      src: "/images/view 3.png",
      alt: "Image 3",
      title: "Lorem Ipsum",
      price: "EGP 2,500",
    },
    {
      id: 4,
      tagId: 2,
      src: "/images/view 4.png",
      alt: "Image 4",
      title: "Lorem Ipsum",
      price: "EGP 2,500",
    },
    {
      id: 5,
      tagId: 3,
      src: "/images/view 5.png",
      alt: "Image 5",
      title: "Lorem Ipsum",
      price: "EGP 2,500",
    },
    {
      id: 6,
      tagId: 3,
      src: "/images/view 1.png",
      alt: "Image 1",
      title: "Lorem Ipsum",
      price: "EGP 2,500",
    },
    {
      id: 7,
      tagId: 4,
      src: "/images/view 2.png",
      alt: "Image 7",
      title: "Lorem Ipsum",
      price: "EGP 2,500",
    },
    {
      id: 8,
      tagId: 4,
      src: "/images/view 3.png",
      alt: "Image 8",
      title: "Lorem Ipsum",
      price: "EGP 2,500",
    },
    {
      id: 9,
      tagId: 5,
      src: "/images/view 4.png",
      alt: "Image 9",
      title: "Lorem Ipsum",
      price: "EGP 2,500",
    },
    {
      id: 10,
      tagId: 5,
      src: "/images/view 5.png",
      alt: "Image 10",
      title: "Lorem Ipsum",
      price: "EGP 2,500",
    },
    {
      id: 11,
      tagId: 6,
      src: "/images/view 1.png",
      alt: "Image 11",
      title: "Lorem Ipsum",
      price: "EGP 2,500",
    },
    {
      id: 12,
      tagId: 6,
      src: "/images/view 2.png",
      alt: "Image 12",
      title: "Lorem Ipsum",
      price: "EGP 2,500",
    },
    {
      id: 13,
      tagId: 7,
      src: "/images/view 3.png",
      alt: "Image 13",
      title: "Lorem Ipsum",
      price: "EGP 2,500",
    },
    {
      id: 14,
      tagId: 7,
      src: "/images/view 4.png",
      alt: "Image 14",
      title: "Lorem Ipsum",
      price: "EGP 2,500",
    },
    {
      id: 15,
      tagId: 8,
      src: "/images/view 5.png",
      alt: "Image 15",
      title: "Lorem Ipsum",
      price: "EGP 2,500",
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
            <div className="col-md-1 col-3">
              <span>745 Items</span>
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
              <div className="col-md-1 d-sm-none d-md-block">
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
                      <Link href="/product-details" className="reser-link">
                        <div className="overley"></div>
                        <div className="items-collections-image">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            width={500}
                            height={500}
                            quality={100}
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
                              src="/images/avatar2.png"
                              alt="avatar"
                              width={500}
                              height={500}
                              quality={100}
                              className="flex-r-image"
                              loading="lazy"
                            />
                          </div>
                          <Link href="#" className="reser-link">
                            <span>Omar Mohsen</span>
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
