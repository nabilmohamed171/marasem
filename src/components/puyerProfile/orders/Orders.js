"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import "./orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setLoading(false);
          return;
        }
        const response = await axios.get("http://127.0.0.1:8000/api/user/my-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div>Loading orders...</div>;
  if (!orders.length) return <div>No orders found.</div>;

  return (
    <div className="section-orders">
      <div className="row">
        {orders.map((order) => (
          <div key={order.order_id} className="col-md-6">
            <div className="order">
              <div className="row">
                <div className="col-md-8">
                  <div className="order-info">
                    <h3>{order.title}</h3>
                    <p>Placed on {order.date}.</p>
                    <span>EGP {order.total_price}</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <span className={order.status.toLowerCase()}>{order.status}</span>
                  <Link href={`${order.link}`} className="details">
                    View Details
                    <span className="view-next-icon">
                      <IoIosArrowForward />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
