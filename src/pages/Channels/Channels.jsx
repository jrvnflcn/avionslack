import React, { useState, useEffect } from "react";
import { useData } from "../../context/DataProvider";
import axios from "axios";
import { API_URL } from "../../constants/Constants";
import AddChannelModal from "./AddChannelModal";

function Channels({ onChannelSelect }) {
  const { userHeaders } = useData();
  const [channelList, setChannelList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [directMessageList, setDirectMessageList] = useState([]);

  const getChannels = async () => {
    setLoading(true); 
    setError(null); 
    try {
      const response = await axios.get(`${API_URL}/channels`, {
        headers: userHeaders,
      });
      const channels = response.data?.data || [];
      setChannelList(channels);
    } catch (error) {
      setError("Cannot get channels. Please try again later.");
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getChannels();
  }, []);

  const handleChannelAdded = (newChannel) => {
    setChannelList((prevChannels) => [...prevChannels, newChannel]);
  };
  
  {/* start of direct messages here */}

  const getDirectMessages = async () => {
    setLoading(true); 
    setError(null); 

    const userListResponse = await axios.get(`${API_URL}/users`, { headers: userHeaders });
    const userList = userListResponse.data.data;
    const activeUserList = userList.map();

    try {
      const response = await axios.get(
        `${API_URL}/messages?receiver_id=${activeUserList.map(id)}&receiver_class=User`,
        { headers: userHeaders }
      );
      if(response.data.length !== 0) {
        const directMessages = response.data?.data || [];
        setDirectMessageList(directMessages);
      }
    } catch (error) {
      setError("Cannot get messages. Please try again later.");
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getDirectMessages();
  }, []);

  const handleNewMessage = (newMessage) => {
    setChannelList((prevMessage) => [...prevMessage, newMessage]);
  };

  {/* end of direct messages here */}

  return (
    <div className="sidebar">
      {loading ? (
        <div>Loading channels...</div> 
      ) : error ? (
        <div className="error-message">{error}</div> 
      ) : channelList.length === 0 ? (
        <div>No channels available. Add one to get started!</div> 
      ) : (
        channelList.map((channel) => (
          <div
            key={channel.id}
            className="channel-tab"
            onClick={() => onChannelSelect(channel)}
          >
            {channel.name}
          </div>
        ))
      )}

      <a className="add-channel" onClick={() => setModalIsOpen(true)}>
        + Add Channel
      </a>

      <AddChannelModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        userHeaders={userHeaders}
        onChannelAdded={handleChannelAdded}
      />


      {loading ? (
        <div>Loading messages...</div> 
      ) : error ? (
        <div className="error-message">{error}</div> 
      ) : channelList.length === 0 ? (
        <div>No messages available. Send one to get started!</div> 
      ) : (
        directMessageList.map((individual) => (
          <div
            key={individual.id}
            className="channel-tab"
            onClick={() => onChannelSelect(individual)}
          >
            {individual.uid}
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

export default Channels;
