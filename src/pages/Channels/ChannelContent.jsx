import React, { useState, useEffect } from "react";
import Chat from "./Chat/Chat";

function ChannelContent({ selectedChannel }) {
  const [lastChannelName, setLastChannelName] = useState(null);

  useEffect(() => {
    if (selectedChannel) {
      setLastChannelName(selectedChannel.name);
    }
  }, [selectedChannel]);

  return (
    <div className="channel-content">
      <div className="channel-header">
        <h3>{selectedChannel ? selectedChannel.name : lastChannelName || "Select a channel"}</h3>
      </div>
      <div className="channel-chat">
        {selectedChannel ? (
          <Chat selectedChannelId={selectedChannel.id} />
        ) : (
          <p>Please select a channel to see the chat.</p>
        )}
      </div>
    </div>
  );
}

export default ChannelContent;
