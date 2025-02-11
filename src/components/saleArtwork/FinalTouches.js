"use client";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import Link from "next/link";
import "./share-artwork.css";

const FinalTouches = () => {
  const [tags, setTags] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isPublishActive, setIsPublishActive] = useState(true);
  const [isCollectionVisible, setIsCollectionVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isCollectionsSelectedVisible, setIsCollectionsSelectedVisible] =
    useState(false);
  const [isCustomizable, setIsCustomizable] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const value = e.target.value.trim();
    if (!value || tags.length >= 10 || tags.includes(value)) return;

    setTags((prevTags) => {
      const updatedTags = [...prevTags, value];
      setIsPublishActive(updatedTags.length > 0);
      return updatedTags;
    });
    e.target.value = "";
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
    setIsPublishActive(tags.length > 0);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const addTagFromSuggestion = (tag) => {
    if (tags.length >= 10 || tags.includes(tag)) return;
    setTags((prevTags) => {
      const updatedTags = [...prevTags, tag];
      setIsPublishActive(updatedTags.length > 0);
      return updatedTags;
    });
  };

  const handleAddToCollection = () => {
    setIsCollectionVisible(true);
    setIsButtonVisible(false);
    setIsCollectionsSelectedVisible(true);
  };

  const handleCustomizableChange = (e) => {
    setIsCustomizable(e.target.checked);
  };

  return (
    isOpen && (
      <div className="final-touches">
        <div className="final">
          <div className="container my-5">
            <h3>Final Touches</h3>
            <span className="close-popup" onClick={closePopup}>
              <IoClose />
            </span>

            <div className="mb-3">
              <label htmlFor="tags" className="form-label">
                Tags (Max 10)
              </label>

              <div className="tags-input-container">
                {tags.map((tag, index) => (
                  <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}>
                      <IoClose />
                    </span>
                  </div>
                ))}
                <input
                  onKeyDown={handleKeyDown}
                  type="text"
                  className="tags-input"
                  placeholder="Type something"
                />
              </div>
            </div>

            <ul className="list-unstyled">
              <span>Suggestions: </span>
              <li onClick={() => addTagFromSuggestion("Egyptians")}>
                Egyptians
              </li>
              <li onClick={() => addTagFromSuggestion("Vintage")}>Vintage</li>
              <li onClick={() => addTagFromSuggestion("Modern")}>Modern</li>
              <li onClick={() => addTagFromSuggestion("Abstract")}>Abstract</li>
              <li onClick={() => addTagFromSuggestion("Minimalist")}>
                Minimalist
              </li>
            </ul>
            <hr />
            <p>Access the features below with marasem</p>
            <div className="row">
              <div className="col-md-8 col-12 add-collection">
                <h3>
                  <span className="main-color">+ </span>Add to collection
                </h3>
                <p>Collect & group your Related Artworks</p>
              </div>
              <div className="col-md-4 col-12 buttons-add-collections">
                {isButtonVisible && (
                  <button
                    className="btn btn-collection"
                    onClick={handleAddToCollection}
                  >
                    Add to collection
                  </button>
                )}

                {isCollectionsSelectedVisible && (
                  <div className="collections-selected">
                    <span className="selected">
                      <span className="check">
                        <FaCheck />
                      </span>
                      3 Collections Selected
                    </span>
                  </div>
                )}
              </div>
            </div>
            <hr />
            <div className="row buttons-save-pub">
              <div className="col-6 buttons-save">
                <Link href="/request-successfully">
                  <button className="btn">Save as draft</button>
                </Link>
              </div>
              <div className="col-6 buttons-pub">
                <Link href="/request-successfully">
                  <button className="btn" disabled={!isPublishActive}>
                    Publish
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default FinalTouches;
