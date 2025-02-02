"use client";
import { useState } from "react";
import NavbarBuyer from "@/components/navbar/NavbarArtists";
import Upper from "@/components/navbar/Upper";
import Footer from "@/components/footer/Footer";
import FooterAccordion from "@/components/footer/FooterAccordion";
import CollectionsPage from "@/components/collections/CollectionsPage";
import "./collections.css";

const Collections = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <>
      <Upper />
      <NavbarBuyer />
      <div className="collections-page">
        <div className="container">
          <div className="collections-all">
            <h4>102 Artworks</h4>
            <h2>Special Collection Art</h2>
            <button
              className={`follow-collection ${
                isFollowing ? "follow-collection-active" : ""
              }`}
              onClick={handleFollowClick}
            >
              {isFollowing ? "Unfollow Collection" : "Follow Collection"}
            </button>
          </div>
        </div>
      </div>
      <CollectionsPage />
      <Footer />
      <FooterAccordion />
    </>
  );
};

export default Collections;
