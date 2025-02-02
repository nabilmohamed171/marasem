"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";

const NewArtwork = () => {
  const artworks = [
    {
      id: 1,
      image: "/images/22.jpeg",
      artistImage: "/images/avatar2.png",
      artistName: "Omar Mohsen",
      title: "Lorem Ipsum Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,",
      price: "EGP 2,500",
      productLink: "/product-details",
      artistLink: "/artist-profile",
    },
    {
      id: 2,
      image: "/images/33.jpeg",
      artistImage: "/images/avatar2.png",
      artistName: "Omar Mohsen",
      title: "Lorem Ipsum Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,",
      price: "EGP 2,500",
      productLink: "/product-details",
      artistLink: "/artist-profile",
    },
    {
      id: 3,
      image: "/images/44.jpeg",
      artistImage: "/images/avatar2.png",
      artistName: "Omar Mohsen",
      title: "Lorem Ipsum Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,",
      price: "EGP 2,500",
      productLink: "/product-details",
      artistLink: "/artist-profile",
    },
    {
      id: 4,
      image: "/images/77.jpeg",
      artistImage: "/images/avatar2.png",
      artistName: "Omar Mohsen",
      title: "Lorem Ipsum Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,",
      price: "EGP 2,500",
      productLink: "/product-details",
      artistLink: "/artist-profile",
    },
    {
      id: 5,
      image: "/images/66.jpeg",
      artistImage: "/images/avatar2.png",
      artistName: "Omar Mohsen",
      title: "Lorem Ipsum Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,",
      price: "EGP 2,500",
      productLink: "/product-details",
      artistLink: "/artist-profile",
    },
    {
      id: 6,
      image: "/images/88.jpeg",
      artistImage: "/images/avatar2.png",
      artistName: "Omar Mohsen",
      title: "Lorem Ipsum Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,",
      price: "EGP 2,500",
      productLink: "/product-details",
      artistLink: "/artist-profile",
    },
  ];

  return (
    <div className="new-artwork">
      <div className="container">
        <div className="see-all">
          <h2>New Artwork</h2>
          <Link href="/collections">
            See All <IoIosArrowForward />
          </Link>
        </div>
        <div className="new-artwork">
          <Swiper
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 10 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className="mySwiper"
          >
            {artworks.map((artwork) => (
              <SwiperSlide key={artwork.id}>
                <div className="new-artwork-info">
                  <div className="image-card">
                    <Link href={artwork.productLink} className="reser-link">
                      <div className="overley"></div>
                      <div className="new-artwork-image">
                        <Image
                          src={artwork.image}
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
                          <Link href={artwork.artistLink}>
                            <Image
                              src={artwork.artistImage}
                              alt="avatar"
                              width={500}
                              height={500}
                              quality={100}
                              loading="lazy"
                            />
                          </Link>
                        </div>
                        <Link href={artwork.artistLink} className="reser-link">
                          <span>{artwork.artistName}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <h2>{artwork.title}</h2>
                  <p>{artwork.description}</p>
                  <h3>{artwork.price}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default NewArtwork;
