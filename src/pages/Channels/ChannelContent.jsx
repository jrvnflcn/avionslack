import React from "react";

function ChannelContent({ selectedChannel }) {
  return (
    <div className="channel-content">
      <h3>{selectedChannel ? selectedChannel.name : "Select a channel"}</h3>
    </div>
  );
}

export default ChannelContent;
