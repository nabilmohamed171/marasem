"use client";
import React, { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import AddAddress from "@/components/addressCart/addAddress/AddAddress";
import Link from "next/link";
import "./customize-artwork.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const CustomizeArtwork = ({ artwork }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [images, setImages] = useState({ main: null, secondary: [] });
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    size: "",
    price: "",
    description: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const router = useRouter();

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles); // store file objects
    if (selectedFiles.length > 0) {
      const mainImage = URL.createObjectURL(selectedFiles[0]);
      const secondaryImages = selectedFiles.slice(1, 4).map((file) =>
        URL.createObjectURL(file)
      );
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

  useEffect(() => {
    if (selectedAddressId !== null) {
      handlePlaceCustomOrder();
    }
  }, [selectedAddressId]);

  // Add the following function to handle order submission:
  const handlePlaceCustomOrder = async () => {
    // Ensure required data is present
    try {
      const token = localStorage.getItem("authToken");
      const formDataPayload = new FormData();
      formDataPayload.append("artist_id", artwork.artist.id);
      formDataPayload.append("desired_size", formData.size);
      formDataPayload.append("offering_price", parseFloat(formData.price));
      formDataPayload.append("address_id", selectedAddressId);
      formDataPayload.append("description", formData.description);
      files.forEach((file) => {
        formDataPayload.append("reference_images[]", file);
      });
      const response = await axios.post("http://127.0.0.1:8000/api/custom-order", formDataPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(response.data.message);
      setTimeout(() => {
        router.push(`/request-successfully?customized_id=${response.data.customized_order.id}`);
      }, 2000);
    } catch (error) {
      console.error("Error placing customized order:", error);
    }
  };

  const onAddressCreated = (addressId) => {
    setSelectedAddressId(addressId);
    setShowAddAddress(false);
  };

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
                    width={118}
                    height={110}
                    quality={70}
                    loading="lazy"
                  />
                </div>
                <div className="main-image-upload">
                  {images.main && (
                    <Image
                      src={images.main}
                      alt="Main Artwork"
                      width={413}
                      height={390}
                      quality={70}
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
                          width={126}
                          height={60}
                          quality={70}
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
                    src={artwork?.artist?.profile_picture}
                    alt="User Avatar"
                    className="img-fluid flex-r-image"
                    width={50}
                    height={50}
                    quality={70}
                    loading="lazy"
                  />
                </div>
                <span className="name">{artwork?.artist?.first_name} {artwork?.artist?.last_name}</span>
                <span className="address">
                  <FaMapMarkerAlt /> {artwork?.artist?.artistDetails?.city} {artwork?.artist?.artistDetails?.zone}
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
                    <Link href="#">
                      <button
                        type="button"
                        className="btn"
                        disabled={!isFormValid}
                        onClick={() => {
                          if (!selectedAddressId) {
                            setShowAddAddress(true);
                          } else {
                            handlePlaceCustomOrder();
                          }
                        }}
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
      {showAddAddress && (
        <AddAddress onClose={onAddressCreated} />
      )}
    </div>
  );
};

export default CustomizeArtwork;
