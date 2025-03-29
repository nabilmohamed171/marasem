"use client";
import React, { useState, useEffect } from "react";
import { BsCreditCard2Back } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { PiInvoiceLight } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import "./order-details.css";

const OrderDetails = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const customizedId = searchParams.get("customized_id");

  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // For authenticated users, use the token; otherwise, send no Authorization header.
        const token = localStorage.getItem("authToken");
        let endpoint = "";
        if (customizedId) {
          endpoint = `http://127.0.0.1:8000/api/user/customized-orders/${customizedId}`;
        } else if (orderId) {
          endpoint = `http://127.0.0.1:8000/api/user/my-orders/${orderId}`;
        } else {
          setError("No order ID provided");
          setLoading(false);
          return;
        }

        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(endpoint, {
          headers,
          withCredentials: true,
        });

        if (customizedId) {
          setOrderDetails(response.data.customized_order_details);
        } else {
          setOrderDetails(response.data.order_details);
        }
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Error fetching order details");
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId, customizedId]);

  if (loading) return <div>Loading order details...</div>;
  if (error) return <div>{error}</div>;
  if (!orderDetails) return <div>No order details found.</div>;

  return (
    <div className="container">
      <div className="order-details">
        <div className="row">
          {/* Main Order Details */}
          <div className="col-md-8 col-12">
            <div className="main-order">
              <div className="order-number-items">
                <div className="row">
                  <div className="col-8">
                    <p className="order-number">{orderDetails.title}</p>
                    <p className="order-date">Placed on {orderDetails.date}</p>
                  </div>
                  <div className="col-4">
                    <p className='pending'>{orderDetails.status.toUpperCase()}</p>
                    <p className="item-number">
                      {orderDetails.artworks ? orderDetails.artworks.length : 1} Item
                      {orderDetails.artworks && orderDetails.artworks.length > 1 ? "s" : ""}
                    </p>
                  </div>
                  {orderDetails.invoice &&
                    <div className="col-12">
                      <Link className="reser-link" href={`${orderDetails.invoice.path.replace("localhost", "127.0.0.1:8000")}`} target="_blank">
                        <span className="icon-invoice">
                          <PiInvoiceLight />
                        </span>
                        Order Invoice
                      </Link>
                    </div>
                  }
                </div>
              </div>
              <div className="shipping-address">
                <h2>Shipping Address</h2>
                <div className="address-info">
                  <span className="map-home-mobile d-sm-block d-md-none">
                    <span className="map-home">
                      <FaMapMarkerAlt />
                    </span>
                    Home
                  </span>
                  <p className="username">{orderDetails.customer_name ?? orderDetails.custom_order.user.first_name + " " + orderDetails.custom_order.user.last_name}</p>
                  <p className="full-address">
                    {orderDetails.customer_address ?? orderDetails.address.city + ", " + orderDetails.address.zone + ", " + orderDetails.address.address}
                  </p>
                  <p className="phone-number">
                    {orderDetails.customer_phone ?? orderDetails.custom_order.user.country_code + orderDetails.custom_order.user.phone}
                  </p>
                  <span className="check-number-phone">
                    <FaCheck />
                  </span>
                </div>
              </div>
              <div className="payment-method">
                <h2>Payment Method</h2>
                <div className="row">
                  <div className="col-md-12">
                    <div className="address">
                      <button type="button" className="credit-card">
                        <span className="icon-credit">
                          <BsCreditCard2Back />
                        </span>
                        {orderDetails.payment_method || "Cash"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Standard Order Shipments */}
              {orderDetails.artworks && (
                <div className="shipment first-shipment">
                  {orderDetails.artworks.map((item, index) => (
                    <div key={index} className="item">
                      <div className="row">
                        <div className="col-6 shipment-upper">
                          <span className="shipment-number">Shipment {index + 1}</span>
                        </div>
                        <div className="col-6">
                          <span className="pending">{orderDetails.status.toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-2 col-4">
                          <div className="image-item">
                            <Image
                              src={item.image || item.photos[0]}
                              alt={item.title}
                              width={105}
                              height={95}
                              loading="lazy"
                              quality={70}
                            />
                          </div>
                        </div>
                        <div className="col-md-10 col-8">
                          <div className="info-item">
                            <h2>{item.title}</h2>
                            <p>{item.type || ""} - {item.size || ""}</p>
                            <span>EGP {item.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* Customized Order */}
              {orderDetails.custom_order && (
                <div className="shipment first-shipment">
                  <div className="row">
                    <div className="col-6 shipment-upper">
                      <span className="shipment-number">Customized Order</span>
                    </div>
                    <div className="col-6">
                      <span className="pending">{orderDetails.status.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="row">
                    {orderDetails.custom_order.reference_images.map((image, index) => (
                      <div key={index} className="col-md-2 col-4">
                        <div className="image-item">
                          <Image
                            src={image}
                            alt={`Reference Image ${index + 1}`}
                            width={100}
                            height={95}
                            loading="lazy"
                            quality={70}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="col-md-10 col-8">
                      <div className="info-item">
                        <h2>{orderDetails.custom_order.description}</h2>
                        <h2>{orderDetails.custom_order.desired_size}</h2>
                        <span>EGP {orderDetails.custom_order.offering_price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Order Summary */}
          <div className="col-md-4 col-12">
            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="order-summary-mobile">
                {orderDetails.custom_order ?
                  <div className="row">
                    <div className="col-6">
                      <p className="subtotal">
                        Subtotal / 1 item
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="price-all-items t-r">EGP {orderDetails.offering_price}</p>
                    </div>
                    {orderDetails.shipping && (
                      <>
                        <div className="col-6">
                          <p className="promocode">
                            Shipping <span className="color-m">Details</span>
                          </p>
                        </div>
                        <div className="col-6">
                          <p className="price-promocode">EGP {orderDetails.shipping}</p>
                        </div>
                      </>
                    )}
                  </div>
                  :
                  <div className="row">
                    <div className="col-6">
                      <p className="subtotal">
                        Subtotal /{" "}
                        {orderDetails.artworks
                          ? orderDetails.artworks.length
                          : orderDetails.custom_order
                            ? 1
                            : 0}{" "}
                        item
                        {orderDetails.artworks && orderDetails.artworks.length > 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="price-all-items t-r">EGP {orderDetails.price_breakdown?.artworks_total}</p>
                    </div>
                    {orderDetails.price_breakdown?.shipping && (
                      <>
                        <div className="col-6">
                          <p className="promocode">
                            Shipping <span className="color-m">Details</span>
                          </p>
                        </div>
                        <div className="col-6">
                          <p className="price-promocode">EGP {orderDetails.price_breakdown?.shipping}</p>
                        </div>
                      </>
                    )}
                    {orderDetails.price_breakdown?.marasem_credit_used !== "0.00" && (
                      <>
                        <div className="col-6">
                          <p className="promocode">Marasem Credit</p>
                        </div>
                        <div className="col-6">
                          <p className="price-promocode main-color">
                            - EGP {orderDetails.price_breakdown?.marasem_credit_used}
                          </p>
                        </div>
                      </>
                    )}
                  </div>}
                <hr />
                <div className="row">
                  <div className="col-6">
                    <p className="total-price">Total Price</p>
                  </div>
                  <div className="col-6">
                    <p className="total-price-number color-f">
                      EGP {orderDetails.custom_order ? orderDetails.offering_price : orderDetails.price_breakdown?.final_total}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default OrderDetails;