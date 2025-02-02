"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "@/app/_css/login.css";

function CategoriesPage() {
  const [activeItems, setActiveItems] = useState(new Set());

  const toggleActiveClass = (item) => {
    setActiveItems((prevItems) => {
      const updatedItems = new Set(prevItems);
      if (updatedItems.has(item)) {
        updatedItems.delete(item);
      } else {
        updatedItems.add(item);
      }
      return updatedItems;
    });
  };

  const categories = [
    {
      title: "Fine Art",
      items: [
        "Paintings",
        "Drawings",
        "Mosaic",
        "Sculptures",
        "Collage Art",
        "Glass",
      ],
    },
    {
      title: "Hand Craft",
      items: [
        "Ceramics",
        "Leather Craft",
        "Wood Craft",
        "Furniture",
        "Jewelry & Accessories",
        "Fashion Art",
      ],
    },
    {
      title: "Digital Prints",
      items: [
        "Digital Paintings",
        "Illustrations",
        "Posters",
        "3D Print",
        "Photography",
        "Illustrations Books",
        "Printed Products",
      ],
    },
  ];

  return (
    <div className="categories-page">
      <div className="row">
        <div className="col-md-7">
          <div className="categories-header-image">
            <Image
              src="/images/Registration.jpg"
              alt="marasem"
              layout="responsive"
              width={2000}
              height={2000}
              loading="lazy"
              quality={100}
              objectFit="cover"
            />
          </div>
        </div>
        <div className="col">
          <div className="categories-form">
            <div className="website-logo scale-hover">
              <Image
                src="/images/main-logo.png"
                alt="marasem"
                layout="intrinsic"
                width={500}
                height={500}
              />
            </div>
            <span className="skip">
              <Link href="my-wishes">Skip</Link>
              <i className="fa-solid fa-arrow-right"></i>
            </span>
            <div className="cate-info">
              <h2>Select Your Categories</h2>
              <h4>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Ducimus minima, explicabo voluptatem ratione dolor
              </h4>
            </div>
            <form>
              <div className="cate-section">
                <div className="row">
                  {categories.map((category, index) => (
                    <div key={index} className="col-md-12">
                      <h3>{category.title}</h3>
                      <ul className="list-unstyled">
                        {category.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className={
                              activeItems.has(item) ? "active-cate" : ""
                            }
                            onClick={() => toggleActiveClass(item)}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <Link href="pickup-location">
                    <button type="button" className="create-cate-btn">
                      Create
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;
