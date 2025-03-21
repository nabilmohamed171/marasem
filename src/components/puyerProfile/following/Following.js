"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import "./following.css";
import axios from "axios";

const Following = ({ data }) => {
  const [followedArtists, setFollowedArtists] = useState(new Set());
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const initialSet = new Set();
      data.forEach((artist) => {
        if (artist.is_followed) {
          initialSet.add(artist.id);
        }
      });
      setFollowedArtists(initialSet);
    }
  }, [data]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/artists");
        setArtists(response.data.artists);

        // Extract followed artists based on API response
        const followed = new Set(
          response.data.artists
            .filter((artist) => artist.is_followed) // Ensure the backend provides `is_followed`
            .map((artist) => artist.id)
        );
        setFollowedArtists(followed);
      } catch (error) {
        console.error("Error fetching artists:", error);
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
          { headers: { Authorization: `Bearer ${token}` } }
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
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFollowedArtists((prev) => new Set(prev).add(artistId));
      }
    } catch (error) {
      console.error("Error following/unfollowing artist:", error);
    }
  };

  return (
    <div className="container">
      <div className="artists">
        <div className="row">
          {data.map((artist) => (
            <div className="col-lg-4 col-md-6 col-12" key={artist.id}>
              <div className="artist">
                <div className="row">
                  <div className="col-4 p-r-0">
                    <div className="item-image">
                      {artist.photos.length > 0 &&
                        <Image
                          className="image-one"
                          src={artist.photos[0]}
                          alt="Artist Image 1"
                          width={130}
                          height={105}
                          quality={70}
                          loading="lazy"
                        />}
                    </div>
                  </div>
                  <div className="col-4 p-r-l-5">
                    <div className="item-image">
                      {artist.photos.length > 1 &&
                        <Image
                          src={artist.photos[1]}
                          alt="Artist Image 2"
                          width={130}
                          height={105}
                          quality={70}
                          loading="lazy"
                        />}
                    </div>
                  </div>
                  <div className="col-4 p-l-0">
                    <div className="item-image">
                      {artist.photos.length > 2 &&
                        <Image
                          className="image-sec"
                          src={artist.photos[2]}
                          alt="Artist Image 3"
                          width={130}
                          height={105}
                          quality={70}
                          loading="lazy"
                        />}
                    </div>
                  </div>
                </div>
                <div className="artist-info text-center">
                  <div className="user-image">
                    <Link className="reser-link" href="/artist-profile">
                      <Image
                        src={artist.profile_picture}
                        alt="User Avatar"
                        width={80}
                        height={80}
                        quality={70}
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <h2 className="artist-name">
                    <Link className="reser-link" href="/artist-profile">
                      {artist.first_name} {artist.last_name}
                    </Link>
                  </h2>
                  <span className="address">
                    <FaMapMarkerAlt /> {artist.city}, {artist.zone}
                  </span>
                </div>
                <div className="extra-artist-info text-center">
                  <div className="row">
                    <div className="col-4">
                      <h4>{artist.views}</h4>
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
                        {followedArtists.has(artist.id) ? "Follow" : "Unfollow"}
                      </button>
                    </div>
                    <div className="col-4">
                      <h4>{artist.likes}</h4>
                      <span>Appreciations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Following;
