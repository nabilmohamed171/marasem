import React from "react";
import NavbarBuyer from "@/components/navbar/NavbarArtists";
import { FaRegCheckCircle } from "react-icons/fa";
import "./request.css";

const RequestSuccessfully = () => {
  return (
    <>
      <NavbarBuyer />
      <div className="request">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-12">
              <div className="request-image">
                <FaRegCheckCircle />
              </div>
            </div>
            <div className="col-md-8 col-12">
              <h2>
                Request has been placed
                <span className="main-color"> Successfully</span>
              </h2>
              <p>we will contact you soon</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestSuccessfully;
