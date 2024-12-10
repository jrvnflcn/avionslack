import React, { useState, useEffect } from "react";
import Channels from "./Channels/Channels";
import ChannelContent from "./Channels/ChannelContent";
import DirectMessages from "./Channels/DirectMessages";
import DirectMessageContent from "./Channels/DirectMessageContent";
import "./Dashboard.css";
import flackLogo from "../assets/Slack.png";

function Dashboard(props) {
  const { onLogout } = props;
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    setSelectedUser(null);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setSelectedChannel(null);
  };

  return (
    <div className="dashboard-container">
      <div className="navbar">
        <div className="nameLogo">
          <img src={flackLogo} className="logo" alt="Flack Logo" />
          <span>Flack</span>
        </div>
        <button onClick={onLogout}>Logout</button>
      </div>
      <div className="main-layout">
        <div className="sidebar-container">
          <div className="channels-container">
            <h4>CHANNELS</h4>
            <Channels onChannelSelect={handleChannelSelect} />
          </div>
          <div className="dms-container">
            <h4>DIRECT MESSAGES</h4>
            <DirectMessages onUserSelect={handleUserSelect} />
          </div>
        </div>
        <div className="content-container">
          {selectedUser ? (
            <DirectMessageContent selectedUser={selectedUser} />
          ) : selectedChannel ? (
            <ChannelContent selectedChannel={selectedChannel} />
          ) : (
            <p>Please select a channel or a user to start chatting.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
