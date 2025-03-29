"use client";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import "./todo.css";
import axios from "axios";

const ToDo = ({ toDo, refetchToDo }) => {
  const handleResponse = async (orderId, action) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `http://127.0.0.1:8000/api/customized-order/${orderId}/respond`,
        { action },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      // Re-fetch the to-do orders to update the local status
      if (typeof refetchToDo === "function") {
        refetchToDo();
      }
    } catch (error) {
      console.error("Error responding to customized order:", error);
    }
  };

  return (
    <>
      <div className="section-todo d-sm-none d-md-block d-xl-block d-lg-block">
        <h2>Customized Requests</h2>
        <div className="customiz">
          <div className="row">
            <div className="col-12">
              {toDo.customized_orders.length > 0 ? (
                toDo.customized_orders.map((order, index) => (
                  <div key={index} className="box-customiz">
                    <div className="row">
                      <div className="col-md-2">
                        <div className="todo-image">
                          <Image
                            src={
                              order.reference_images[0]
                            }
                            alt="custom order"
                            width={147}
                            height={147}
                            quality={70}
                            loading="lazy"
                            objectFit="cover"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 col-12">
                        <div className="todo-info">
                          <h3>Customized Order #{order.id}</h3>
                          <p>
                            {order.customer_name ?? order.user?.first_name + " " + order.user?.last_name}, {order.desired_size} placed on{" "}
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                          <span>EGP {parseFloat(order.offering_price).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="col-md-4 col-12">
                        {order.status === "pending" && <>
                          <div className="todo-buttons">
                            <button
                              className="button-reject"
                              onClick={() => handleResponse(order.id, "reject")}
                            >
                              Reject
                            </button>
                            <button
                              className="button-request"
                              onClick={() => handleResponse(order.id, "accept")}
                            >
                              Accept request
                            </button>
                          </div>
                        </>}
                      </div>
                      <div className="col-md-2 col-12">
                        <div className="todo-more">
                          <h3>Customize Request</h3>
                          <Link href={"/order-details?customized_id=" + order.id}>
                            View Details
                            <span className="arrow-next-icon">
                              <IoIosArrowForward />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No customized requests available.</p>
              )}
            </div>
          </div>
        </div>

        <div className="section-order">
          <div className="row">
            <div className="col-12">
              <h2>Accepted Orders</h2>
              {toDo.ordered_items.length > 0 ? (
                toDo.ordered_items.map((item, index) => (
                  <div key={index} className="box-order">
                    <div className="row">
                      <div className="col-md-2">
                        <div className="todo-image">
                          <Image
                            src={item.artwork.photos[0]}
                            alt="order"
                            width={147}
                            height={147}
                            quality={70}
                            loading="lazy"
                            objectFit="cover"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 col-12">
                        <div className="todo-info">
                          <h3>{item.artwork.name}</h3>
                          <p>
                            {item.order.customer_name}, {item.size} placed on{" "}
                            {new Date(item.created_at).toLocaleDateString()}
                          </p>
                          <span>EGP {parseFloat(item.price).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="col-md-4 col-12">
                        <div className="todo-time-delivery">
                          <span className="delivery">Status</span>
                          <span className="time">{item.delivery_status}</span>
                        </div>
                      </div>
                      <div className="col-md-2 col-12">
                        <div className="todo-more">
                          <h3>Order Details</h3>
                          <Link href={"/order-details?id=" + item.order.id}>
                            View Details
                            <span className="arrow-next-icon">
                              <IoIosArrowForward />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No accepted orders available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;
