"use client";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import "./shipping-address.css";

const Address = ({ id, name, address, country_code, phone, isChecked, isDefault, onSelect }) => (
  <div className="address-info-shipping">
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id={id}
        checked={isChecked}
        onChange={onSelect}
      />
      <label className="form-check-label username" htmlFor={id}>
        {name}
      </label>
    </div>
    {isDefault && <span className="span-default">Default</span>}
    <p className="full-address">{address}</p>
    <p className="phone-number">{country_code}{phone}</p>
    <span className="check-number-phone">
      <FaCheck />
    </span>
  </div>
);

const ShippingAddress = ({ addresses = [], onSelectAddress, onAddAddress }) => {
  const defaultAddress = addresses.find(addr => addr.is_default) || addresses[0] || null;
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(defaultAddress ? defaultAddress.id : null);
  const defaultId = defaultAddress ? defaultAddress.id : null;

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleSelectAddress = (event) => {
    const selectedId = parseInt(event.target.id, 10);
    setSelectedAddress(selectedId);
    if (onSelectAddress) {
      onSelectAddress(selectedId);
    }
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
            {addresses.map((addr) => (
              <div className="col-12" key={addr.id}>
                <div className={addr.is_default || selectedAddress === addr.id ? "default-address" : "sec-address"}>
                  <div className="edit-address-popup">
                    <span className="icon-edit">
                      <MdOutlineEdit />
                    </span>
                    <span>Edit</span>
                  </div>
                  <Address
                    id={addr.id.toString()}
                    name={addr.name || `${addr.first_name || ''} ${addr.last_name || ''}`}
                    address={`${addr.address}, ${addr.zone}, ${addr.city}`}
                    country_code={addr.country_code}
                    phone={addr.phone}
                    isChecked={selectedAddress === addr.id}
                    isDefault={defaultId === addr.id}
                    onSelect={handleSelectAddress}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="new-address">
                <button type="button" onClick={onAddAddress}>
                  + Add a New address
                </button>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="save-address">
                <button onClick={handleClosePopup}>Save Address</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ShippingAddress;