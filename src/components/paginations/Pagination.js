"use client";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import "./paginations.css";

const Pagination = ({ currentPage, itemsPerPage, totalItems, onPageChange, onItemsPerPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    onPageChange(pageNumber);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 4;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="number-pages d-md-block d-sm-none">
      <div className="container">
        <div className="number">
          <span className="first-arrow-icon" onClick={() => handlePageChange(currentPage - 1)}>
            <IoIosArrowBack />
          </span>
          {getPageNumbers().map((pageNumber) => (
            <span
              key={pageNumber}
              className={currentPage === pageNumber ? "active" : ""}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </span>
          ))}
          <span className="last-arrow-icon" onClick={() => handlePageChange(currentPage + 1)}>
            <IoIosArrowForward />
          </span>
          <div className="dropdown-number-pages">
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {itemsPerPage}
              </button>
              <ul className="dropdown-menu">
                {[10, 20, 30, 50].map((num) => (
                  <li key={num}>
                    <button className="dropdown-item" onClick={() => onItemsPerPageChange(num)}>
                      {num}
                    </button>
                  </li>
                ))}
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

export default Pagination;
