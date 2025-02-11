import React from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import "./filter.css";

const FilterPcFixed = () => {
  return (
    <div className="dropdown-filter">
      <div className="container">
        <div className="row">
          <div className="col-md-1">
            <h2>Find</h2>
          </div>
          <div className="col-md-2">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Category
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" href="#">
                    Action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Another action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Something else here
                  </Link>
                </li>
              </ul>
              <span className="arrow-down-icon">
                <IoIosArrowDown />
              </span>
            </div>
          </div>
          <div className="col-md-2">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Location
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" href="#">
                    Action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Another action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Something else here
                  </Link>
                </li>
              </ul>
              <span className="arrow-down-icon">
                <IoIosArrowDown />
              </span>
            </div>
          </div>
          <div className="col-md-2">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Price
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" href="#">
                    Action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Another action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Something else here
                  </Link>
                </li>
              </ul>
              <span className="arrow-down-icon">
                <IoIosArrowDown />
              </span>
            </div>
          </div>
          <div className="col-md-2">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                For you
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" href="#">
                    Action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Another action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Something else here
                  </Link>
                </li>
              </ul>
              <span className="arrow-down-icon">
                <IoIosArrowDown />
              </span>
            </div>
          </div>
          <div className="col-md-1">
            <button className="clear-all" type="button">
              Clear all
            </button>
          </div>
          <div className="col-md-2">
            <div className="dropdown">
              <button
                className="btn best-seller btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Best Seller
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" href="#">
                    Action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Another action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Something else here
                  </Link>
                </li>
              </ul>
              <span className="arrow-down-icon">
                <IoIosArrowDown />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPcFixed;
