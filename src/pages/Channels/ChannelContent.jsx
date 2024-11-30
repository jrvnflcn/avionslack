import React from "react";
import Chat from "./Chat/Chat";

function ChannelContent({ selectedChannel }) {
  return (
    <div className="channel-content">
      <h3>
        {selectedChannel ? selectedChannel.name : "Select a channel"}
      </h3>
      {selectedChannel ? (
        <Chat selectedChannelId={selectedChannel.id} />
      ) : (
        <p>Please select a channel to see the chat.</p>
      )}
    </div>
  );
}

export default ChannelContent;
