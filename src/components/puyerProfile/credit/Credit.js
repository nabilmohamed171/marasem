import React, { useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import "./credit.css";

const Credit = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

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
      setSelectedRows([0, 1, 2, 3, 4]);
    }
    setSelectAll(!selectAll);
  };

  return (
    <div className="section-credit">
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
      <div className="table-credit">
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
              <th scope="col">Handles</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: selectedRows.includes(index) ? "black" : "",
                  color: selectedRows.includes(index) ? "white" : "",
                }}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td>Larry the Bird</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@twitter</td>
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
  );
};

export default Credit;
