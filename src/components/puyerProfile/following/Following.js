import React, { useState } from "react";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import "./following.css";

const Following = () => {
  const [artists, setArtists] = useState([
    {
      id: 1,
      name: "Omar Mohsen",
      location: "Cairo, Egypt",
      tags: ["Portrait", "Urban"],
      userImage: "/images/avatar2.png",
      projectImages: [
        "/images/view 1.png",
        "/images/view 2.png",
        "/images/view 3.png",
      ],
      projectViews: 5900,
      appreciations: 20300,
    },
    {
      id: 2,
      name: "Ahmed Ali",
      location: "Alexandria, Egypt",
      tags: ["Nature", "Landscape"],
      userImage: "/images/avatar.png",
      projectImages: [
        "/images/view 5.png",
        "/images/view 4.png",
        "/images/1.png",
      ],
      projectViews: 8000,
      appreciations: 15400,
    },
    {
      id: 3,
      name: "Sara Hassan",
      location: "Dubai, UAE",
      tags: ["Fashion", "Street"],
      userImage: "/images/avatar2.png",
      projectImages: ["/images/2.png", "/images/3.png", "/images/4.png"],
      projectViews: 15000,
      appreciations: 25000,
    },
    {
      id: 4,
      name: "Mona Samir",
      location: "London, UK",
      tags: ["Architectural", "Product"],
      userImage: "/images/avatar.png",
      projectImages: ["/images/2.png", "/images/3.png", "/images/4.png"],
      projectViews: 10000,
      appreciations: 18000,
    },
  ]);

  const [followedArtists, setFollowedArtists] = useState(new Set());

  const toggleFollow = (id) => {
    const updatedFollowedArtists = new Set(followedArtists);
    if (updatedFollowedArtists.has(id)) {
      updatedFollowedArtists.delete(id);
    } else {
      updatedFollowedArtists.add(id);
    }
    setFollowedArtists(updatedFollowedArtists);
  };

  return (
    <div className="container">
      <div className="artists">
        <div className="row">
          {artists.map((artist) => (
            <div className="col-lg-4 col-md-6 col-12" key={artist.id}>
              <div className="artist">
                <div className="row">
                  <div className="col-4 p-r-0">
                    <div className="item-image">
                      <Image
                        className="image-one"
                        src={artist.projectImages[0]}
                        alt="Artist Image 1"
                        width={130}
                        height={105}
                        quality={70}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="col-4 p-r-l-5">
                    <div className="item-image">
                      <Image
                        src={artist.projectImages[1]}
                        alt="Artist Image 2"
                        width={130}
                        height={105}
                        quality={70}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="col-4 p-l-0">
                    <div className="item-image">
                      <Image
                        className="image-sec"
                        src={artist.projectImages[2]}
                        alt="Artist Image 3"
                        width={130}
                        height={105}
                        quality={70}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
                <div className="artist-info text-center">
                  <div className="user-image">
                    <Link className="reser-link" href="/artist-profile">
                      <Image
                        src={artist.userImage}
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
                      {artist.name}
                    </Link>
                  </h2>
                  <span className="address">
                    <FaMapMarkerAlt /> {artist.location}
                  </span>
                </div>
                <div className="extra-artist-info text-center">
                  <div className="row">
                    <div className="col-4">
                      <h4>{artist.projectViews}</h4>
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
                      <h4>{artist.appreciations}</h4>
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
