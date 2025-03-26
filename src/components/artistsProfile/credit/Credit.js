"use client";
import React, { useState, useEffect } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosArrowDown,
} from "react-icons/io";
import { TbCreditCard } from "react-icons/tb";
import axios from "axios";
import "./credit.css";

const Credit = () => {
  const [account, setAccount] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;
        const response = await axios.get("http://127.0.0.1:8000/api/user/account", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setAccount(response.data);
      } catch (error) {
        console.error("Error fetching account info:", error);
      }
    };
    fetchAccountInfo();
  }, []);

  const handleCheckboxChange = (index) => {
    setSelectedRows((prev) => {
      if (prev.includes(index)) {
        return prev.filter((row) => row !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else if (account && account.credit_transactions) {
      setSelectedRows(account.credit_transactions.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  const formatAmount = (amount) => {
    const num = parseFloat(amount);
    if (isNaN(num)) {
      return <span style={{ color: "red" }}>Invalid Amount</span>;
    }
    if (num > 0) {
      return <span style={{ color: "#FFF" }}>+ EGP {num.toFixed(2)}</span>;
    }
    if (num < 0) {
      return <span style={{ color: "red" }}>- EGP {Math.abs(num).toFixed(2)}</span>;
    }
    return <span style={{ color: "#FFF" }}>+ EGP {num.toFixed(2)}</span>;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  const transactions =
    account && account.credit_transactions ? account.credit_transactions : [];
  const totalTransactions = transactions.length;
  const totalPages = Math.ceil(totalTransactions / itemsPerPage);
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleItemsPerPageChange = (num) => {
    setItemsPerPage(num);
    setCurrentPage(1);
  };

  return (
    <div className="section-credit">
      <div className="marasem-cridt-mobile">
        <span className="credit-icon">
          <TbCreditCard />
        </span>
        Mrasem Credit
      </div>
      <div className="balance">
        <div className="row">
          <div className="col-md-9">
            <div className="available-balance">
              <h3>Available Balance</h3>
              <span>
                {account && account.user && account.user.marasem_credit
                  ? "EGP " + parseFloat(account.user.marasem_credit).toFixed(2)
                  : "Loading..."}
              </span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="withdrawal">
              <button>Withdrawal</button>
            </div>
          </div>
        </div>
      </div>
      <div className="credit-button">
        <button className="all" onClick={handleSelectAllChange}>
          All
        </button>
        <button className="expiring">Expiring</button>
      </div>
      <div className="tabel-all-info">
        <div className="table-credit">
          <table className="table table-hover table-dark">
            <thead>
              <tr>
                <th scope="col">
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} />{" "}
                  <span className="table-checkbox-all">All</span>
                </th>
                <th scope="col">Credit Type</th>
                <th scope="col">Created Date</th>
                <th scope="col">Expiry Date</th>
                <th scope="col">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((transaction, index) => (
                <tr key={transaction.id} className={selectedRows.includes(index) ? "select-table-row-black" : ""}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td className={selectedRows.includes(index) ? "select-table-row-black" : ""}>
                    {transaction.type}
                  </td>
                  <td className={selectedRows.includes(index) ? "select-table-row-black" : ""}>
                    {formatDate(transaction.created_at)}
                  </td>
                  <td className={selectedRows.includes(index) ? "select-table-row-black" : ""}>
                    {transaction.expiry_date ? formatDate(transaction.expiry_date) : "N/A"}
                  </td>
                  <td className={selectedRows.includes(index) ? "select-table-row-black" : ""}>
                    {formatAmount(transaction.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="end-table">
          <div className="row">
            <div className="col-md-6">
              <button className="button-export">
                <span className="export-icon">
                  <MdOutlineFileDownload />
                </span>
                Export
              </button>
            </div>
            <div className="col-md-6">
              <div className="table-number">
                <span className="arrow-back-icon" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                  <IoIosArrowBack />
                </span>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <span
                    key={page}
                    className={`number-page ${currentPage === page ? "active-page" : ""}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </span>
                ))}
                <span className="arrow-next-icon" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                  <IoIosArrowForward />
                </span>
                <div className="table-number-dropdown">
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {itemsPerPage}{" "}
                      <span className="arrow-down-icon">
                        <IoIosArrowDown />
                      </span>
                    </button>
                    <ul className="dropdown-menu">
                      {[5, 10, 15, 20].map((num) => (
                        <li key={num}>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleItemsPerPageChange(num);
                            }}
                          >
                            {num}
                          </a>
                        </li>
                      ))}
                    </ul>
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

export default Credit;
