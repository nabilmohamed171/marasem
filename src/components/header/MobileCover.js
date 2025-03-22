"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import "./mobile-cover.css";

const MobileCover = () => {
  const [headerData, setHeaderData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch header data from the backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/headers")
      .then((response) => {
        setHeaderData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching header data", error);
        setLoading(false);
      });
  }, []);

  if (loading || !headerData) {
    return <div>Loading...</div>;
  }

  // Destructure the header data
  const {
    cover_img,
    most_recent_artwork,
    featured_subcategories,
    featured_categories,
  } = headerData;

  // Use the first artwork from most_recent_artwork if available
  const recentArtwork = most_recent_artwork;

  // For overlay info in left column, take the first three featured subcategories
  const overlaySubcats = featured_subcategories
    ? featured_subcategories.slice(0, 3)
    : [];

  // For the bottom row, take the first three featured categories (if available)
  const bottomCategories = featured_categories
    ? featured_categories.slice(0, 3)
    : [];

  return (
    <div className="main-mobile-cover">
      <div className="row">
        {/* Left Column */}
        <div className="col-6">
          <div className="first-image">
            <Link href="#">
              <Image
                src={cover_img} // dynamic cover image from backend
                alt="Cover Image"
                className="img-fluid"
                width={206}
                height={495}
                loading="lazy"
                quality={70}
              />
            </Link>
            <div className="full-info">
              <ul className="list-unstyled">
                {overlaySubcats.map((subcat) => (
                  <li key={subcat.id} className="full-link">
                    <Link
                      className="reser-link"
                      href={`/shop-art?term=${subcat.name}`}
                    >
                      {subcat.name}
                    </Link>
                  </li>
                ))}
                <li className="full-link">
                  <Link className="reser-link" href="#">
                    & More
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-6">
          <div className="row">
            <div className="col-12">
              <div className="sec-image">
                <Link href={"/product-details?id=" + recentArtwork.id}>
                  {recentArtwork ? (
                    <Image
                      src={
                        recentArtwork.photos &&
                          recentArtwork.photos.length > 0
                          ? recentArtwork.photos[0]
                          : "/images/2.png"
                      }
                      alt={recentArtwork.name || "Recent Artwork"}
                      className="img-fluid"
                      width={225}
                      height={285}
                      loading="lazy"
                      quality={70}
                    />
                  ) : (
                    <Image
                      src="/images/2.png"
                      alt="Image Cover"
                      className="img-fluid"
                      width={225}
                      height={285}
                      loading="lazy"
                      quality={70}
                    />
                  )}
                </Link>
              </div>
            </div>
            <div className="col-12">
              <div className="thr-image">
                <Link href="#">
                  {/* For now, using a static image for SPECIAL COLLECTIONS */}
                  <Image
                    src="/images/3.png"
                    alt="Special Collections"
                    className="img-fluid"
                    width={225}
                    height={285}
                    loading="lazy"
                    quality={70}
                  />
                </Link>
                <div className="large-info">
                  <h2>
                    <Link className="reser-link" href="#">
                      SPECIAL <br /> COLLECTIONS
                    </Link>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Dynamic Featured Categories */}
      <div className="row">
        {bottomCategories.map((category) => (
          <div key={category.id} className="col-4">
            <div className="fou-image">
              <div className="overley-o-b"></div>
              <Link href={`/product-list?category=${category.id}`}>
                <Image
                  src={
                    category.cover_img
                      ? category.cover_img
                      : "/images/6.png"
                  }
                  alt={category.name}
                  className="img-fluid"
                  width={144}
                  height={150}
                  loading="lazy"
                  quality={70}
                />
              </Link>
              <div className="x-small-info">
                <h2>
                  <Link className="reser-link" href={`/product-list?category=${category.id}`}>
                    {category.name}
                  </Link>
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileCover;
