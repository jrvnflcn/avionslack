import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Select from "react-select";
import axios from "axios";
import { API_URL } from "../../constants/Constants";
import { useData } from "../../context/DataProvider";

function AddUserToChannel() {
  const { userHeaders } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${API_URL}/channel/add_member`,
        userHeaders
      );

      // CONTINUE HERE

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
 
export default AddUserToChannel;