"use client";
import { useState } from "react";
import Navbar_Home from "@/components/all-navbars/NavbarHome";
import Footer from "@/components/footer/Footer";
import FooterAccordion from "@/components/footer/FooterAccordion";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import "./event.css";

const EventPage = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleText = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <Navbar_Home />

      <div className="event-page">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="one-event d-flex-event">
                <h4>NEW</h4>
                <h3>Oct 4-Nov 9, 2024 | 6 p.m. – 8 p.m.</h3>
                <h2>EUPHORIA</h2>
                <span className="icon-map">
                  <FaMapMarkerAlt />
                </span>
                <p>F313-1 The Courtyard Mall, District 12, Sheikh Zayed</p>
                <div className="event-info">
                  <p>
                    Following his last exhibition, Threshold, which explored the
                    spaces where forest and wetlands meet, Aho’s series of new
                    work emerges out through the woods into the light and air of
                    an open meadow. Aho embraces the meadow as a space of
                    contradictions, both still and humming with life, unruly yet
                    organized by mysterious systems. The meadow represents a
                    formative landscape for Aho–– in Finnish, “aho” translates
                    to “forest glade” or “wild meadow.” Aho explores the
                    capacity for landscape painting to double as
                    self-portraiture, to trace the narrative of our lives as
                    shaped by the landscape.
                  </p>
                  <p>
                    {" "}
                    The multiple canvases of the eponymous Wild Meadow (70 x 235
                    ¼ inches) collapse and expand the distance between the
                    actual and remembered. Shifting between immediate and wide
                    focal points, Aho’s brushwork and sensitivity for the
                    painted surface captures the lush, entangled environment.
                    Looking in and between the forms of wildflowers, grasses,
                    mists, and fireflies, radiating forms and convex shapes
                    evoke the movement of light and air.
                  </p>
                  <p>
                    The meadow represents a formative landscape for Aho–– in
                    Finnish, “aho” translates to “forest glade” or “wild
                    meadow.” Aho explores the capacity for landscape painting to
                    double as self-portraiture, to trace the narrative of our
                    lives as shaped by the landscape. The multiple canvases of
                    the eponymous Wild Meadow (70 x 235 ¼ inches) collapse and
                    expand the distance between the actual and remembered.
                    Shifting between immediate and wide focal points, Aho’s
                    brushwork and sensitivity for the painted surface captures
                    the lush, entangled environment. Looking in and between the
                    forms of wildflowers, grasses, mists, and fireflies,
                    radiating forms and convex shapes evoke the movement of
                    light and air.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="event-image">
                <Image
                  src="/images/1.png"
                  alt="Image 1"
                  width={640}
                  height={845}
                  quality={60}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <hr className="event-hr" />
          <div className="row">
            <div className="col-md-6">
              <div className="two-event d-flex-event">
                <h3>December 27 - January 10</h3>
                <h2>EUPHORIA</h2>
                <span className="icon-map">
                  <FaMapMarkerAlt />
                </span>
                <p>F313-1 The Courtyard Mall, District 12, Sheikh Zayed</p>
                <div className="event-info">
                  <p>
                    Following his last exhibition, Threshold, which explored the
                    spaces where forest and wetlands meet, Aho’s series of new
                    work emerges out through the woods into the light and air of
                    an open meadow. Aho embraces the meadow as a space of
                    contradictions, both still and humming with life, unruly yet
                    organized by mysterious …
                  </p>
                  <Link href="#" onClick={toggleText}>
                    {showMore ? "SHOW LESS" : "SHOW MORE"}
                  </Link>
                  <p className={`more-text ${showMore ? "show" : ""}`}>
                    Following his last exhibition, Threshold, which explored the
                    spaces where forest and wetlands meet, Aho’s series of new
                    work emerges out through the woods into the light and air of
                    an open meadow. Aho embraces the meadow as a space of
                    contradictions, both still and humming with life, unruly yet
                    organized by mysterious …
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="event-image">
                <Image
                  src="/images/2.png"
                  alt="Image 1"
                  width={642}
                  height={642}
                  quality={60}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <hr className="event-hr" />
          <div className="row">
            <div className="col-md-6">
              <div className="thr-event d-flex-event">
                <h3>December 27 - January 10</h3>
                <h2>EUPHORIA</h2>
                <span className="icon-map">
                  <FaMapMarkerAlt />
                </span>
                <p>F313-1 The Courtyard Mall, District 12, Sheikh Zayed</p>
                <div className="event-info">
                  <p>
                    Following his last exhibition, Threshold, which explored the
                    spaces where forest and wetlands meet, Aho’s series of new
                    work emerges out through the woods into the light and air of
                    an open meadow. Aho embraces the meadow as a space of
                    contradictions, both still and humming with life, unruly yet
                    organized by mysterious …
                  </p>
                  <Link href="#" onClick={toggleText}>
                    {showMore ? "SHOW LESS" : "SHOW MORE"}
                  </Link>
                  <p className={`more-text ${showMore ? "show" : ""}`}>
                    Following his last exhibition, Threshold, which explored the
                    spaces where forest and wetlands meet, Aho’s series of new
                    work emerges out through the woods into the light and air of
                    an open meadow. Aho embraces the meadow as a space of
                    contradictions, both still and humming with life, unruly yet
                    organized by mysterious …
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="event-image">
                <Image
                  src="/images/3.png"
                  alt="Image 1"
                  width={642}
                  height={642}
                  quality={60}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <hr className="event-hr" />
          <div className="row">
            <div className="col-md-6">
              <div className="four-event d-flex-event">
                <h3>December 27 - January 10</h3>
                <h2>EUPHORIA</h2>
                <span className="icon-map">
                  <FaMapMarkerAlt />
                </span>
                <p>F313-1 The Courtyard Mall, District 12, Sheikh Zayed</p>
                <div className="event-info">
                  <p>
                    Following his last exhibition, Threshold, which explored the
                    spaces where forest and wetlands meet, Aho’s series of new
                    work emerges out through the woods into the light and air of
                    an open meadow. Aho embraces the meadow as a space of
                    contradictions, both still and humming with life, unruly yet
                    organized by mysterious …
                  </p>
                  <Link href="#" onClick={toggleText}>
                    {showMore ? "SHOW LESS" : "SHOW MORE"}
                  </Link>
                  <p className={`more-text ${showMore ? "show" : ""}`}>
                    Following his last exhibition, Threshold, which explored the
                    spaces where forest and wetlands meet, Aho’s series of new
                    work emerges out through the woods into the light and air of
                    an open meadow. Aho embraces the meadow as a space of
                    contradictions, both still and humming with life, unruly yet
                    organized by mysterious …
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="event-image">
                <Image
                  src="/images/4.png"
                  alt="Image 1"
                  width={642}
                  height={642}
                  quality={60}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <FooterAccordion />
    </>
  );
};

export default EventPage;
