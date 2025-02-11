import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import "./orders.css";
const Orders = () => {
  return (
    <div className="section-orders">
      <div className="row">
        <div className="col-md-6">
          <div className="order">
            <div className="row">
              <div className="col-md-8">
                <div className="order-info">
                  <h3>Customiz Request 23741v237894v.</h3>
                  <p>Placed on Dec 2. 2025. 1 Artworks</p>
                  <span>EGP 3,777.00</span>
                </div>
              </div>
              <div className="col-md-4">
                <span className="pending">Pending</span>
                <Link href="" className="details">
                  View Details
                  <span className="view-next-icon">
                    <IoIosArrowForward />
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="order">
            <div className="row">
              <div className="col-md-8">
                <div className="order-info">
                  <h3>Customiz Request 23741v237894v.</h3>
                  <p>Placed on Dec 2. 2025. 1 Artworks</p>
                  <span>EGP 3,777.00</span>
                </div>
              </div>
              <div className="col-md-4">
                <span className="canceled">Canceled</span>
                <Link href="" className="details">
                  View Details
                  <span className="view-next-icon">
                    <IoIosArrowForward />
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="order">
            <div className="row">
              <div className="col-md-8">
                <div className="order-info">
                  <h3>Customiz Request 23741v237894v.</h3>
                  <p>Placed on Dec 2. 2025. 1 Artworks</p>
                  <span>EGP 3,777.00</span>
                </div>
              </div>
              <div className="col-md-4">
                <span className="pending">Pending</span>
                <Link href="" className="details">
                  View Details{" "}
                  <span className="view-next-icon">
                    <IoIosArrowForward />
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="order">
            <div className="row">
              <div className="col-md-8">
                <div className="order-info">
                  <h3>Customiz Request 23741v237894v.</h3>
                  <p>Placed on Dec 2. 2025. 1 Artworks</p>
                  <span>EGP 3,777.00</span>
                </div>
              </div>
              <div className="col-md-4">
                <span className="delivered">Delivered</span>
                <Link href="" className="details">
                  View Details{" "}
                  <span className="view-next-icon">
                    <IoIosArrowForward />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="order">
            <div className="row">
              <div className="col-md-8">
                <div className="order-info">
                  <h3>Customiz Request 23741v237894v.</h3>
                  <p>Placed on Dec 2. 2025. 1 Artworks</p>
                  <span>EGP 3,777.00</span>
                </div>
              </div>
              <div className="col-md-4">
                <span className="pending">Pending</span>
                <Link href="" className="details">
                  View Details{" "}
                  <span className="view-next-icon">
                    <IoIosArrowForward />
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="order">
            <div className="row">
              <div className="col-md-8">
                <div className="order-info">
                  <h3>Customiz Request 23741v237894v.</h3>
                  <p>Placed on Dec 2. 2025. 1 Artworks</p>
                  <span>EGP 3,777.00</span>
                </div>
              </div>
              <div className="col-md-4">
                <span className="rejected">Rejected</span>
                <Link href="" className="details">
                  View Details{" "}
                  <span className="view-next-icon">
                    <IoIosArrowForward />
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="order">
            <div className="row">
              <div className="col-md-8">
                <div className="order-info">
                  <h3>Customiz Request 23741v237894v.</h3>
                  <p>Placed on Dec 2. 2025. 1 Artworks</p>
                  <span>EGP 3,777.00</span>
                </div>
              </div>
              <div className="col-md-4">
                <span className="delivered">Delivered</span>
                <Link href="" className="details">
                  View Details{" "}
                  <span className="view-next-icon">
                    <IoIosArrowForward />
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="order">
            <div className="row">
              <div className="col-md-8">
                <div className="order-info">
                  <h3>Customiz Request 23741v237894v.</h3>
                  <p>Placed on Dec 2. 2025. 1 Artworks</p>
                  <span>EGP 3,777.00</span>
                </div>
              </div>
              <div className="col-md-4">
                <span className="delivered">Delivered</span>
                <Link href="" className="details">
                  View Details{" "}
                  <span className="view-next-icon">
                    <IoIosArrowForward />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
