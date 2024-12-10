import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../constants/Constants";
import { useData } from "../../context/DataProvider";
import DirectMessageModal from "./DirectMessageModal";

function DirectMessages({ onUserSelect }) {
  const { userHeaders } = useData();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [directMessageList, setDirectMessageList] = useState([]);

  const getUserDM = async () => {
    setLoading(true);
    setError(null);

    try {
      const usersResponse = await axios.get(`${API_URL}/users`, {
        headers: userHeaders,
      });
      const allUsers = usersResponse.data.data;
      const loggedInUserUid = userHeaders.uid;
      const involvedUsers = new Set();

      for (const user of allUsers) {
        if (user.uid === loggedInUserUid) continue;

        const response = await axios.get(
          `${API_URL}/messages?receiver_id=${user.id}&receiver_class=User`,
          { headers: userHeaders }
        );

        if (response.data && response.data.data.length !== 0) {
          const hasConversation = response.data.data.some(
            (message) =>
              message.sender.uid === loggedInUserUid ||
              message.receiver.uid === loggedInUserUid
          );
          if (hasConversation) {
            involvedUsers.add(user.uid);
          }
        }
      }

      const filteredUsers = allUsers.filter((user) =>
        involvedUsers.has(user.uid)
      );

      setDirectMessageList(filteredUsers);
    } catch (error) {
      setError("Cannot get messages. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleMessageSent = () => {
    getUserDM();
  };

  useEffect(() => {
    if (userHeaders.uid) {
      getUserDM();
    }
  }, [userHeaders]);

  return (
    <div className="sidebar">
      <div className="sub-container">
        {loading ? (
          <div className="no-chat">Loading messages...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : directMessageList.length === 0 ? (
          <div className="no-chat">No messages available. Send one to get started!</div>
        ) : (
          directMessageList.map((user) => (
            <div
              key={user.uid}
              className="channel-tab"
              onClick={() => onUserSelect(user)}
            >
              {user.email || "Unknown User"}
            </div>
          ))
        )}
      </div>

      <a className="add-tab" onClick={() => setModalIsOpen(true)}>
        + New Message
      </a>

      {modalIsOpen && (
        <DirectMessageModal
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          onMessageSent={handleMessageSent}
        />
      )}
    </div>
  );
}

export default DirectMessages;
