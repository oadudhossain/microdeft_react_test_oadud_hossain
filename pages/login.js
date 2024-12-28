import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://react-interview.crd4lc.easypanel.host/api/login",
        {
          email,
          password,
        }
      );

      const { token } = response.data;

      localStorage.setItem("authToken", token);

      setMessage("Login successful!");
    } catch (error) {
      setMessage("Login failed. Please check your credentials.");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#0070f3",
            color: "#fff",
          }}
        >
          Login
        </button>
      </form>
      {message && (
        <p
          style={{
            marginTop: "20px",
            color: message.includes("failed") ? "red" : "green",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
