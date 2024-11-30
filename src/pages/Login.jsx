import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/Constants";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataProvider";
import Modal from "react-modal";
import "./Login.css";
import flackLogo from "../assets/Slack.png";
import SignUp from "./SignUp.jsx"; 

Modal.setAppElement("#root");

function Login(props) {
  const { onLogin } = props;
  const { handleHeaders } = useData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUpOpen, setIsSignUpOpen] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const loginCredentials = { email, password };
      const response = await axios.post(
        `${API_URL}/auth/sign_in`,
        loginCredentials
      );
      const { data, headers } = response;

      if (data && headers) {
        handleHeaders(headers);
        onLogin();
        navigate("/dashboard");
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
    <div className="login-container">
      <img src={flackLogo} className="login-logo" />
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
        <button type="submit">Login</button>
        <div className="login-footer">
          <a
            href="#"
            className="sign-up-link"
            onClick={() => setIsSignUpOpen(true)} 
          >
            Sign Up
          </a>
          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>

  
      <Modal
        isOpen={isSignUpOpen}
        onRequestClose={() => setIsSignUpOpen(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <SignUp />
      </Modal>
    </div>
  );
}

export default Login;
