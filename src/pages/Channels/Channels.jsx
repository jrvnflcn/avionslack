import React, { useState, useEffect } from "react";
import { useData } from "../../context/DataProvider";
import axios from "axios";
import { API_URL } from "../../constants/Constants";

function Channels({ onChannelSelect }) {
  const { userHeaders } = useData();
  const [channelList, setChannelList] = useState([]);

  const getChannels = async () => {
    try {
      const response = await axios.get(`${API_URL}/channels`, { headers: userHeaders });
      const channels = response.data.data;
      setChannelList(channels);
    } catch (error) {
      if (error.response?.data?.errors) {
        return alert("Cannot get channels");
      }
    }
  };

  useEffect(() => {
    if (channelList.length === 0) {
      getChannels();
    }
  }, [channelList]);

  return (
    <div className="sidebar">
      {channelList &&
        channelList.map((channel) => {
          const { id, name } = channel;
          return (
            <div
              key={id}
              className="channel-tab"
              onClick={() => onChannelSelect(channel)}
            >
              {name}

              
            </div>

          );
        })}
      {!channelList && <div>No channels available</div>}

      <a className="add-channel"> + Add Channel </a>
    </div>
  );
}

export default Channels;
