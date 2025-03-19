"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import "./collections.css";

const FirstCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/featured-collections?limit=2&offset=0")
      .then((response) => {
        setCollections(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching featured collections", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading collections...</div>;
  }

  return (
    <div className="first-collections">
      <div className="container">
        <div className="row">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className={`col-md-6 col-6 ${index === 0 ? "first" : "sec"}`}
            >
              <div className="row">
                <div className="col-md-6 col-5">
                  <div className="row">
                    <div className="col">
                      <div className="info">
                        <h2>{collection.title}</h2>
                        <p>
                          {collection.description ||
                            "N/A"}
                        </p>
                        <Link href={`/collections?id=${collection.id}`}>Find</Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-7">
                  <div className="row">
                    {/* Large image: first artwork */}
                    <div className="col-md-8 col-7">
                      <div className="first-image">
                        <Link href={`/collections?id=${collection.id}`}>
                          <Image
                            src={
                              collection.latest_artworks[0]?.cover_img ||
                              "/images/6.png"
                            }
                            alt={collection.title}
                            width={177}
                            height={177}
                            quality={70}
                            loading="lazy"
                          />
                        </Link>
                      </div>
                    </div>
                    {/* Small images: second and third artworks */}
                    <div className="col-md-4 col-5">
                      <div className="sec-image">
                        <Image
                          src={
                            collection.latest_artworks[1]?.cover_img ||
                            "/images/6.png"
                          }
                          alt={collection.title}
                          width={85}
                          height={85}
                          quality={70}
                          loading="lazy"
                        />
                        <div className="dark-theme">
                          <div className="overley-r-r-b"></div>
                          <Image
                            src={
                              collection.latest_artworks[2]?.cover_img ||
                              "/images/6.png"
                            }
                            alt={collection.title}
                            width={85}
                            height={85}
                            quality={70}
                            loading="lazy"
                          />
                        </div>
                        <span>
                          {collection.artworks_count > 999
                            ? floor(collection.artworks_count / 100) + "k"
                            : collection.artworks_count}
                        </span>
                      </div>
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

export default FirstCollections;
