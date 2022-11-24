import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import useSound from "use-sound";
import config from "../../../config";
import LatestMessagesContext from "../../../contexts/LatestMessages/LatestMessages";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/_messages.scss";

const socket = io(config.BOT_SERVER_ENDPOINT, {
  transports: ["websocket", "polling", "flashsocket"],
});

function Messages() {
  // Warning: CORS is rejecting the below sounds
  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
  const { messages, setLatestMessage } = useContext(LatestMessagesContext);
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([messages["bot"]]);
  const [myMessages, setMyMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  // TODO: replace useEffect's "bot-message" & "bot-typing" by useCallback
  // TODO: scroll to bottom of message list when sending/receiving a message
  //       by attaching a ref to the last message

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to socket server");
    });

    socket.on("disconnect", () => {
      console.log("disconnected from socket server");
      // we can do reconnect if needed
    });

    socket.on("bot-message", (msg) => {
      setTyping(false);
      setMessageHistory([...messageHistory, msg]);
      setLatestMessage("bot", msg);
    });

    socket.on("bot-typing", () => {
      setTyping(true);
    });
  });

  const sendMessage = () => {
    setMessageHistory([...messageHistory, message]);
    setMyMessages([...myMessages, message]);
    setLatestMessage("bot", message);
    setMessage("");

    socket.emit("user-message", message);
  };

  const onChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="messages">
      <Header />
      <div className="messages__list" id="message-list">
        {messageHistory.map((msg, index) => (
          <div
            className={`messages__message ${
              myMessages.includes(msg) ? "messages__message--me" : ""
            } ${
              index == messageHistory.length - 1
                ? "messages__message--last"
                : ""
            }`}
          >
            {msg}
          </div>
        ))}
        {typing && (
          <div className="messages__message messages__message--typing">
            Botty is typing...
          </div>
        )}
      </div>
      <Footer
        message={message}
        sendMessage={sendMessage}
        onChangeMessage={onChangeMessage}
      />
    </div>
  );
}

export default Messages;
