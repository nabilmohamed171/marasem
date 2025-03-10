import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";

const Gallary = () => {
  const [items, setItems] = useState([
    {
      name: "Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum",
      price: "EGP 2,500",
      imageSrc: "/images/22.jpeg",
      artist: "Omar Mohsen",
      artistImage: "/images/avatar2.png",
      isFavorited: false,
    },
    {
      name: "Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum",
      price: "EGP 3,000",
      imageSrc: "/images/88.jpeg",
      artist: "Ahmed Ali",
      artistImage: "/images/avatar2.png",
      isFavorited: false,
    },
    {
      name: "Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum",
      price: "EGP 4,000",
      imageSrc: "/images/1.png",
      artist: "Fatma Nabil",
      artistImage: "/images/avatar2.png",
      isFavorited: false,
    },
    {
      name: "Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum",
      price: "EGP 5,000",
      imageSrc: "/images/view 2.png",
      artist: "Sara Ibrahim",
      artistImage: "/images/avatar2.png",
      isFavorited: false,
    },
    {
      name: "Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum",
      price: "EGP 6,000",
      imageSrc: "/images/view 4.png",
      artist: "Mohamed Youssef",
      artistImage: "/images/avatar2.png",
      isFavorited: false,
    },
    {
      name: "Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum",
      price: "EGP 7,500",
      imageSrc: "/images/view 5.png",
      artist: "Nadia Mansour",
      artistImage: "/images/avatar2.png",
      isFavorited: false,
    },
  ]);

  const toggleFavorite = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, isFavorited: !item.isFavorited } : item
      )
    );
  };

  return (
    <div className="row">
      {items.map((item, index) => (
        <div key={index} className="col-md-4 col-6">
          <div className="item-image">
            <div className="overley"></div>
            <div className="photo">
              <Image
                src={item.imageSrc}
                alt={`Artwork ${index + 1}`}
                width={312}
                height={390}
                quality={70}
                loading="lazy"
              />
            </div>
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
                  onClick={() => toggleFavorite(index)}
                >
                  {item.isFavorited ? <FaHeart /> : <FaRegHeart />}{" "}
                </Link>
              </span>
              <div className="user-art">
                <div className="user-image">
                  <Image
                    src={item.artistImage}
                    alt="avatar"
                    width={50}
                    height={50}
                    quality={70}
                    loading="lazy"
                  />
                </div>
                <Link href="#" className="reser-link">
                  <span>{item.artist}</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="photo-info">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <span>{item.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallary;
