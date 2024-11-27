import React, { useState, useEffect } from "react";
import { useData } from "../context/DataProvider";
import axios from "axios";
import { API_URL } from "../constants/Constants";

function Chat(props) {
  const { onLogout } = props;
  const { userHeaders } = useData();
  const [userList, setUserList] = useState([]);

  const getMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/messages?receiver_id&receiver_class=User`, { headers: userHeaders });
      const users = response.data.data;
      setUserList(users);
    } catch (error) {
      if (error.response.data.errors) {
        return alert("Cannot get users");
      }
    }
  }
}
