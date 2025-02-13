import React, { useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { TbCreditCard } from "react-icons/tb";
import "./credit.css";

const Credit = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const rowData = [
    {
      first: "Larry the Bird",
      last: "@twitter",
      handle1: "@twitter",
      handle2: "EGP 2000.00",
    },
    {
      first: "John Doe",
      last: "@johndoe",
      handle1: "@johndoe",
      handle2: "EGP -5000.00",
    },
    {
      first: "Jane Smith",
      last: "@janesmith",
      handle1: "@janesmith",
      handle2: "EGP 1000.00",
    },
    {
      first: "Bob Johnson",
      last: "@bobjohnson",
      handle1: "@bobjohnson",
      handle2: "EGP -7000.00",
    },
    {
      first: "Alice Brown",
      last: "@alicebrown",
      handle1: "@alicebrown",
      handle2: "EGP 9000.00",
    },
  ];

  const handleCheckboxChange = (index) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(index)) {
        return prevSelectedRows.filter((row) => row !== index);
      } else {
        return [...prevSelectedRows, index];
      }
    });
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows([0, 1, 2, 3, 4]);
    }
    setSelectAll(!selectAll);
  };

  const formatAmount = (amount) => {
    const number = parseFloat(amount.replace("EGP", "").trim());

    if (isNaN(number)) {
      return <span style={{ color: "red" }}>Invalid Amount</span>;
    }

    if (number > 0) {
      return <span style={{ color: "#FFF" }}>+ EGP {number.toFixed(2)}</span>;
    }

    if (number < 0) {
      return (
        <span style={{ color: "red" }}>
          - EGP {Math.abs(number).toFixed(2)}
        </span>
      );
    }

    return <span style={{ color: "#FFF" }}>+ EGP {number.toFixed(2)}</span>;
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
              <span>EGP 699.00</span>
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
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                  />{" "}
                  <span className="table-checkbox-all">All</span>
                </th>
                <th scope="col">Cridit Type</th>
                <th scope="col">Created Date</th>
                <th scope="col">Expiry Date</th>
                <th scope="col">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {rowData.map((row, index) => (
                <tr key={index}>
                  <td
                    className={
                      selectedRows.includes(index)
                        ? "select-table-row-black"
                        : ""
                    }
                  >
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td
                    className={
                      selectedRows.includes(index)
                        ? "select-table-row-black"
                        : ""
                    }
                  >
                    {row.first}
                  </td>
                  <td
                    className={
                      selectedRows.includes(index)
                        ? "select-table-row-black"
                        : ""
                    }
                  >
                    {row.last}
                  </td>
                  <td
                    className={
                      selectedRows.includes(index)
                        ? "select-table-row-black"
                        : ""
                    }
                  >
                    {row.handle1}
                  </td>
                  <td
                    className={
                      selectedRows.includes(index)
                        ? "select-table-row-black"
                        : ""
                    }
                  >
                    {formatAmount(row.handle2)}
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
                <span className="arrow-back-icon">
                  <IoIosArrowBack />
                </span>
                <span className="number-page">1</span>
                <span className="number-page">2</span>
                <span className="number-page">3</span>
                <span className="number-page">4</span>
                <span className="number-page">5</span>
                <span className="arrow-next-icon">
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
                      15{" "}
                      <span className="arrow-down-icon">
                        <IoIosArrowDown />
                      </span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          10
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          9
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          8
                        </a>
                      </li>
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
