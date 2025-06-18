import { io } from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { useSearchParams } from 'react-router-dom';

import MessageBox from './MessageBox';
import MessageInputForm from './MessageInputForm';

const URL = 'http://localhost:8080';

const MessageRoom = () => {

  // get user from JWT
  const { token, makeAuthenticatedRequest, user } = useAuth();
  // get reciever from url
  const [searchParams] = useSearchParams();
  const reciever_id = searchParams.get('reciever_id') ? searchParams.get('reciever_id') : 2;
  console.log('reciever_id:', reciever_id);

  const socketRef = useRef(null);

  // state
  const [messages, setMessages] = useState([]);
  

  useEffect(() => {
    // dont run if user or token hasn't loaded in yet
    if (!user || !token) return;

    // get all the messages from db once when the page loads.
    const fetchMessages = async () => {
      try {
        const fetchURL = `api/messages?senderId=${user.id}&receiverId=${reciever_id}`
        const response = await makeAuthenticatedRequest(fetchURL, {
          method: "GET"
        });
        const data = await response.json();
        setMessages(data.messages);
        console.log('data after fetch:', data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    
    fetchMessages();

    // websocket mounts
    socketRef.current = io(URL);
    const socket = socketRef.current;

    // when new user joins socket, send that info to backend
    socket.emit("NEW_USER", user.id);

    // new message being sent
    const sentMessage = message => {
      if (!user || !token) return;

      console.log('new message is here:', message);
      setMessages(prev => {
        // console.log('message prev:', prev);
        return [ ...prev, message];
      });

      // add new message to db, can 
      makeAuthenticatedRequest('/api/messages', {
        method: 'POST',
        body: JSON.stringify({ message })
      })
      .then(res => console.log('message write status:', res))
    };

    const recieveMessage = message => {
      setMessages(prev => {
        // console.log('message prev:', prev);
        return [ ...prev, message];
      });
    }

    socket.on('SENT_MESSAGE', sentMessage);
    socket.on('RECIEVE_MESSAGE', recieveMessage);

    // cleanup
    return () => {
      socket.off('NEW_MESSAGE', sentMessage);
    };  
  },[token, user, makeAuthenticatedRequest]);


  const handleSubmit = (e, user) => {
    e.preventDefault();
    // add form validation
    const messageText = e.target[0].value; // see if we can make this more specific
    // console.log('message from form', messageText);
    const message = {
      sender_id: user.id,
      reciever_id: reciever_id,
      content: messageText,
      sendtime: `${new Date().toISOString()}`
    };
    socketRef.current.emit('SEND_MESSAGE', message);
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