import React, { useState, useEffect } from "react";
import { useData } from "../../context/DataProvider";
import axios from "axios";
import { API_URL } from "../../constants/Constants";
import AddChannelModal from "./AddChannelModal"; 

function Channels({ onChannelSelect }) {
  const { userHeaders } = useData();
  const [channelList, setChannelList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const getChannels = async () => {
    try {
      const response = await axios.get(`${API_URL}/channels`, {
        headers: userHeaders,
      });
      setChannelList(response.data.data);
    } catch (error) {
      alert("Cannot get channels");
    }
  };

  useEffect(() => {
    getChannels();
  }, []);

  const handleChannelAdded = (newChannel) => {
    setChannelList([...channelList, newChannel]);
  };

  return (
    <div className="sidebar">
      {channelList.length === 0 ? (
        <div>No channels available</div>
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
    </div>
  );
}

export default Channels;
