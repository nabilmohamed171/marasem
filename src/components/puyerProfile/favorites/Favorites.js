import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";

const items = [
  {
    name: "Lorem Ipsum",
    description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum",
    price: "EGP 2,500",
    imageSrc: "/images/22.jpeg",
    artist: "Omar Mohsen",
    artistImage: "/images/avatar2.png",
    isFavorited: true,
  },
  {
    name: "Lorem Ipsum",
    description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum",
    price: "EGP 3,000",
    imageSrc: "/images/33.jpeg",
    artist: "Ahmed Ali",
    artistImage: "/images/avatar2.png",
    isFavorited: true,
  },
  {
    name: "Lorem Ipsum",
    description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum",
    price: "EGP 4,500",
    imageSrc: "/images/7.png",
    artist: "Fatma Nabil",
    artistImage: "/images/avatar2.png",
    isFavorited: true,
  },
  {
    name: "Lorem Ipsum",
    description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum",
    price: "EGP 2,500",
    imageSrc: "/images/view 1.png",
    artist: "Omar Mohsen",
    artistImage: "/images/avatar2.png",
    isFavorited: true,
  },
  {
    name: "Lorem Ipsum",
    description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum",
    price: "EGP 3,000",
    imageSrc: "/images/view 2.png",
    artist: "Ahmed Ali",
    artistImage: "/images/avatar2.png",
    isFavorited: true,
  },
  {
    name: "Lorem Ipsum",
    description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum",
    price: "EGP 4,500",
    imageSrc: "/images/view 3.png",
    artist: "Fatma Nabil",
    artistImage: "/images/avatar2.png",
    isFavorited: true,
  },
];

const Favorites = ({ items }) => {
  const [favorites, setFavorites] = useState(items);

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
                    {item.isFavorited ? <FaHeart /> : <FaRegHeart />}
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
    </div>
  );
};

export default function App() {
  return <Favorites items={items} />;
}
