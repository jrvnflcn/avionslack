import React from "react";
import Chat from "./Chat/Chat";

function ChannelContent({ selectedChannel }) {
  return (
    <div className="channel-content">
      <h3>
        {selectedChannel ? selectedChannel.name : "Select a channel"}</h3>
        <Chat />
    </div>
  );
}

export default ChannelContent;
