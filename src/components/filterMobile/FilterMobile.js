"use client";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./filter-mobile.css";
import axios from "axios";

const FilterMobile = () => {
  const [activeSection, setActiveSection] = useState("category-accordion");
  const [activeLink, setActiveLink] = useState(0);
  const [collapsed, setCollapsed] = useState({});
  const [isVisible, setIsVisible] = useState(true);

  const [activeItems, setActiveItems] = useState({
    "category-accordion": [],
    "location-accordion": [],
    "price-accordion": [],
    "foryou-accordion": [],
  });

  const links = [
    { id: "category-accordion", label: "Category" },
    { id: "location-accordion", label: "Location" },
    { id: "price-accordion", label: "Price (EGP)" },
    { id: "foryou-accordion", label: "For you" },
  ];

  // Dynamic data from backend:
  const [categories, setCategories] = useState([]); // featured_categories with subcategories
  // locations is expected as an object: { "Egypt": [{ city: "Cairo", country: "Egypt" }, ...], ... }
  const [locations, setLocations] = useState({});
  const [forYouOptions, setForYouOptions] = useState([]); // collections

  // Static options for Price remain unchanged.
  const [prices] = useState([
    "EGP 500 & Under",
    "EGP 1,000 to 5,000",
    "EGP 5,000 to 10,000",
    "EGP 10,000 & Over",
  ]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/filters/get")
      .then((response) => {
        const data = response.data;
        console.log(data);
        // Use featured_categories for "Category" options.
        setCategories(data.featured_categories || []);
        // Use dynamic locations (grouped by country).
        setLocations(data.locations || {});
        // Use all collections (returned as featured_collections) for "For you" options.
        setForYouOptions(data.featured_collections || []);
      })
      .catch((error) => {
        console.error("Error fetching nav filters", error);
      });
  }, []);

  const handleClearAll = () => {
    setActiveSection("category-accordion");
    setActiveLink(0);
    setCollapsed({});
    setActiveItems({
      "category-accordion": [],
      "location-accordion": [],
      "price-accordion": [],
      "foryou-accordion": [],
    });
  };

  const toggleAccordion = (id) => {
    setCollapsed((prev) => {
      const updatedState = { ...prev };
      Object.keys(updatedState).forEach((key) => {
        if (key !== id) {
          updatedState[key] = false;
        }
      });
      updatedState[id] = !updatedState[id];
      return updatedState;
    });
  };

  const toggleActiveItem = (section, item) => {
    setActiveItems((prev) => {
      const updatedItems = { ...prev };
      if (updatedItems[section].includes(item)) {
        updatedItems[section] = updatedItems[section].filter((i) => i !== item);
      } else {
        updatedItems[section] = [...updatedItems[section], item];
      }
      return updatedItems;
    });
  };

  useEffect(() => {
    setActiveSection("category-accordion");
    setActiveLink(0);
  }, []);

  const handleCloseFilter = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="background-fixed-filter-mobile">
      <div className="filter-mobile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="find">
                <h3>Find</h3>
                <button type="button" className="xmark" onClick={handleCloseFilter}>
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

              {/* Category Accordion Section */}
              {activeSection === "category-accordion" && (
                <div className="accordion-section" id="category-accordion">
                  <div className="accordion accordion-flush" id="accordionFlush">
                    {categories.map((cat) => {
                      const collapseId = "category-collapse-" + cat.id;
                      if(cat.subcategories && cat.subcategories.length) {
                        return (
                          <div key={cat.id} className="accordion-item">
                            <h2 className="accordion-header">
                              <button
                                className={`accordion-button ${collapsed[collapseId] ? "active" : ""}`}
                                type="button"
                                onClick={() => toggleAccordion(collapseId)}
                              >
                                {cat.name}{" "}
                                <span className="selected-count-items">
                                  ( {cat.subcategories ? cat.subcategories.length : 0} )
                                </span>
                                <span
                                  className={`fa ${collapsed[collapseId] ? "fa-chevron-up" : "fa-chevron-down"
                                    } rotate`}
                                ></span>
                              </button>
                            </h2>
                            <div
                              className={`accordion-collapse collapse ${collapsed[collapseId] ? "show" : ""}`}
                            >
                              <div className="accordion-body">
                                <ul className="list-unstyled">
                                  {cat.subcategories &&
                                    cat.subcategories.map((subcat) => (
                                      <li
                                        key={subcat.id}
                                        className={
                                          activeItems["category-accordion"].includes(subcat.name)
                                            ? "active"
                                            : ""
                                        }
                                        onClick={() => toggleActiveItem("category-accordion", subcat.name)}
                                      >
                                        {subcat.name}
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              )}

              {/* Location Accordion Section */}
              {activeSection === "location-accordion" && (
                <div className="accordion-section" id="location-accordion" style={{ display: "block" }}>
                  <div className="accordion accordion-flush">
                    {Object.entries(locations).map(([country, cities], index) => {
                      const collapseId = "location-collapse-" + index;
                      if (country) {
                        return (
                          <div key={country} className="accordion-item">
                            <h2 className="accordion-header">
                              <button
                                className={`accordion-button ${collapsed[collapseId] ? "active" : ""}`}
                                type="button"
                                onClick={() => toggleAccordion(collapseId)}
                              >
                                {country}
                                <span
                                  className={`fa ${collapsed[collapseId] ? "fa-chevron-up" : "fa-chevron-down"} rotate`}
                                ></span>
                              </button>
                            </h2>
                            <div
                              className={`accordion-collapse collapse ${collapsed[collapseId] ? "show" : ""}`}
                            >
                              <div className="accordion-body">
                                <ul className="list-unstyled">
                                  {cities.map((loc) => (
                                    <li
                                      key={loc.city}
                                      className={
                                        activeItems["location-accordion"].includes(loc.city)
                                          ? "active"
                                          : ""
                                      }
                                      onClick={() => toggleActiveItem("location-accordion", loc.city)}
                                    >
                                      {loc.city}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              )}

              {/* Price Accordion Section (Static) */}
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
                            <li
                              key={index}
                              className={activeItems["price-accordion"].includes(item) ? "active" : ""}
                              onClick={() => toggleActiveItem("price-accordion", item)}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* For You Accordion Section (Dynamic Collections) */}
              {activeSection === "foryou-accordion" && (
                <div className="accordion-section" id="foryou-accordion">
                  <div className="accordion accordion-flush">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button active" type="button">
                          For you
                        </button>
                      </h2>
                      <div className="accordion-body">
                        <ul className="list-unstyled">
                          {forYouOptions.map((item) => (
                            <li
                              key={item.id}
                              className={
                                activeItems["foryou-accordion"].includes(item.title)
                                  ? "active"
                                  : ""
                              }
                              onClick={() => toggleActiveItem("foryou-accordion", item.title)}
                            >
                              {item.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="buttons">
                <div className="row">
                  <div className="col-6">
                    <button className="clear" onClick={handleClearAll}>
                      Clear all
                    </button>
                  </div>
                  <div className="col-6">
                    <button className="apply">Apply Filter</button>
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