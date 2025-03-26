"use client";
import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FiUpload } from "react-icons/fi";
import { TbPointFilled } from "react-icons/tb";
import { ImBin } from "react-icons/im";
import FinalTouches from "./FinalTouches";
import Image from "next/image";
import "./share-artwork.css";
import axios from "axios";

const ShareArtwork = () => {
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [showOverlayImage, setShowOverlayImage] = useState(false);
  const [artworkName, setArtworkName] = useState("");
  const [artworkType, setArtworkType] = useState("");
  const [artworkStatus, setArtworkStatus] = useState("");
  const [sizes, setSizes] = useState([{ size: "", price: "" }]);
  const [showFinalTouches, setShowFinalTouches] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [subCategory, setSubCategory] = useState("");
  const [categories, setCategories] = useState({});
  const [tags, setTags] = useState([]);
  const [collections, setCollections] = useState([]);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  // Add new state variables at the top of ShareArtwork:
  const [files, setFiles] = useState([]);
  const [finalTouchesData, setFinalTouchesData] = useState({
    subcategories: [],
    collections: [],
    customizable: false,
    duration: "",
  });

  const [imageUploaded, setImageUploaded] = useState(false);

  const addSize = () => {
    setSizes([...sizes, { size: "", price: "", showDelete: true }]);
  };

  const removeSize = (index) => {
    const updatedSizes = sizes.filter((_, i) => i !== index);
    setSizes(updatedSizes);
  };

  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    const imagesArray = selectedFiles.map((file) => URL.createObjectURL(file));
    if (imagesArray.length > 7) {
      setImages(imagesArray.slice(0, 7));
    } else {
      setImages(imagesArray);
    }
    setMainImage(imagesArray[0]);
    setShowOverlayImage(true);
    setImageUploaded(true);
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index][field] = value;
    setSizes(updatedSizes);
  };

  const handleContinueClick = () => {
    setShowFinalTouches((prevState) => !prevState);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const validateForm = () => {
    const isFormComplete =
      artworkName &&
      artworkType &&
      artworkStatus &&
      sizes.every((size) => size.size && size.price) &&
      mainImage &&
      subCategory;

    setIsFormValid(isFormComplete);
  };

  useEffect(() => {
    validateForm();
  }, [artworkName, artworkType, artworkStatus, sizes, mainImage, subCategory]);

  const handleNumberInput = (e) => {
    const regex = /^[0-9]*$/;
    if (!regex.test(e.target.value)) {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://127.0.0.1:8000/api/get-categories", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);


  // Fetch tags and collections
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/tags/all", {
          withCredentials: true,
        });
        setTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://127.0.0.1:8000/api/collections", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    fetchCollections();
  }, []);

  // Add new function to handle artwork creation:
  const handleCreateArtwork = async (publish = true) => {
    try {
      const token = localStorage.getItem("authToken");
      const formData = new FormData();
      formData.append("name", artworkName);
      files.forEach((file) => formData.append("images[]", file));
      formData.append("art_type", artworkType);
      formData.append("artwork_status", artworkStatus);
      // make sizes an array
      sizes.forEach((s) => formData.append("sizes[]", s.size));
      sizes.forEach((s) => formData.append("prices[]", s.price));
      // Use finalTouchesData.description as the artwork story
      formData.append("description", description);
      finalTouchesData.collections.forEach((col) =>
        formData.append("collections[]", col)
      );
      formData.append("customizable", artworkStatus == "both" || artworkStatus == "customized_only" ? 1 : 0);
      if (artworkStatus == "both" || artworkStatus == "customized_only") {
        formData.append("duration", duration);
      }
      formData.append("pending", publish ? 0 : 1);
      // add tags array
      finalTouchesData.tags.forEach((tag) => formData.append("tags[]", tag));

      const response = await axios.post("http://127.0.0.1:8000/api/artworks", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(response.data);
      // Redirect
      window.location.href = "/request-successfully";
    } catch (error) {
      console.error("Error creating artwork:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="share-artwork">
          <div className="row">
            <div className="col-12">
              <div className="buttons">
                {/* <button className="save-as" type="button">
                  Save as draft
                </button> */}
                <button
                  className="continue"
                  type="button"
                  onClick={handleContinueClick}
                  style={{
                    opacity: isFormValid ? 1 : 1,
                    pointerEvents: "auto",
                    transition: "opacity 0.3s ease",
                  }}
                >
                  Continue <IoIosArrowForward />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showFinalTouches && <FinalTouches />}

      <div className="container">
        <div className="share-artwork-upload-images">
          <div className="container-share-artwork">
            <div className="row">
              <div className="col-md-2 col-12 order-2 order-md-1">
                <div className="upload-inputs">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="upload-container">
                      <div className="upload">
                        {images[index + 1] ? (
                          <Image
                            src={images[index + 1]}
                            alt={`Uploaded preview ${index}`}
                            width={145}
                            height={70}
                            quality={70}
                            className="side-image flex-r-image"
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
              <div className="col-md-6 col-12 order-1 order-md-2">
                <div className="multi-upload">
                  <div className="multi-upload-center">
                    <div className="main-image-container">
                      <Image
                        src="/images/share-artwork.svg"
                        alt="Main Artwork"
                        className="main-image"
                        width={480}
                        height={480}
                        quality={70}
                      />
                    </div>

                    {showOverlayImage && (
                      <div className="overlay-image-container">
                        <Image
                          src={mainImage || "/images/overlay-image.svg"}
                          alt="Overlay Image"
                          className="overlay-image flex-r-image"
                          width={480}
                          height={480}
                          quality={70}
                        />
                      </div>
                    )}

                    <h3>Upload Your Artwork</h3>
                    <p>This is also used as the photo in feeds.</p>
                    <span className="point-icon">
                      <TbPointFilled />
                    </span>

                    <p className={`title ${imageUploaded ? "hidden" : ""}`}>
                      Title Lorem Ipsum, Title Lorem Ipsum
                    </p>

                    <input
                      className="form-control"
                      type="file"
                      id="formFileMultiple"
                      multiple
                      onChange={handleImageUpload}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12 order-3 order-md-3">
                <div className="form-group">
                  <label htmlFor="artworkName">
                    <span className="main-color">*</span>Artwork Name
                  </label>
                  <input
                    type="text"
                    id="artworkName"
                    value={artworkName}
                    onChange={(e) => setArtworkName(e.target.value)}
                    className="form-control"
                    placeholder="Enter Artwork Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="artworkType">
                    <span className="main-color">*</span>Artwork Type
                  </label>
                  <select
                    id="artworkType"
                    value={artworkType}
                    onChange={(e) => {
                      setArtworkType(e.target.value);
                      setSubCategory("");
                    }}
                    className="form-control"
                    required
                  >
                    <option value="">Select Type</option>
                    {Object.keys(categories).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {artworkType && (
                  <div className="form-group">
                    <label htmlFor="subCategory">
                      <span className="main-color">*</span>Sub Category
                    </label>
                    <select
                      id="subCategory"
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                      className="form-control"
                      required
                    >
                      <option value="">Select Sub Category</option>
                      {categories[artworkType]?.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="artworkStatus">
                    <span className="main-color">*</span>Artwork Status
                  </label>
                  <select
                    id="artworkStatus"
                    value={artworkStatus}
                    onChange={(e) => setArtworkStatus(e.target.value)}
                    className="form-control"
                    required
                  >
                    <option value="">Select Artwork Status</option>
                    <option value="ready_to_ship">Ready to Ship</option>
                    <option value="customized_only">Customize Only</option>
                    <option value="both">
                      Both (Ready to ship & able to Customize)
                    </option>
                  </select>
                </div>

                {(artworkStatus === "customized_only" || artworkStatus === "both") && (
                  <div className="form-group">
                    <label htmlFor="customizeTime">
                      <span className="main-color">*</span>Customize Time
                    </label>
                    <select
                      id="customizeTime"
                      className="form-control"
                      required
                      value={duration}
                      onChange={(e) =>
                        setDuration(e.target.value)
                      }
                    >
                      <option value="">Select Customize Time</option>
                      <option value="5">5 Working Days</option>
                      <option value="15">15 Working Days</option>
                      <option value="20">20 Working Days</option>
                    </select>
                  </div>
                )}

                <div className="form-group">
                  {sizes.map((size, index) => (
                    <div key={index} className="row size-price-grid">
                      <div className="col-6">
                        <label htmlFor="size">
                          <span className="main-color">*</span>Size (cm)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={size.size}
                          onChange={(e) =>
                            handleSizeChange(index, "size", e.target.value)
                          }
                          placeholder="Enter Size"
                          required
                          onInput={handleNumberInput}
                        />
                      </div>

                      <div className="col-6">
                        <label htmlFor="size">
                          <span className="main-color">*</span>Price
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={size.price}
                          onChange={(e) =>
                            handleSizeChange(index, "price", e.target.value)
                          }
                          placeholder="Enter Price"
                          required
                          onInput={handleNumberInput}
                        />
                        <span className="egp">EGP</span>
                      </div>

                      {index > 0 && (
                        <div className="remove-size-price">
                          <span onClick={() => removeSize(index)}>
                            <ImBin />
                          </span>
                        </div>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    className="add-new-size main-color"
                    onClick={addSize}
                  >
                    + Add New Size
                  </button>
                </div>
                <hr />
                <div className="story">
                  <label htmlFor="story">
                    <span className="main-color"></span>The Story
                  </label>
                  <textarea
                    id="story"
                    rows="4"
                    className="form-control"
                    placeholder="Enter your story here"
                    onChange={handleDescriptionChange}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showFinalTouches && (
        <FinalTouches
          tags={tags}
          collections={collections}
          onFinalize={setFinalTouchesData}
          onSave={handleCreateArtwork}
        />
      )}
    </>
  );
};

export default ShareArtwork;
