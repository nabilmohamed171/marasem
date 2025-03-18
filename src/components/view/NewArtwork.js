"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";
import "./most-views.css";
import axios from "axios";

const NewArtwork = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/latest-artworks?limit=6")
      .then((response) => {
        setArtworks(response.data);
        console.log(response.data)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching latest artworks", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading artworks...</div>;
  }

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
                          src={artwork.photos[0]}
                          alt={artwork.title}
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
                              width={50}
                              height={50}
                              quality={70}
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
                  {Object.values(artwork.sizes_prices)[0] ? (
                    <h3>
                      {"EGP " +
                        Number(Object.values(artwork.sizes_prices)[0]).toLocaleString("en-US")}
                    </h3>
                  ) : (
                    <h3>N/A</h3>
                  )}
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
