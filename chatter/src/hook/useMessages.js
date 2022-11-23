import { useCallback, useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import useSound from "use-sound";
import config from "../config";
import LatestMessagesContext from "../contexts/LatestMessages/LatestMessages";
import INITIAL_BOTTY_MESSAGE from "../common/constants/initialBottyMessage";

const socket = io(config.BOT_SERVER_ENDPOINT, {
  transports: ["websocket", "polling", "flashsocket"],
});

const botTypingEvent = "bot-typing";
const botMessageEvent = "bot-message";

export function useMessages() {
  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
  const { setLatestMessage } = useContext(LatestMessagesContext);
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState(null);
  const [messageList, setMessageList] = useState([
    {
      message: {
        user: "bot",
        id: "id" + new Date().getTime(),
        message: INITIAL_BOTTY_MESSAGE,
      },
      botTyping: false,
      nextMessage: {
        user: "bot",
      },
    },
  ]);
  const messageListElem = useRef(null);

  // listen to bot response
  const listenToSocketEvents = () => {
    socket.on(botTypingEvent, () => {
      setMessage({
        message: {
          user: "bot",
          id: "id" + new Date().getTime(),
          message: null,
        },
        botTyping: true,
        nextMessage: {
          user: "bot",
        },
      });
    });

    socket.on(botMessageEvent, (msg) => {
      playReceive();
      setMessage({
        message: {
          user: "bot",
          id: "id" + new Date().getTime(),
          message: msg,
        },
        botTyping: false,
        nextMessage: {
          user: "bot",
        },
      });

      setLatestMessage("charles", msg);
    });
  };

  // handle user input
  const handleOnChange = useCallback(
    (e) => {
      const value = e.target.value;
      setUserInput(value);
    },
    [userInput]
  );

  // handle send message
  const handleSendMessage = () => {
    socket.emit("user-message", userInput);
    playSend();
    setMessage({
      message: {
        user: "me",
        id: "id" + new Date().getTime(),
        message: userInput,
      },
      botTyping: false,
      nextMessage: {
        user: "me",
      },
    });
    setLatestMessage("charles", userInput);
    setUserInput("");
  };

  const scrollToBottom = () => {
    const elem = messageListElem.current;
    elem.scrollTop = elem.scrollHeight;
  };

  useEffect(() => {
    listenToSocketEvents();
    const interval = setInterval(() => {
      scrollToBottom();
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (message) {
      setMessageList(
        [...messageList, message].filter((data) => !data.botTyping)
      );
    }
  }, [message]);

  return {
    message: userInput,
    messageList,
    messageListElem,
    handleOnChange,
    handleSendMessage,
    scrollToBottom,
  };
}
