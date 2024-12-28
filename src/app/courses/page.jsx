"use client";
import { useState, useEffect } from "react";
import axios from "axios";

import { FaChalkboardTeacher } from "react-icons/fa";
import { useLocalStorageState } from "../../../hooks/useLocalStorage";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  const [token] = useLocalStorageState("authToken");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://react-interview.crd4lc.easypanel.host/api/course",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Courses:", response.data.data.data);
        setCourses(response.data.data.data);
      } catch (err) {
        console.error(err.message);
        setError("Failed to fetch courses. Please try again later.");
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container">
      <h1>Available Courses</h1>
      {error && <p className="error">{error}</p>}
      <div className="card-container">
        {courses.map((course) => (
          <div className="card" key={course.id}>
            <div
              className="badge"
              style={{
                backgroundColor: course.badge_color || "#dc3545",
              }}
            >
              {course.badge_text}
            </div>
            <img
              src={course.image || "/placeholder.jpg"}
              alt={course.title}
              className="course-image"
            />
            <div className="card-content">
              <h3>{course.title}</h3>
              <p className="instructor">
                <FaChalkboardTeacher /> {course.instructor_name}
              </p>
              <p className="description">{course.description}</p>
              <button className="view-button">View Detail</button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
          background-color: #f8f9fa;
        }

        h1 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 2.5rem;
          color: #333;
          font-weight: 700;
        }

        .error {
          color: red;
          text-align: center;
          margin-bottom: 1rem;
        }

        .card-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .card {
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease-in-out;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
        }

        .badge {
          position: absolute;
          top: 15px;
          left: 15px;
          padding: 8px 12px;
          border-radius: 15px;
          color: #fff;
          font-size: 0.85rem;
          font-weight: bold;
          text-transform: uppercase;
        }

        .course-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .card-content {
          padding: 1.5rem;
          text-align: center;
          flex-grow: 1;
        }

        h3 {
          font-size: 1.5rem;
          font-weight: bold;
          color: #222;
          margin-bottom: 0.75rem;
        }

        .instructor {
          font-size: 1rem;
          color: #555;
          margin-bottom: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
        }

        .description {
          font-size: 0.95rem;
          color: #666;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .view-button {
          display: inline-block;
          padding: 0.7rem 1.5rem;
          font-size: 1rem;
          font-weight: bold;
          color: #fff;
          background-color: #007bff;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          text-transform: uppercase;
          transition: background-color 0.3s ease-in-out,
            transform 0.3s ease-in-out;
        }

        .view-button:hover {
          background-color: #0056b3;
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .card-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
