import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import { HiDotsHorizontal } from "react-icons/hi";
import Image from "next/image";
import "./cards-allartworks.css";

const CardsAllartworks = () => {
  const artworks = [
    {
      id: 1,
      image: "/images/view 1.png",
      artist: "Omar Mohsen",
      title: "Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,",
      price: "EGP 2,500",
      avatar: "/images/avatar.png",
    },
    {
      id: 2,
      image: "/images/view 2.png",
      artist: "Omar Mohsen",
      title: "Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,",
      price: "EGP 2,500",
      avatar: "/images/avatar.png",
    },
    {
      id: 3,
      image: "/images/view 3.png",
      artist: "Omar Mohsen",
      title: "Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,",
      price: "EGP 2,500",
      avatar: "/images/avatar.png",
    },
    {
      id: 4,
      image: "/images/view 4.png",
      artist: "Omar Mohsen",
      title: "Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,",
      price: "EGP 2,500",
      avatar: "/images/avatar.png",
    },
    {
      id: 5,
      image: "/images/view 5.png",
      artist: "Omar Mohsen",
      title: "Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,",
      price: "EGP 2,500",
      avatar: "/images/avatar.png",
    },
    {
      id: 6,
      image: "/images/view 1.png",
      artist: "Omar Mohsen",
      title: "Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,",
      price: "EGP 2,500",
      avatar: "/images/avatar.png",
    },
    {
      id: 7,
      image: "/images/view 2.png",
      artist: "Omar Mohsen",
      title: "Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,",
      price: "EGP 2,500",
      avatar: "/images/avatar.png",
    },
    {
      id: 8,
      image: "/images/view 3.png",
      artist: "Omar Mohsen",
      title: "Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,",
      price: "EGP 2,500",
      avatar: "/images/avatar.png",
    },
    {
      id: 9,
      image: "/images/view 4.png",
      artist: "Omar Mohsen",
      title: "Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,",
      price: "EGP 2,500",
      avatar: "/images/avatar.png",
    },
    {
      id: 10,
      image: "/images/view 5.png",
      artist: "Omar Mohsen",
      title: "Lorem Ipsum",
      description: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,",
      price: "EGP 2,500",
      avatar: "/images/avatar.png",
    },
  ];

  return (
    <div className="cards-allartworks">
      <div className="container">
        <h2>Related Artworks</h2>
        <div className="row">
          <div className="col-md-9">
            <div className="row">
              {artworks.map((artwork) => (
                <div key={artwork.id} className="col-md-4 col-6">
                  <div className="card-image">
                    <div className="overley"></div>
                    <Image
                      src={artwork.image}
                      alt={artwork.title}
                      width={312}
                      height={390}
                      quality={70}
                      loading="lazy"
                    />
                    <div className="overley-info">
                      <div className="add-cart">
                        <span className="cart-shopping main-color">
                          <HiOutlineShoppingBag />
                        </span>
                        <span className="plus">
                          <GoPlus />
                        </span>
                      </div>
                      <span className="heart">
                        <FaRegHeart />
                      </span>
                      <div className="user-art">
                        <div className="user-image">
                          <Image
                            src={artwork.avatar}
                            alt={artwork.artist}
                            width={50}
                            height={50}
                            quality={70}
                            loading="lazy"
                          />
                        </div>
                        <span>{artwork.artist}</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-info">
                    <h2>{artwork.title}</h2>
                    <p>{artwork.description}</p>
                    <h3>{artwork.price}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-3 col-12">
            <div className="fixed-card d-md-block d-sm-none">
              <div className="main-image">
                <Image
                  src="/images/view 3.png"
                  alt="Artwork"
                  width={312}
                  height={390}
                  quality={70}
                  loading="lazy"
                />
                <div className="info-card">
                  <h2>Artwork Name, Sub Category</h2>
                  <span>Acrylic On Paper</span>
                  <p>
                    11.81 x 19.68 x 2 inches 30 x 50 x 5 cm Lorem Ipsom , Lorem
                    Ipsum
                  </p>
                  <p className="price">EGP 2.500</p>
                  <hr />
                  <div className="row">
                    <div className="col-md-6">
                      <h4 className="fees">Fees</h4>
                    </div>
                    <div className="col-md-6">
                      <p className="value-fees">2%</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-6">
                      <h4 className="total-price">Total Price</h4>
                    </div>
                    <div className="col-md-6">
                      <p className="value-total-price">2.710</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-2">
                      <span className="pars-icon">
                        <HiDotsHorizontal />
                      </span>
                    </div>
                    <div className="col-md-10">
                      <button className="btn-own">Own It</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsAllartworks;
