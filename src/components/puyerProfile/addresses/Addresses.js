"use client";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCheck, FaPlus } from "react-icons/fa6";
import Link from "next/link";
import axios from "axios";
import "./addresses.css";
import { useState } from "react";

const Addresses = ({ addresses: initialAddresses }) => {
  const [addresses, setAddresses] = useState(initialAddresses || []);

  const handleDeleteAddress = async (id) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("User not authenticated");
      return;
    }
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/delete-address/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      console.log(response.data.message);
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <div className="section-addresses">
      <div className="container">
        {addresses && addresses.length > 0 ? (
          addresses.map((addr) => (
            <div key={addr.id} className="addresses">
              <div className="row">
                <div className="col-md-6 col-12">
                  <div className="map-icon">
                    <span>
                      <FaMapMarkerAlt />
                    </span>
                  </div>
                  <div className="addresses-info">
                    <h3>{addr.name || "Address"}</h3>
                    <p>
                      {addr.address}, {addr.zone}, {addr.city}, {addr.country}
                    </p>
                    <span className="number-phone">
                      {addr.country_code}
                      {addr.phone || "N/A"}
                      {addr.is_default && (
                        <span className="correct-icon">
                          <FaCheck />
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                {addr.is_default && (
                  <div className="col-md-2 col-12">
                    <div className="addresses-button-default">
                      <button>Default</button>
                    </div>
                  </div>
                )}
                <div className="col-md-2 col-6">
                  <div className="addresses-button-edit">
                    <button>
                      <span className="edit-icon">
                        <MdOutlineEdit />
                      </span>
                      Edit
                    </button>
                  </div>
                </div>
                <div className="col-md-2 col-6">
                  <div className="addresses-button-delete">
                    <button onClick={() => handleDeleteAddress(addr.id)}>
                      <span className="delete-icon">
                        <RiDeleteBin5Line />
                      </span>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No addresses available.</p>
        )}

        <div className="button-add-new-address">
          <Link href="#">
            <button>
              <span className="plus-icon">
                <FaPlus />
              </span>
              Add New Address
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Addresses;
