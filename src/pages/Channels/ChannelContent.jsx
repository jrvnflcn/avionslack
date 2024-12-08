import React, { useState, useEffect } from "react";
import Chat from "./Chat/Chat";
import ViewChannelMembers from "./ViewChannelMembers";

function ChannelContent({ selectedChannel }) {
  const [lastChannelName, setLastChannelName] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (selectedChannel) {
      setLastChannelName(selectedChannel.name);
    }
  }, [selectedChannel]);

  return (
    <div className="channel-content">
      <div className="channel-header">
        <h3>{selectedChannel ? selectedChannel.name : lastChannelName || "Select a channel"}</h3>
        {selectedChannel && (
          <button onClick={() => setShowModal(true)}>View Members</button>
        )}
      </div>
      <div className="channel-chat">
        {selectedChannel ? (
          <Chat selectedChannelId={selectedChannel?.id} />
        ) : (
          <p>Please select a channel to see the chat.</p>
        )}
      </div>
      {showModal && (
        <ViewChannelMembers
          selectedChannelId={selectedChannel?.id}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default ChannelContent;
