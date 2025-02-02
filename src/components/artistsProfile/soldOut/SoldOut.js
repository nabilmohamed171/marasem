import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import "./sold-out.css";

const SoldOut = () => {
  const [favorites, setFavorites] = useState([
    {
      imageSrc: "/images/22.jpeg",
      name: "Artwork 1",
      price: "EGP 2,500",
      isFavorited: false,
      soldTo: "Ahmed Nasser",
    },
    {
      imageSrc: "/images/33.jpeg",
      name: "Lorem Ipsum",
      price: "EGP 2,500",
      isFavorited: false,
      soldTo: "Sara Ahmed",
    },
    {
      imageSrc: "/images/44.jpeg",
      name: "Lorem Ipsum",
      price: "EGP 2,500",
      isFavorited: false,
      soldTo: "Mohamed Ali",
    },
    {
      imageSrc: "/images/66.jpeg",
      name: "Lorem Ipsum",
      price: "EGP 2,500",
      isFavorited: false,
      soldTo: "Fatima Youssef",
    },
    {
      imageSrc: "/images/88.jpeg",
      name: "Lorem Ipsum",
      price: "EGP 2,500",
      isFavorited: false,
      soldTo: "Omar Khattab",
    },
    {
      imageSrc: "/images/77.jpeg",
      name: "Lorem Ipsum",
      price: "EGP 2,500",
      isFavorited: false,
      soldTo: "Laila Samir",
    },
  ]);

  const toggleFavorite = (index) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((item, i) =>
        i === index ? { ...item, isFavorited: !item.isFavorited } : item
      )
    );
  };

  return (
    <div className="collections-artist">
      <div className="row">
        {favorites.map((item, index) => (
          <div key={index} className="col-md-4 col-6">
            <div className="item-image">
              <div className="overley-sold-out"></div>
              <div className="photo">
                <Image
                  src={item.imageSrc}
                  alt={`Artwork ${index + 1}`}
                  width={500}
                  height={500}
                  quality={100}
                />
              </div>
              <div className="overley-info-sold-out">
                <div className="add-cart">
                  <span className="sold-out">Sold Out</span>
                </div>
                <span className="heart">
                  <Link
                    href="#"
                    className="reser-link"
                    onClick={() => toggleFavorite(index)}
                  >
                    {item.isFavorited ? <FaHeart /> : <FaRegHeart />}
                  </Link>
                </span>
                <div className="sold-to">
                  <span>Sold to {item.soldTo}</span>
                </div>
              </div>
            </div>
            <div className="photo-info">
              <h2>{item.name}</h2>
              <p>Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,</p>
              <span>{item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoldOut;
