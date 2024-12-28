"use client";
import { useState } from "react";
import axios from "axios";
import { useLocalStorageState } from "../../../../hooks/useLocalStorage";

export default function AddCourse() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    badge_text: "",
    badge_color: "",
    instructor_name: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const [token] = useLocalStorageState("authToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://react-interview.crd4lc.easypanel.host/api/course",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResponseMessage("Course added successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
        setResponseMessage(
          `Error: ${error.response.data.message || "Failed to add the course"}`
        );
      } else if (error.request) {
        console.error("No Response:", error.request);
        setResponseMessage("No response from server. Please try again later.");
      } else {
        console.error("Error:", error.message);
        setResponseMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "1.8rem",
          color: "#333",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Add Course
      </h2>
      <form onSubmit={handleSubmit}>
     
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="title"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#555",
            }}
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#0070f3")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

       
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="description"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#555",
            }}
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#0070f3")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="badge_text"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#555",
            }}
          >
            Badge Text:
          </label>
          <input
            type="text"
            id="badge_text"
            name="badge_text"
            value={formData.badge_text}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#0070f3")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

      
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="badge_color"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#555",
            }}
          >
            Badge Color:
          </label>
          <input
            type="text"
            id="badge_color"
            name="badge_color"
            value={formData.badge_color}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#0070f3")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

       
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="instructor_name"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#555",
            }}
          >
            Instructor Name:
          </label>
          <input
            type="text"
            id="instructor_name"
            name="instructor_name"
            value={formData.instructor_name}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#0070f3")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

       
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#0070f3",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background-color 0.3s ease, transform 0.2s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#005bb5")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#0070f3")}
          onMouseDown={(e) => (e.target.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
        >
          Add Course
        </button>
      </form>

      
      {responseMessage && (
        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "1rem",
            fontWeight: "bold",
            color: responseMessage.includes("failed") ? "red" : "green",
          }}
        >
          {responseMessage}
        </p>
      )}
    </div>
  );
}
