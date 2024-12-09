import React from "react";
import ChatDM from "./Chat/ChatDM";

function DirectMessageContent({ selectedUser }) {
  return (
    <div className="channel-content">
      <div className="channel-header">
        <h3>Chat with {selectedUser.email || "Unknown User"}</h3>
      </div>
      <div className="channel-chat">
        <ChatDM selectedUser={selectedUser} />
      </div>
    </div>
  );
}

export default DirectMessageContent;
