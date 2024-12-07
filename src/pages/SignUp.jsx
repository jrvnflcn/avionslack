import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/Constants";
import { useData } from "../context/DataProvider";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { handleHeaders } = useData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

  
    if (!email || !password || !password_confirmation) {
      setError("All fields are required.");
      return;
    }

    if (password !== password_confirmation) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true); 

    try {
      const loginCredentials = { email, password, password_confirmation };
      const response = await axios.post(`${API_URL}/auth/`, loginCredentials);

      const { data, headers } = response;
      if (data && headers) {
        handleHeaders(headers);
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
        navigate("/login"); 
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setError(error.response.data.errors.join(", "));
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Confirm Password"
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default SignUp;
