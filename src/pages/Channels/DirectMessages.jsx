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
      // get all users
      const usersResponse = await axios.get(`${API_URL}/users`, {
        headers: userHeaders,
      });
      const allUsers = usersResponse.data.data.id;

      // get each user that has DMed you
      for (const id of allUsers) {
        const response = await axios.get(
          `${API_URL}/messages?receiver_id=${id}&receiver_class=User`,
          { headers: userHeaders }
        );
        if (response.data.length !== 0) {
          const directMessages = response.data?.data || [];
          setDirectMessageList(directMessages);
        }
      }
    } catch (error) {
      setError("Cannot get users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDM();
  }, []);

  // const handleNewMessage = (newMessage) => {
  //   setChannelList((prevMessage) => [...prevMessage, newMessage]);
  // };

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
            key={user.id}
            className="channel-tab"
            onClick={() => onUserSelect(user)}
          >
            {user.sender.uid}
          </div>
        ))
      )}

      <a className="new-message" onClick={() => setModalIsOpen(true)}>
        + New Message
      </a>

      {/* <NewMessageModal
        isOpen={modalIsOpen2}
        onRequestClose={() => setModalIsOpen2(false)}
        userHeaders={userHeaders}
        onNewMessage={handleNewMessage}
      /> */}
    </div>
  );
}

export default DirectMessages;
