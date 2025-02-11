import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";
import "./addresses.css";

const Addresses = () => {
  return (
    <div className="section-addresses">
      <div className="row">
        <div className="col-12">
          <div className="addresses">
            <div className="row">
              <div className="col-md-6 col-12">
                <div className="map-icon">
                  <span>
                    <FaMapMarkerAlt />
                  </span>
                </div>
                <div className="addresses-info">
                  <h3>Omer Mohsen</h3>
                  <p>
                    Apartment 10, flat 5, building 8, 373R+MB - Sarayat El-maadi
                    - Cairo Governorate, Egypt
                  </p>
                  <span className="number-phone">
                    +20-10-12424029
                    <span className="correct-icon">
                      <FaCheck />
                    </span>
                  </span>
                </div>
              </div>
              <div className="col-md-2">
                <div className="addresses-button-default">
                  <button>Default</button>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="addresses-button-edit">
                  <div className="border-left"></div>
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
                  <button>
                    <span className="delete-icon">
                      <RiDeleteBin5Line />
                    </span>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="addresses">
            <div className="row">
              <div className="col-md-6 col-12">
                <div className="map-icon">
                  <span>
                    <FaMapMarkerAlt />
                  </span>
                </div>
                <div className="addresses-info">
                  <h3>Omer Mohsen</h3>
                  <p>
                    Apartment 10, flat 5, building 8, 373R+MB - Sarayat El-maadi
                    - Cairo Governorate, Egypt
                  </p>
                  <span className="number-phone">
                    +20-10-12424029
                    <span className="correct-icon">
                      <FaCheck />
                    </span>
                  </span>
                </div>
              </div>
              <div className="col-md-2"></div>

              <div className="col-md-2 col-6">
                <div className="addresses-button-edit">
                  <div className="border-left"></div>
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
                  <button>
                    <span className="delete-icon">
                      <RiDeleteBin5Line />
                    </span>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="addresses">
            <div className="row">
              <div className="col-md-6 col-12">
                <div className="map-icon">
                  <span>
                    <FaMapMarkerAlt />
                  </span>
                </div>
                <div className="addresses-info">
                  <h3>Omer Mohsen</h3>
                  <p>
                    Apartment 10, flat 5, building 8, 373R+MB - Sarayat El-maadi
                    - Cairo Governorate, Egypt
                  </p>
                  <span className="number-phone">
                    +20-10-12424029
                    <span className="correct-icon">
                      <FaCheck />
                    </span>
                  </span>
                </div>
              </div>
              <div className="col-md-2"></div>

              <div className="col-md-2 col-6">
                <div className="addresses-button-edit">
                  <div className="border-left"></div>
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
                  <button>
                    <span className="delete-icon">
                      <RiDeleteBin5Line />
                    </span>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="button-add-new-address">
          <Link href="">
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
