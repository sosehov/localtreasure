// hooks/useMessageRoom.js
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
// import { useSearchParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const URL = 'http://localhost:8080';

export const useChat = (receiver_id) => {
  const { token, makeAuthenticatedRequest, user } = useAuth();
  const socketRef = useRef(null);

let reqSent = false;
  const [messages, setMessages] = useState([]);
  let reqSent = false;

  useEffect(() => {
    if (!user || !token) return;

    const createRoomConditional = async () => {
      if (!reqSent) {
        try {
          reqSent = true;
          const fetchURL = `api/messageRooms?senderId=${user.id}&receiverId=${receiver_id}`;
          const response = await makeAuthenticatedRequest(fetchURL, {
            method: "POST"
          });
          console.log('create room status:', response);
        } catch (error) {
          console.error("Error creating room:", error);
          reqSent = false;
        }
      }
    };
    createRoomConditional();

    const fetchMessages = async () => {
      try {
        const fetchURL = `api/messages?senderId=${user.id}&receiverId=${receiver_id}`;
        const response = await makeAuthenticatedRequest(fetchURL, {
          method: "GET"
        });
        const data = await response.json();
        setMessages(data.messages);
        console.log('messages after fetch:', data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();

    socketRef.current = io(URL);
    const socket = socketRef.current;

    const user_id = user.id;
    socket.emit("NEW_USER", { user_id, receiver_id });

    const receiveMessage = message => {
      setMessages(prev => [...prev, message]);
    };

    socket.on('RECEIVE_MESSAGE', receiveMessage);

  }, [token]);

  return { token, makeAuthenticatedRequest, user, messages, setMessages, socketRef };
};
