import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/Constants";
import { useData } from "../context/DataProvider";
import "./SignUp.css"
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { handleHeaders } = useData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const loginCredentials = { email, password, password_confirmation };
      const response = await axios.post(
        `${API_URL}/auth/`,
        loginCredentials
      );
      const { data, headers } = response;

      if (data && headers) {
        handleHeaders(headers);
        navigate("/login");
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setError("Invalid credentials. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div>
          <input
            type="password"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Confirm Password"
          />
        </div>
        <button type="submit">Create Account</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default SignUp;
