"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Get collection ID from query params
import axios from "axios";
import Navbar_Home from "@/components/all-navbars/NavbarHome";
import Navbar_Buyer from "@/components/all-navbars/NavbarBuyer";
import Navbar from "@/components/all-navbars/NavbarArtists";
import Upper from "@/components/all-navbars/NavbarUpper";
import Footer from "@/components/footer/Footer";
import FooterAccordion from "@/components/footer/FooterAccordion";
import CollectionsPage from "@/components/collections/CollectionsPage";
import "./collections.css";

const Collections = () => {
  const [userType, setUserType] = useState("guest");

  useEffect(() => {
    const fetchUserType = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user-type", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          withCredentials: true,
        });
        setUserType(response.data.user_type);
      } catch (error) {
        console.error("Error fetching user type:", error);
      }
    };

    fetchUserType();
  }, []);
  const searchParams = useSearchParams();
  const collectionId = searchParams.get("id"); // Get collection ID from URL
  const [collection, setCollection] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!collectionId) return;

    const fetchCollection = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`http://127.0.0.1:8000/api/collections/${collectionId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        });

        setCollection(response.data);
        setIsFollowing(response.data.is_following);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching collection:", error);
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collectionId]);

  const handleFollowClick = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.log("You must be logged in to follow/unfollow this collection.");
      return;
    }

    try {
      if (isFollowing) {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/collections/${collectionId}/unfollow`,
          {},
          { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
        );
        setIsFollowing(false);
      } else {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/collections/${collectionId}/follow`,
          {},
          { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
        );
        setIsFollowing(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized: ", error.response.data.error);
      } else {
        console.error("Error updating follow status:", error);
      }
    }
  };

  if (loading) return <div>Loading collection data...</div>;

  return (
    <>
      <Upper />
      {userType === "artist" ? (
        <Navbar />
      ) : userType === "buyer" ? (
        <Navbar_Buyer />
      ) : (
        <Navbar_Home />
      )}
      <div className="collections-page">
        <div className="container">
          <div className="collections-all">
            <h4>{collection?.artworks_count} Artworks</h4>
            <h2>{collection?.name}</h2>
            <button
              className={`follow-collection ${isFollowing ? "follow-collection-active" : ""}`}
              onClick={handleFollowClick}
            >
              {isFollowing ? "Unfollow Collection" : "Follow Collection"}
            </button>
          </div>
        </div>
      </div>
      <div className="collections-filter-image">
        <CollectionsPage />
      </div>
      <Footer />
      <FooterAccordion />
    </>
  );
};

export default Collections;
