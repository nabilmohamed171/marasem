"use client";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import "./shipping-address.css";

const Address = ({ id, name, address, phone, isDefault, onSelect }) => (
  <div className="address-info-shipping">
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id={id}
        checked={isDefault}
        onChange={onSelect}
      />
      <label className="form-check-label username" htmlFor={id}>
        {name}
      </label>
    </div>
    {isDefault && <span className="span-default">Default</span>}
    <p className="full-address">{address}</p>
    <p className="phone-number">{phone}</p>
    <span className="check-number-phone">
      <FaCheck />
    </span>
  </div>
);

const ShippingAddress = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState("address-1");

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleSelectAddress = (event) => {
    setSelectedAddress(event.target.id);
  };

  return (
    isPopupVisible && (
      <div className="shipping-address-popup">
        <div className="address-popup">
          <h2>Shipping Address</h2>
          <div className="close-popup" onClick={handleClosePopup}>
            <span>
              <MdClose />
            </span>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="default-address">
                <div className="edit-address-popup">
                  <span className="icon-edit">
                    <MdOutlineEdit />
                  </span>
                  <span>Edit</span>
                </div>
                <Address
                  id="address-1"
                  name="Omar Mohsen"
                  address="Apartment 10, flat 5, building 8, 373R+M8 - Sarayat El-maadi - Cairo Governorate, Egypt"
                  phone="+20-10-12424029"
                  isDefault={selectedAddress === "address-1"}
                  onSelect={handleSelectAddress}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="sec-address">
                <div className="edit-address-popup">
                  <span className="icon-edit">
                    <MdOutlineEdit />
                  </span>
                  <span>Edit</span>
                </div>
                <Address
                  id="address-2"
                  name="Ahmed Ali"
                  address="Apartment 5, flat 2, building 12, 123G+M9 - Nasr City - Cairo Governorate, Egypt"
                  phone="+20-10-98765432"
                  isDefault={selectedAddress === "address-2"}
                  onSelect={handleSelectAddress}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-12">
                <div className="new-address">
                  <button>+ Add a New address</button>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="save-address">
                  <button>Save Address</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ShippingAddress;
