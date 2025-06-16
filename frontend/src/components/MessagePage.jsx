import { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { useAuth } from "../contexts/AuthContext";
import MessageBox from './MessageBox';
import MessageInputForm from './MessageInputForm';
const URL = 'http://localhost:8080';


const MessagePage = () => {

  // get user from JWT
  const { user } = useAuth();
  // console.log('user object from jwt inside messagepage:', user);

  const socketRef = useRef(null);
  // all of this goes into a hook later
  const [name, setName] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // get all the messages from db once when the page loads.
    const fetchMessages = async () => {
      try {
        const fetchURL = `http://localhost:8080/api/messages?senderId=1&receiverId=2`
        const response = await fetch(fetchURL, {
          method: "GET"
      });
        const data = await response.json();
        setMessages(data);
        console.log('data after fetch:', data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    
    // websocket stuff 
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
      console.log('newuser payload:', payload);
      setUsers(prev => [...prev, payload.name]);
    }
    const newMessage = payload => {
      console.log("message is here!");
      console.log(payload);
      // create message object with all the properties first
      const message = {
        sender_id: payload.user.id,
        reciever_id: 2, // this needs to be changed to actual reciver id later
        content: payload.message,
        sendtime: new Date()
      };
      setMessages(prev => [...prev, message]);
    }

    
    fetchMessages();
    socket.on('NEW_CONNECTION', newConnection);
    socket.on('NEW_USER', newUser);
    socket.on('NEW_MESSAGE', newMessage);
    
  }, [])
  
  const handleSubmit = (e, user) => {
    e.preventDefault();
    // add form validation
    const message = e.target[0].value; // see if we can make this more specific
    console.log('message from form', message);
    socketRef.current.emit('SEND_MESSAGE', { message, user });
    e.target.reset(); // resets whole form
  };

  return (
    <div className = "message-box">
      < MessageBox messages={messages} sender={user}/>
      < MessageInputForm user={user} handleSubmit = {handleSubmit}/>
    </div>
  )
};

export default MessagePage;