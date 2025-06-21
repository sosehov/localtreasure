import { io } from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { useSearchParams } from 'react-router-dom';

import MessageBox from './MessageBox';
import MessageInputForm from './MessageInputForm';

const URL = 'http://localhost:8080';

const MessageRoom = () => {

  // get user from JWT
  const { token, makeAuthenticatedRequest, user } = useAuth();
  // get receiver from url
  const [searchParams] = useSearchParams();
  const receiver_id = searchParams.get('receiver_id');
  // console.log('receiver_id:', receiver_id);

  const socketRef = useRef(null);

  // state
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // dont run if user or token hasn't loaded in yet
    if (!user || !token) return;

    // check if a room already exists for these people, otherwise make one
    const createRoomConditional = async () => {
      try {
        const fetchURL = `api/messageRooms?senderId=${user.id}&receiverId=${receiver_id}`;
        const response = await makeAuthenticatedRequest(fetchURL, {
          method: "POST"
        })
        console.log('create room status:', response);
      } catch (error) {
        console.error("Error creating room:", error);
      }
    };
    createRoomConditional();

    // get all the messages from db once when the page loads.
    const fetchMessages = async () => {
      try {
        const fetchURL = `api/messages?senderId=${user.id}&receiverId=${receiver_id}`
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

    // websocket mounts
    socketRef.current = io(URL);
    const socket = socketRef.current;

    // when new user joins socket, send that info to backend
    const user_id = user.id;
    socket.emit("NEW_USER", { user_id, receiver_id });

    const receiveMessage = message => {
      setMessages(prev => {
        // console.log('message prev:', prev);
        return [ ...prev, message];
      });
    }

    socket.on('RECEIVE_MESSAGE', receiveMessage); 

  },[makeAuthenticatedRequest]);


  const handleSubmit = (e, user) => {
    e.preventDefault();
    // add form validation
    const messageText = e.target[0].value; // see if we can make this more specific
    // console.log('message from form', messageText);
    const message = {
      sender_id: user.id,
      receiver_id: receiver_id,
      content: messageText,
      sendtime: `${new Date().toISOString()}`
    };
    socketRef.current.emit('SEND_MESSAGE', message);
    socketRef.current.off('SEND_MESSAGE', message);

    // new message being sent
    const sentMessage = async (message) => {

      console.log('new message is here:', message);
      setMessages(prev => {
        return [ ...prev, message];
      });

      // add new message to db, can 
      const response = await makeAuthenticatedRequest('/api/messages', {
        method: 'POST',
        body: JSON.stringify({ message })
      });
      const writeStatus = await response;
      console.log(writeStatus);
      
      socketRef.current.off('SENT_MESSAGE', sentMessage); // cleanup
    };
    socketRef.current.on('SENT_MESSAGE', sentMessage);

    e.target.reset(); // resets whole form
  };

  return (
    <div>
      < MessageBox messages={messages} sender={user}/>
      < MessageInputForm user={user} handleSubmit = {handleSubmit}/>
    </div>
  )
};

export default MessageRoom;