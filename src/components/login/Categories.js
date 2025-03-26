"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import "@/app/_css/login.css";
import { useRouter } from "next/navigation";

function CategoriesPage() {
  const [activeItems, setActiveItems] = useState(new Set());
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
    const router = useRouter();

  // Fetch categories and user's followed subcategories from backend
  useEffect(() => {
    const fetchFocus = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://127.0.0.1:8000/api/artist/focus", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        // response.data contains: categories (with subcategories) and user_subcategories array
        setCategories(response.data.categories);
        setActiveItems(new Set(response.data.user_subcategories));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching focus data:", error);
        setLoading(false);
      }
    };
    fetchFocus();
  }, []);

  const toggleActiveClass = (subId) => {
    setActiveItems((prevItems) => {
      const updated = new Set(prevItems);
      if (updated.has(subId)) {
        updated.delete(subId);
      } else {
        updated.add(subId);
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        "http://127.0.0.1:8000/api/artist/focus",
        { subcategories: Array.from(activeItems) },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      console.log(response.data.message);
      router.push("/pickup-location");
    } catch (error) {
      console.error("Error updating focus:", error);
    }
  };

  const handleSkip = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        "http://127.0.0.1:8000/api/artist/focus",
        { subcategories: [] },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      console.log(response.data.message);
      router.push("/pickup-location");
    } catch (error) {
      console.error("Error updating focus (skip):", error);
    }
  };

  if (loading) return <div>Loading...</div>;

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
        <div className="col-md-5 col-12">
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
              <Link href="#" onClick={handleSkip}>Skip</Link>
              <i className="fa-solid fa-arrow-right"></i>
            </span>
            <div className="cate-info">
              <h2>Select Your Categories</h2>
              <h4>
                Choose the art styles that best represent your work. You can
                update this later if needed.
              </h4>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="cate-section">
                <div className="row">
                  {categories.map((category) => (
                    <div key={category.id} className="col-12">
                      <h3>{category.name}</h3>
                      <ul className="list-unstyled">
                        {category.subcategories.map((sub) => (
                          <li
                            key={sub.id}
                            className={activeItems.has(sub.id) ? "active-cate" : ""}
                            onClick={() => toggleActiveClass(sub.id)}
                          >
                            {sub.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <button type="submit" className="create-cate-btn">
                    Create
                  </button>
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
