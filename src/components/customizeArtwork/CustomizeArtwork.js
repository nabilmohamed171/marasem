"use client";
import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import AddAddress from "@/components/addressCart/addAddress/AddAddress";
import Link from "next/link";
import "./customize-artwork.css";

const CustomizeArtwork = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [images, setImages] = useState({ main: null, secondary: [] });
  const [formData, setFormData] = useState({
    size: "",
    price: "",
    description: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const mainImage = URL.createObjectURL(files[0]);
      const secondaryImages = files
        .slice(1, 4)
        .map((file) => URL.createObjectURL(file));
      setImages({ main: mainImage, secondary: secondaryImages });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const newFormData = { ...prevState, [name]: value };
      setIsFormValid(
        newFormData.size &&
          newFormData.price &&
          newFormData.description &&
          images.main
      );
      return newFormData;
    });
  };

  const handleSendRequestClick = () => {
    setShowAddAddress(true);
  };

  if (!isVisible) return null;

  return (
    <div className="customize-artwork">
      <div className="customize-art">
        <div className="artwork">
          <span className="close" onClick={handleClose}>
            <IoClose />
          </span>
          <div className="row">
            <div className="col-md-5">
              <div className="customize-image">
                <div className="main-image-container">
                  <Image
                    src="/images/share-artwork.svg"
                    alt="Main Artwork"
                    className="main-image flex-r-image"
                    width={600}
                    height={600}
                    quality={100}
                    loading="lazy"
                  />
                </div>
                <div className="main-image-upload">
                  {images.main && (
                    <Image
                      src={images.main}
                      alt="Main Artwork"
                      width={500}
                      height={500}
                      quality={100}
                      className="flex-r-image"
                      loading="lazy"
                    />
                  )}
                </div>
                <input
                  className="form-control"
                  type="file"
                  id="formFileMultiple"
                  multiple
                  required
                  onChange={handleImageChange}
                />
                <p className="first">
                  Upload Your artwork, this will also be used
                </p>
                <p className="sec">as the thumbnail in feeds</p>
              </div>
              <div className="row">
                {[...Array(3)].map((_, index) => (
                  <div className="col-md-4 col-4" key={index}>
                    <div className={`iamge-${index + 1}`}>
                      {images.secondary[index] ? (
                        <Image
                          src={images.secondary[index]}
                          alt={`Secondary ${index + 1}`}
                          width={100}
                          height={100}
                          quality={100}
                          className="flex-r-image"
                          loading="lazy"
                        />
                      ) : (
                        <span className="FiUpload">
                          <FiUpload />
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-7 user-info">
              <h2>Customize Artwork</h2>
              <div className="user">
                <div className="user-name">
                  <Image
                    src="/images/avatar2.png"
                    alt="User Avatar"
                    className="img-fluid flex-r-image"
                    width={50}
                    height={50}
                    quality={100}
                    loading="lazy"
                  />
                </div>
                <span className="name">Omer Mohsen</span>
                <span className="address">
                  <FaMapMarkerAlt /> Cairo, Egypt
                </span>
              </div>
              <div className="row g-3">
                <div className="col-md-6 col-6">
                  <label>
                    <span className="main-color">*</span> Size
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="40 x 30 cm"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6 col-6">
                  <label>
                    <span className="main-color">*</span> Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Minimum Price EGP"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-12">
                  <label>Description</label>
                  <textarea
                    className="form-control desc"
                    placeholder="Description here..."
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-12">
                  <div className="button-send-request">
                    {"/request-successfully"}
                    <Link href="">
                      <button
                        type="button"
                        className="btn"
                        disabled={!isFormValid}
                        onClick={handleSendRequestClick}
                      >
                        Send Request
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAddAddress && <AddAddress />}
    </div>
  );
};

export default CustomizeArtwork;
