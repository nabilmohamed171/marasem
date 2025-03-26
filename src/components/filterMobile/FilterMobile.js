"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaTimes } from "react-icons/fa";
import "./filter-mobile.css";
import axios from "axios";

const FilterMobile = ({ closeFilter }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track active section in the accordion
  const [activeSection, setActiveSection] = useState("category-accordion");
  const [activeLink, setActiveLink] = useState(0);
  const [collapsed, setCollapsed] = useState({});
  const [isVisible, setIsVisible] = useState(true);
  const links = [
    { id: "category-accordion", label: "Category" },
    { id: "location-accordion", label: "Location" },
    { id: "price-accordion", label: "Price (EGP)" },
    { id: "foryou-accordion", label: "For you" },
  ];

  // Filter states
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState({});
  const [forYouOptions, setForYouOptions] = useState([]);
  const [prices] = useState([
    "EGP 500 & Under",
    "EGP 1,000 to 5,000",
    "EGP 5,000 to 10,000",
    "EGP 10,000 & Over",
  ]);

  // Get current URL parameters
  const [selectedFilters, setSelectedFilters] = useState({
    category: searchParams.get("category") || "",
    location: searchParams.get("location") || "",
    price: searchParams.get("price") || "",
    forYou: searchParams.get("forYou") || "",
  });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/filters/get", {
      withCredentials: true,
    })
      .then(response => {
        setCategories(response.data.featured_categories || []);
        setLocations(response.data.locations || {});
        setForYouOptions(response.data.featured_collections || []);
      })
      .catch(error => console.error("Error fetching nav filters", error));
  }, []);

  // Update selected filters when URL changes
  useEffect(() => {
    setSelectedFilters({
      category: searchParams.get("category") || "",
      location: searchParams.get("location") || "",
      price: searchParams.get("price") || "",
      forYou: searchParams.get("forYou") || "",
    });
  }, [searchParams]);

  // Update the filters in the URL
  const updateFilters = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.replace(`/shop-art?${params.toString()}`);
  };

  // Handle selecting a filter option
  const handleFilterSelection = (key, value) => {
    setSelectedFilters(prev => ({ ...prev, [key]: value }));
    updateFilters(key, value);
    closeFilter(); // Close modal after selecting
  };

  const handleClearAll = () => {
    router.replace("/shop-art");
    closeFilter();
  };

  return (
    <div className="background-fixed-filter-mobile">
      <div className="filter-mobile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="find">
                <h3>Find</h3>
                <button type="button" className="xmark" onClick={closeFilter}>
                  <FaTimes />
                </button>
              </div>
              <div className="find-links">
                <ul className="list-unstyled">
                  {links.map((link, index) => (
                    <li
                      key={link.id}
                      className={activeLink === index ? "active" : ""}
                      onClick={() => {
                        setActiveLink(index);
                        setActiveSection(link.id);
                      }}
                    >
                      {link.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Category Filter */}
              {activeSection === "category-accordion" && (
                <div className="accordion-section" id="category-accordion">
                  <div className="accordion accordion-flush">
                    {categories.map((cat) => (
                      <div key={cat.id} className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className={`accordion-button ${collapsed[cat.id] ? "active" : ""}`}
                            type="button"
                            onClick={() => setCollapsed(prev => ({ ...prev, [cat.id]: !prev[cat.id] }))}
                          >
                            {cat.name}
                          </button>
                        </h2>
                        <div className={`accordion-collapse collapse ${collapsed[cat.id] ? "show" : ""}`}>
                          <div className="accordion-body">
                            <ul className="list-unstyled">
                              {cat.subcategories.map((subcat) => (
                                <li key={subcat.id} onClick={() => handleFilterSelection("subcategory", subcat.name)}>
                                  {subcat.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location Filter */}
              {activeSection === "location-accordion" && (
                <div className="accordion-section" id="location-accordion">
                  <div className="accordion accordion-flush">
                    {Object.entries(locations).map(([country, cities], index) => (
                      country ?
                        <div key={index} className="accordion-item">
                          <h2 className="accordion-header">
                            <button
                              className={`accordion-button ${collapsed[country] ? "active" : ""}`}
                              type="button"
                              onClick={() => setCollapsed(prev => ({ ...prev, [country]: !prev[country] }))}
                            >
                              {country}
                            </button>
                          </h2>
                          <div className={`accordion-collapse collapse ${collapsed[country] ? "show" : ""}`}>
                            <div className="accordion-body">
                              <ul className="list-unstyled">
                                {[...new Set(cities.map(city => city.city))].map((city, index) => (
                                  <li key={index} onClick={() => handleFilterSelection("location", city)}>
                                    {city}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div> : ''
                    ))}
                  </div>
                </div>
              )}

              {/* Price Filter */}
              {activeSection === "price-accordion" && (
                <div className="accordion-section" id="price-accordion">
                  <div className="accordion accordion-flush">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button active" type="button">
                          Price (EGP)
                        </button>
                      </h2>
                      <div className="accordion-body">
                        <ul className="list-unstyled">
                          {prices.map((item, index) => (
                            <li key={index} onClick={() => handleFilterSelection("price", item)}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* For You Filter */}
              {activeSection === "foryou-accordion" && (
                <div className="accordion-section" id="foryou-accordion">
                  <div className="accordion accordion-flush">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button active" type="button">
                          For You
                        </button>
                      </h2>
                      <div className="accordion-body">
                        <ul className="list-unstyled">
                          {forYouOptions.map((item) => (
                            <li key={item.id} onClick={() => handleFilterSelection("forYou", item.title)}>
                              {item.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="buttons">
                <div className="row">
                  <div className="col-6">
                    <button className="clear" onClick={handleClearAll}>
                      Clear all
                    </button>
                  </div>
                  <div className="col-6">
                    <button className="apply" onClick={closeFilter}>
                      Apply Filter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterMobile;
