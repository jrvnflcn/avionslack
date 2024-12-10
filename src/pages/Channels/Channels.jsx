import React, { useState, useEffect } from "react";
import { useData } from "../../context/DataProvider";
import axios from "axios";
import { API_URL } from "../../constants/Constants";
import AddChannelModal from "./AddChannelModal";

function Channels({ onChannelSelect }) {
  const { userHeaders } = useData();
  const [channelList, setChannelList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getChannels = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/channels`, {
        headers: userHeaders,
      });
      const channels = response.data?.data || [];
      setChannelList(channels);
      console.log("Fetched channels:", channels);
    } catch (error) {
      setError("Cannot get channels. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChannels();
  }, []);

  const handleChannelAdded = async (newChannel) => {
    console.log("New channel added:", newChannel);

    setChannelList((prevChannels) => [...prevChannels, newChannel]);

    await getChannels();
  };

  return (
    <div className="sidebar">
      <div className="sub-container">
        {loading ? (
          <div className="no-chat">Loading channels...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : channelList.length === 0 ? (
          <div className="no-chat">No channels available. Add one to get started!</div>
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
      </div>

      <a className="add-tab" onClick={() => setModalIsOpen(true)}>
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
