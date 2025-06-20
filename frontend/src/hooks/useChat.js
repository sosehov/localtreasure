// hooks/useMessageRoom.js
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSearchParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const URL = 'http://localhost:8080';

export const useChat = () => {
  const { token, makeAuthenticatedRequest, user } = useAuth();
  const [searchParams] = useSearchParams();
  const receiver_id = searchParams.get('receiver_id');
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user || !token) return;

    const createRoomConditional = async () => {
      try {
        const fetchURL = `api/messageRooms?senderId=${user.id}&receiverId=${receiver_id}`;
        const response = await makeAuthenticatedRequest(fetchURL, {
          method: "POST"
        });
        console.log('create room status:', response);
      } catch (error) {
        console.error("Error creating room:", error);
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

  }, [makeAuthenticatedRequest]);

  return { token, makeAuthenticatedRequest, user, receiver_id, messages, setMessages, socketRef };
};
