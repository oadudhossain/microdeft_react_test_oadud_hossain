import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorage";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [_, setToken] = useLocalStorageState("authToken", "");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://react-interview.crd4lc.easypanel.host/api/login",
        formData
      );
      console.log("Token:", response);
      const { data } = response.data;

      setToken(data.token);
      console.log("Token:", data.token, response, typeof response);

      router.push("/courses", { scroll: false });
    } catch (error) {
      setResponseMessage("An error occurred. Please try again later.");
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <button type="submit" style={{ padding: "0.5rem", width: "100%" }}>
          Register
        </button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
