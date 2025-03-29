"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./slider-cate.css";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import axios from "axios";

export const SliderCategory = () => {
  const [sliderItems, setSliderItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/get-categories")
      .then((response) => {
        // response.data.categories is an object where each key maps to an array of categories
        const categoriesObj = response.data.categories;
        // Flatten the object into an array of items
        const sliderArray = Object.entries(categoriesObj).flatMap(
          ([group, items]) =>
            items.map((item) => ({
              ...item,
              group, // Optionally include the group name
              src: item.image || "/images/slider 4.png",
              alt: item.name,
            }))
        );
        setSliderItems(sliderArray);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
      });
  }, []);

  return (
    <div className="container">
      <div className="slider-category">
        <Swiper
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
          breakpoints={{
            0: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 9,
              spaceBetween: 10,
            },
          }}
        >
          {sliderItems.map((item, index) => (
            <SwiperSlide key={index}>
              <Link className="reser-link" href={'/shop-art?term=' + item.name}>
                <Image
                  src={item.src ?? "/images/slider 4.png"}
                  alt={item.alt}
                  width={156}
                  height={156}
                  quality={70}
                  loading="lazy"
                />
                <h3>{item.name}</h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
    </div>
  );
};
