import React, { useState, useEffect } from "react";
import { useData } from "../../context/DataProvider";
import axios from "axios";
import { API_URL } from "../../constants/Constants";
import AddChannelModal from "./AddChannelModal";

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
          response.data.data.forEach((message) => {
            if (
              message.sender.uid === loggedInUserUid || 
              message.receiver.uid === loggedInUserUid
            ) {
              involvedUsers.add(user.uid); 
            }
          });
        }
      }

      const filteredUsers = allUsers.filter((user) => involvedUsers.has(user.uid));

      setDirectMessageList(filteredUsers); 
    } catch (error) {
      setError("Cannot get messages. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userHeaders.uid) {
      getUserDM();
    }
  }, [userHeaders]);

  return (
    <div className="direct-messages">
      {loading ? (
        <div>Loading messages...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : directMessageList.length === 0 ? (
        <div>No messages available. Send one to get started!</div>
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

      <button className="new-message" onClick={() => setModalIsOpen(true)}>
        + New Message
      </button>

      {modalIsOpen && <AddChannelModal onClose={() => setModalIsOpen(false)} />}
    </div>
  );
}

export default DirectMessages;
