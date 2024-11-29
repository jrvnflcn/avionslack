import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../constants/Constants";
import { useData } from "../../../context/DataProvider";

function SendMessage() {
  const { userHeaders } = useData();
  const [receiver, setReceiver] = useState();
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const messageInfo = {
        receiver_id: Number(receiver),
        receiver_class: "Channel",
        body: message
      }

      const response = await axios.post(`${API_URL}/messages`, messageInfo, { headers: userHeaders });

      const { data } = response;

      if(data.data) {
        navigate('/dashboard');
        setMessage("");
        setReceiver("");
      }

      if(data.errors) {
        console.log(data.errors);
      }

    } catch(error) {
      console.log(error);
    };
  };

  return (
    <div className="sendMessage">
      <form onSubmit={handleSubmit}>
        <label>Send to:</label>
        <input
          type="number"
          className="input-style"
          onChange={(event) => setReceiver(event.target.value)}
          value={receiver}
        ></input>
        <label>Message:</label>
        <input
          type="text"
          className="input-style"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        ></input>
        <button type="submit">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </form>
    </div>
  );
}

export default SendMessage;
