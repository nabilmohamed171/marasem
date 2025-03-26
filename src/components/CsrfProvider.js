"use client";

import { useEffect } from "react";
import axios from "axios";

export default function CsrfProvider({ children }) {
  useEffect(() => {
    // Check if the CSRF cookie already exists
    if (!document.cookie.includes("marasem_session")) {
      const token = localStorage.getItem("authToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      axios
        .get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
          withCredentials: true,
        })
        .then(() => {
          console.log("CSRF cookie set");
        })
        .catch((error) => {
          console.error("Error fetching CSRF cookie:", error);
        });
    }
  }, []);

  return children;
}