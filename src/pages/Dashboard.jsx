import React, { useState, useEffect } from "react";
import Channels from "./Channels/Channels";
import ChannelContent from "./Channels/ChannelContent";
import "./Dashboard.css";
import flackLogo from "../assets/Slack.png";

function Dashboard(props) {
  const { onLogout } = props;
  const [selectedChannel, setSelectedChannel] = useState(null);

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
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
          <Channels onChannelSelect={handleChannelSelect} />
        </div>
        <div className="content-container">
          <ChannelContent selectedChannel={selectedChannel} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
