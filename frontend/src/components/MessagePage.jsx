import { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { useAuth } from "../contexts/AuthContext";
import MessageBox from './MessageBox';
import MessageInputForm from './MessageInputForm';
const URL = 'http://localhost:8080';


const MessagePage = () => {

  // get user from JWT
  const { user } = useAuth();


  const socketRef = useRef(null);
  // all of this prob goes into a hook
  const [name, setName] = useState(null);
  const [users, setUsers] = useState([]);
  // fetch messages from db and set initial state of messages to that.
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log('MOUNTS <-------');
    socketRef.current = io(URL);

    const socket = socketRef.current;

    const newConnection = payload => {
      console.log(`${payload.name} has connected`);
      setName(payload.name);
      setUsers(payload.users);
    }
    const newUser = payload => {
      console.log(`${payload.name} new has joined the chat`);
      console.log(payload);
      setUsers(prev => [...prev, payload.name]);
    }
    const newMessage = payload => {
      console.log("message is here!");
      console.log(payload);
      // create message object with all the properties first
      const message = {

      };
      setMessages(prev => [...prev, message]);
    }

    socket.on('NEW_CONNECTION', newConnection);
    socket.on('NEW_USER', newUser);
    socket.on('NEW_MESSAGE', newMessage);

  }, [])

  return (
    <div className = "message-box">
      < MessageBox messages={messages} sender={user}/>
      < MessageInputForm user={user}/>
    </div>
  )
};

export default MessagePage;