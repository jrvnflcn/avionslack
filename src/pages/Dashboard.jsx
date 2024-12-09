import React, { useState, useEffect } from "react";
import Channels from "./Channels/Channels";
import ChannelContent from "./Channels/ChannelContent";
import "./Dashboard.css";
import flackLogo from "../assets/Slack.png";
import DirectMessages from "./Channels/DirectMessages";

function Dashboard(props) {
  const { onLogout } = props;
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="dashboard-container">
      <div className="navbar">
        <div className="nameLogo">
          <img src={flackLogo} className="logo" />
          <span>Flack</span>
        </div>
        <button onClick={onLogout}>Logout</button>
      </div>
      <div className="main-layout">
        <div className="sidebar-container">
          <h4>CHANNELS</h4>
          <Channels onChannelSelect={handleChannelSelect} />
          <h4>DIRECT MESSAGES</h4>
          <DirectMessages onUserSelect={handleUserSelect}/>
        </div>
        <div className="content-container">
          <ChannelContent selectedChannel={selectedChannel} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
