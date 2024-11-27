import React, { useState, useEffect } from "react";
import { useData } from "../../context/DataProvider";
import axios from "axios";
import { API_URL } from "../../constants/Constants";

function Channels(props) {
  const { userHeaders } = useData();
  const [channelList, setChannelList] = useState([]);

  const getChannels = async () => {
    try {
      const response = await axios.get(`${API_URL}/channels`, { headers: userHeaders });
      const channels = response.data.data;
      setChannelList(channels);
    } catch (error) {
      if (error.response.data.errors) {
        return alert("Cannot get channels");
      }
    }
  }

  // const addChannel = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const channelDetails = {
  //       name,
  //       user_ids
  //     }

  //     const response = await axios.post(`${API_URL}/channels`, channelDetails);
  //     const { data, headers } = response;
  //     if(data && headers) {
  //       handleHeaders(headers);
  //     }
  //   } catch(error) {
  //     if(error.response.data.errors) {
  //       return alert("Channel creation failed.");
  //     }
  //   }
  // };

  useEffect(() => {
    if(channelList.length === 0) {
      getChannels();
    }
  })

  return (
    <div>
      {
        channelList &&
        channelList.map((channelName) => {
            const { id, name } = channelName;
            return (
              <div key={id}>
                  <p>{name}</p>
              </div>
            )
        })
      }

      { !channelList && <div>No channels available</div> }
    </div>
  );
}

export default Channels;