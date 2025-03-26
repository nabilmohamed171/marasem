// Changes in FinalTouches component:

import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import Link from "next/link";
import "./share-artwork.css";

const FinalTouches = ({ tags: availableTags = [], collections: availableCollections = [], onFinalize, onSave }) => {
  const [customTags, setCustomTags] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isPublishActive, setIsPublishActive] = useState(true);
  const [isCollectionVisible, setIsCollectionVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isCollectionsSelectedVisible, setIsCollectionsSelectedVisible] = useState(false);
  const [isCustomizable, setIsCustomizable] = useState(false);
  const [description, setDescription] = useState("");

  // Update parent with final touches data whenever these values change
  useEffect(() => {
    if (onFinalize) {
      onFinalize({
        tags: customTags,
        collections: selectedCollections,
        customizable: isCustomizable,
        description,
      });
    }
  }, [customTags, selectedCollections, isCustomizable, description, onFinalize]);

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const value = e.target.value.trim();
    if (!value || customTags.length >= 10 || customTags.includes(value)) return;
    setCustomTags((prevTags) => {
      const updatedTags = [...prevTags, value];
      setIsPublishActive(updatedTags.length > 0);
      return updatedTags;
    });
    e.target.value = "";
  };

  const removeTag = (index) => {
    setCustomTags(customTags.filter((_, i) => i !== index));
    setIsPublishActive(customTags.length > 0);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const addTagFromSuggestion = (tag) => {
    if (customTags.length >= 10 || customTags.includes(tag)) return;
    setCustomTags((prevTags) => {
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

  const toggleCollection = (collectionId) => {
    setSelectedCollections((prev) => {
      if (prev.includes(collectionId)) {
        return prev.filter((id) => id !== collectionId);
      } else {
        return [...prev, collectionId];
      }
    });
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

            {/* Tags Input Section */}
            <div className="mb-3">
              <label htmlFor="tags" className="form-label">
                Tags (Max 10)
              </label>
              <div className="tags-input-container">
                {customTags.map((tag, index) => (
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

            {/* Tag Suggestions */}
            <ul className="list-unstyled">
              <span>Suggestions: </span>
              {availableTags.map((tag) => (
                <li key={tag.id} onClick={() => addTagFromSuggestion(tag.name)}>
                  {tag.name}
                </li>
              ))}
            </ul>
            <hr />

            {/* Collection Section */}
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
                  <button className="btn btn-collection" onClick={handleAddToCollection}>
                    Add to collection
                  </button>
                )}
                {isCollectionsSelectedVisible && (
                  <div className="collections-selected">
                    <span className="selected">
                      <span className="check">
                        <FaCheck />
                      </span>
                      {selectedCollections.length} Collections Selected
                    </span>
                  </div>
                )}
              </div>
            </div>
            {isCollectionVisible && (
              <div className="available-collections">
                <h4>Available Collections</h4>
                <ul className="list-unstyled">
                  {availableCollections.map((collection) => (
                    <li
                      key={collection.id}
                      onClick={() => toggleCollection(collection.id)}
                      className={selectedCollections.includes(collection.id) ? "active" : ""}
                      style={{ cursor: "pointer", padding: "5px 0" }}
                    >
                      {collection.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <hr />
            <div className="row buttons-save-pub">
              <div className="col-6 buttons-save">
                <button className="btn" onClick={() => onSave(false)}>
                  Save as draft
                </button>
              </div>
              <div className="col-6 buttons-pub">
                <button className="btn" onClick={() => onSave(true)} disabled={!isPublishActive}>
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default FinalTouches;
