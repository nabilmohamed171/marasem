"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward, IoMdClose } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import "./shop-artist.css";

const Artists = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followedArtists, setFollowedArtists] = useState(new Set());
  const [tags, setTags] = useState([]);

  const sliderContentRef = useRef(null);
  const nextButtonRef = useRef(null);
  const scrollStep = 150;
  const [scrollAmount, setScrollAmount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/artists", {
          withCredentials: true,
        });
        setArtists(response.data.artists);
        setTags(response.data.tags);

        // Extract followed artists based on API response
        const followed = new Set(
          response.data.artists
            .filter((artist) => artist.is_followed) // Ensure the backend provides `is_followed`
            .map((artist) => artist.id)
        );
        setFollowedArtists(followed);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching artists:", error);
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const toggleFollow = async (artistId) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.log("You must be logged in to follow/unfollow artists.");
      return;
    }

    try {
      if (followedArtists.has(artistId)) {
        // Unfollow request
        await axios.post(
          `http://127.0.0.1:8000/api/artists/${artistId}/unfollow`,
          {},
          { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
        );
        setFollowedArtists((prev) => {
          const newSet = new Set(prev);
          newSet.delete(artistId);
          return newSet;
        });
      } else {
        // Follow request
        await axios.post(
          `http://127.0.0.1:8000/api/artists/${artistId}/follow`,
          {},
          { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
        );
        setFollowedArtists((prev) => new Set(prev).add(artistId));
      }
    } catch (error) {
      console.error("Error following/unfollowing artist:", error);
    }
  };

  const handleTagSelection = (tagId) => {
    setSelectedTags((prevSelectedTags) => {
      const isTagSelected = prevSelectedTags.includes(tagId);
      return isTagSelected
        ? prevSelectedTags.filter((t) => t !== tagId)
        : [...prevSelectedTags, tagId];
    });
  };

  const handleRemoveTag = (tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.filter((t) => t !== tag)
    );
  };

  useEffect(() => {
    if (sliderContentRef.current) {
      sliderContentRef.current.style.transform = `translateX(-${scrollAmount}px)`;
    }
  }, [scrollAmount]);

  if (loading) {
    return <div>Loading artists...</div>;
  }

  return (
    <>
      {/* Tags Filter Section */}
      <div className="slider-tags">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-10 position-relative">
              <div className="container">
                <div className="slider-wrapper artists-filter">
                  <ul ref={sliderContentRef} className="list-unstyled slider-content">
                    {tags.map((tag) => (
                      <div
                        className={`tags ${selectedTags.includes(tag.id) ? "active" : ""}`}
                        key={tag.id}
                      >
                        <li onClick={() => handleTagSelection(tag.id)}>{tag.name}</li>
                        {selectedTags.includes(tag.id) && (
                          <span
                            onClick={() => handleRemoveTag(tag.id)}
                            className="icon-x-tags"
                            style={{ display: "inline-block", cursor: "pointer", marginLeft: "10px" }}
                          >
                            <IoMdClose />
                          </span>
                        )}
                      </div>
                    ))}
                  </ul>
                </div>
                <div className="col-md-1">
                  <div ref={nextButtonRef} className="slider-scroll slider-next">
                    <IoIosArrowForward />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Artists List */}
      <div className="container">
        <div className="artists">
          <div className="row">
            {artists
              .filter((artist) =>
                selectedTags.length === 0 || artist.tags.some(tag => selectedTags.includes(tag.id))
              )
              .map((artist) => (
                <div className="col-lg-3 col-md-6 col-12" key={artist.id}>
                  <div className="artist">
                    <div className="row">
                      {artist.most_recent_artworks.map((img, index) => (
                        <div className="col-4" key={index}>
                          <Image
                            src={img !== "" ? img : null}
                            alt={`Artwork ${index}`}
                            width={130}
                            height={105}
                            loading="lazy"
                            className="reser-link"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="artist-info text-center">
                      <div className="user-image">
                        <Link href={`/artist-profile?id=${artist.id}`}>
                          <Image
                            src={artist.profile_picture}
                            alt="User Avatar"
                            width={80}
                            height={80}
                            loading="lazy"
                          />
                        </Link>
                      </div>
                      <h2 className="artist-name">
                        <Link className="reser-link" href={`/artist-profile?id=${artist.id}`}>
                          {artist.first_name} {artist.last_name}
                        </Link>
                      </h2>
                      <span className="address">
                        <FaMapMarkerAlt /> {artist.city ?? "N/A"}, {artist.zone ?? "N/A"}
                      </span>
                    </div>
                    <div className="extra-artist-info text-center">
                      <div className="row">
                        <div className="col-4">
                          <h4>{artist.project_views}</h4>
                          <span>Project Views</span>
                        </div>
                        <div className="col-4">
                          <button
                            onClick={() => toggleFollow(artist.id)}
                            className={
                              followedArtists.has(artist.id)
                                ? "follow-unfollow-active"
                                : ""
                            }
                          >
                            {followedArtists.has(artist.id) ? "Unfollow" : "Follow"}
                          </button>
                        </div>
                        <div className="col-4">
                          <h4>{artist.artworks_count}</h4>
                          <span>Artworks</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Artists;
