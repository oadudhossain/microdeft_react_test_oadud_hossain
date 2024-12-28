import { useState } from "react";
import axios from "axios";
import { useLocalStorageState } from "../../hooks/useLocalStorage";

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
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem", height: "100px" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="badge_text">Badge Text:</label>
          <input
            type="text"
            id="badge_text"
            name="badge_text"
            value={formData.badge_text}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="badge_color">Badge Color:</label>
          <input
            type="text"
            id="badge_color"
            name="badge_color"
            value={formData.badge_color}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="instructor_name">Instructor Name:</label>
          <input
            type="text"
            id="instructor_name"
            name="instructor_name"
            value={formData.instructor_name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <button type="submit" style={{ padding: "0.5rem", width: "100%" }}>
          Add Course
        </button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
