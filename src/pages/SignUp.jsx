import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/Constants";
import { useData } from "../context/DataProvider";

function SignUp() {
  const { handleHeaders } = useData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

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
    <div>
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
