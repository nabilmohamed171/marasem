"use client";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./filter-mobile.css";

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

  const clearFilters = () => {
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
                <button
                  type="button"
                  className="xmark"
                  onClick={handleCloseFilter}
                >
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

              <div
                className="accordion-section"
                id="category-accordion"
                style={{
                  display:
                    activeSection === "category-accordion" ? "block" : "none",
                }}
              >
                <div className="accordion accordion-flush" id="accordionFlush">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${
                          collapsed["category-collapseOne"] ? "active" : ""
                        }`}
                        type="button"
                        onClick={() => toggleAccordion("category-collapseOne")}
                      >
                        Fine Art{" "}
                        <span className="selected-count-items"> ( 3 )</span>
                        <span
                          className={`fa ${
                            collapsed["category-collapseOne"]
                              ? "fa-chevron-up"
                              : "fa-chevron-down"
                          } rotate`}
                        ></span>
                      </button>
                    </h2>
                    <div
                      className={`accordion-collapse collapse ${
                        collapsed["category-collapseOne"] ? "show" : ""
                      }`}
                    >
                      <div className="accordion-body">
                        <ul className="list-unstyled">
                          {[
                            "Painting",
                            "Sculpture",
                            "Drawing & Illustration",
                            "Digital Visual Arts",
                            "Photography",
                            "Applied Arts",
                          ].map((item) => (
                            <li
                              key={item}
                              className={
                                activeItems["category-accordion"].includes(item)
                                  ? "active"
                                  : ""
                              }
                              onClick={() =>
                                toggleActiveItem("category-accordion", item)
                              }
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${
                          collapsed["category-collapseTwo"] ? "active" : ""
                        }`}
                        type="button"
                        onClick={() => toggleAccordion("category-collapseTwo")}
                      >
                        Hand Craft{" "}
                        <span className="selected-count-items"> ( 3 )</span>
                        <span
                          className={`fa ${
                            collapsed["category-collapseTwo"]
                              ? "fa-chevron-up"
                              : "fa-chevron-down"
                          } rotate`}
                        ></span>
                      </button>
                    </h2>
                    <div
                      className={`accordion-collapse collapse ${
                        collapsed["category-collapseTwo"] ? "show" : ""
                      }`}
                    >
                      <div className="accordion-body">
                        <ul className="list-unstyled">
                          {[
                            "Pottery",
                            "Woodworking",
                            "Weaving",
                            "Leathercraft",
                            "Metalworking",
                            "Glassblowing",
                          ].map((item) => (
                            <li
                              key={item}
                              className={
                                activeItems["category-accordion"].includes(item)
                                  ? "active"
                                  : ""
                              }
                              onClick={() =>
                                toggleActiveItem("category-accordion", item)
                              }
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${
                          collapsed["category-collapseThree"] ? "active" : ""
                        }`}
                        type="button"
                        onClick={() =>
                          toggleAccordion("category-collapseThree")
                        }
                      >
                        Digital Art{" "}
                        <span className="selected-count-items"> ( 3 )</span>
                        <span
                          className={`fa ${
                            collapsed["category-collapseThree"]
                              ? "fa-chevron-up"
                              : "fa-chevron-down"
                          } rotate`}
                        ></span>
                      </button>
                    </h2>
                    <div
                      className={`accordion-collapse collapse ${
                        collapsed["category-collapseThree"] ? "show" : ""
                      }`}
                    >
                      <div className="accordion-body">
                        <ul className="list-unstyled">
                          {["Category #1", "Category #2", "Category #3"].map(
                            (item) => (
                              <li
                                key={item}
                                className={
                                  activeItems["category-accordion"].includes(
                                    item
                                  )
                                    ? "active"
                                    : ""
                                }
                                onClick={() =>
                                  toggleActiveItem("category-accordion", item)
                                }
                              >
                                {item}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/** Location Section **/}
              <div
                className="accordion-section"
                id="location-accordion"
                style={{
                  display:
                    activeSection === "location-accordion" ? "block" : "none",
                }}
              >
                <div className="accordion accordion-flush">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${
                          collapsed["location-collapseOne"] ? "active" : ""
                        }`}
                        type="button"
                        onClick={() => toggleAccordion("location-collapseOne")}
                      >
                        Egypt
                        <span
                          className={`fa ${
                            collapsed["location-collapseOne"]
                              ? "fa-chevron-up"
                              : "fa-chevron-down"
                          } rotate`}
                        ></span>
                      </button>
                    </h2>
                    <div
                      className={`accordion-collapse collapse ${
                        collapsed["location-collapseOne"] ? "show" : ""
                      }`}
                    >
                      <div className="accordion-body">
                        <ul className="list-unstyled">
                          {[
                            "Cairo",
                            "Alexandria",
                            "Giza",
                            "Aswan",
                            "Luxor",
                            "Ismailia",
                            "Port Said",
                            "Suez",
                            "Fayoum",
                            "Mansoura",
                          ].map((city) => (
                            <li
                              key={city}
                              className={
                                activeItems["location-accordion"].includes(city)
                                  ? "active"
                                  : ""
                              }
                              onClick={() =>
                                toggleActiveItem("location-accordion", city)
                              }
                            >
                              {city}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${
                          collapsed["location-collapseTwo"] ? "active" : ""
                        }`}
                        type="button"
                        onClick={() => toggleAccordion("location-collapseTwo")}
                      >
                        Saudi Arabia
                        <span
                          className={`fa ${
                            collapsed["location-collapseTwo"]
                              ? "fa-chevron-up"
                              : "fa-chevron-down"
                          } rotate`}
                        ></span>
                      </button>
                    </h2>
                    <div
                      className={`accordion-collapse collapse ${
                        collapsed["location-collapseTwo"] ? "show" : ""
                      }`}
                    >
                      <div className="accordion-body">
                        <ul className="list-unstyled">
                          {[
                            "Riyadh",
                            "Jeddah",
                            "Mecca",
                            "Medina",
                            "Eastern Province",
                            "Tabuk",
                            "Abha",
                            "Hail",
                            "Najran",
                            "Qassim",
                          ].map((city) => (
                            <li
                              key={city}
                              className={
                                activeItems["location-accordion"].includes(city)
                                  ? "active"
                                  : ""
                              }
                              onClick={() =>
                                toggleActiveItem("location-accordion", city)
                              }
                            >
                              {city}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="buttons">
                <button onClick={clearFilters}>Clear all</button>
                <button>Apply Filter</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterMobile;
