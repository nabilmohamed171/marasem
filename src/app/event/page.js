"use client";
import { useState, useEffect } from "react";
import Navbar_Home from "@/components/all-navbars/NavbarHome";
import Navbar_Buyer from "@/components/all-navbars/NavbarBuyer";
import Navbar from "@/components/all-navbars/NavbarArtists";
import Footer from "@/components/footer/Footer";
import FooterAccordion from "@/components/footer/FooterAccordion";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import "./event.css";
import axios from "axios";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [showMore, setShowMore] = useState({});
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("guest");

  useEffect(() => {
    const fetchUserType = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user-type", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          withCredentials: true,
        });
        setUserType(response.data.user_type);
      } catch (error) {
        console.error("Error fetching user type:", error);
      }
    };

    fetchUserType();
  }, []);

  // Toggle showMore for an event by id
  const toggleText = (id) => {
    setShowMore((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Fetch events from backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/events")
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
    {userType === "artist" ? (
      <Navbar />
    ) : userType === "buyer" ? (
      <Navbar_Buyer />
    ) : (
      <Navbar_Home />
    )}

      <div className="event-page">
        <div className="container">
          {loading ? (
            <p>Loading events...</p>
          ) : (
            events.map((event, index) => (
              <div key={event.id}>
                <div className="row">
                  {/* Event details column */}
                  <div className="col-md-6">
                    <div className="one-event d-flex-event">
                      {index === 0 && <h4>NEW</h4>}
                      <h3>
                        {event.date_start}
                        {event.date_end ? ` - ${event.date_end}` : ""} |{" "}
                        {event.time_start && event.time_end
                          ? `${event.time_start} – ${event.time_end}`
                          : ""}
                      </h3>
                      <h2>{event.title}</h2>
                      <span className="icon-map">
                        <FaMapMarkerAlt />
                      </span>
                      <p>{event.location}</p>
                      <div className="event-info">
                        <p>{event.description}</p>
                        <Link
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleText(event.id);
                          }}
                        >
                          {showMore[event.id] ? "SHOW LESS" : "SHOW MORE"}
                        </Link>
                        <p className={`more-text ${showMore[event.id] ? "show" : ""}`}>
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Event image column */}
                  <div className="col-md-6">
                    <div className="event-image">
                      <Image
                        src={event.cover_img_path} // Ensure this URL is allowed in next.config.js
                        alt="Event Cover"
                        width={700}
                        height={700}
                        quality={100}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
                <hr className="event-hr" />
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
      <FooterAccordion />
    </>
  );
};

export default EventPage;
