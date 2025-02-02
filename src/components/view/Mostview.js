"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";
import "./most-views.css";

const MostReview = () => {
  const products = [
    {
      image: "/images/view 1.png",
      title: "Lorem Ipsum Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,",
      price: "EGP 2,500",
      artist: "Omar Mohsen",
      artistImage: "/images/avatar2.png",
      productLink: "/product-details",
      artistLink: "/artist-profile",
    },
    {
      image: "/images/view 2.png",
      title: "Lorem Ipsum Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,",
      price: "EGP 2,500",
      artist: "Omar Mohsen",
      artistImage: "/images/avatar2.png",
      productLink: "/product-details",
      artistLink: "/artist-profile",
    },
    {
      image: "/images/4.png",
      title: "Lorem Ipsum Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,",
      price: "EGP 2,500",
      artist: "Omar Mohsen",
      artistImage: "/images/avatar2.png",
      productLink: "/product-details",
      artistLink: "/artist-profile",
    },
    {
      image: "/images/view 1.png",
      title: "Lorem Ipsum Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,",
      price: "EGP 2,500",
      artist: "Omar Mohsen",
      artistImage: "/images/avatar2.png",
      productLink: "/product-details",
      artistLink: "/artist-profile",
    },
    {
      image: "/images/view 2.png",
      title: "Lorem Ipsum Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,",
      price: "EGP 2,500",
      artist: "Omar Mohsen",
      artistImage: "/images/avatar2.png",
      productLink: "/product-details",
      artistLink: "/artist-profile",
    },
    {
      image: "/images/4.png",
      title: "Lorem Ipsum Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,",
      price: "EGP 2,500",
      artist: "Omar Mohsen",
      artistImage: "/images/avatar2.png",
      productLink: "/product-details",
      artistLink: "/artist-profile",
    },
  ];

  return (
    <div className="most-views">
      <div className="container">
        <div className="see-all">
          <h2>MOST VIEWS</h2>
          <Link href="/collections">
            See All <IoIosArrowForward />
          </Link>
        </div>
        <div className="most-views">
          <Swiper
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            className="mySwiper"
          >
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <div className="most-views-info">
                  <div className="image-card">
                    <Link href={product.productLink} className="reser-link">
                      <div className="overley"></div>
                      <div className="most-views-image">
                        <Image
                          src={product.image}
                          alt="image"
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
                          <Link href={product.artistLink}>
                            <Image
                              src={product.artistImage}
                              alt="avatar"
                              width={500}
                              height={500}
                              quality={100}
                              loading="lazy"
                            />
                          </Link>
                        </div>
                        <Link href={product.artistLink} className="reser-link">
                          <span>{product.artist}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <h2>{product.title}</h2>
                  <p>{product.description}</p>
                  <h3>{product.price}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MostReview;
