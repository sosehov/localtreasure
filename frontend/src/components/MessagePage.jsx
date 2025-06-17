import { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { useAuth } from "../contexts/AuthContext";
import MessageBox from './MessageBox';
import MessageInputForm from './MessageInputForm';
const URL = 'http://localhost:8080';


const MessagePage = () => {

  // get user from JWT
  const { makeAuthenticatedRequest } = useAuth();
  const { user } = useAuth();

  // const user = {
  //   id: 1,
  //   name : 'Alice Henderson'
  // };
  console.log('user object from jwt inside messagepage:', user);

  const socketRef = useRef(null);
  // all of this goes into a hook later
  const [name, setName] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   makeAuthenticatedRequest('/api/messages')
  //     .then(res => {
  //       if (!res.ok) throw new Error('Failed to fetch messages');
  //       return res.json();
  //     })
  //     .then(data => setUpcomingEvents(data))
  //     .catch(err => console.error("Failed to fetch messages", err));
  // }, [makeAuthenticatedRequest]);

  useEffect(() => {
    // get all the messages from db once when the page loads.
    const fetchMessages = async () => {
      try {
        const fetchURL = `http://localhost:8080/api/messages?senderId=${user.id}&receiverId=2`
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
  }, []);

  useEffect(() => {
    
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

    const newMessage = message => {

      console.log('new message is here:', message);
      setMessages(prev => {
        console.log('message prev:', prev);
        return [ ...prev, message];
      });

      // add new message to db, can 
      makeAuthenticatedRequest('http://localhost:8080/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      })
      .then(res => console.log('message write status:', res))
    };

    socket.on('NEW_CONNECTION', newConnection);
    socket.on('NEW_USER', newUser);
    socket.on('NEW_MESSAGE', newMessage);
    
    return () => {
      socket.off('NEW_MESSAGE', newMessage);
    };  
  }, []);
  
  const handleSubmit = (e, user) => {
    e.preventDefault();
    // add form validation
    const messageText = e.target[0].value; // see if we can make this more specific
    // console.log('message from form', messageText);
    const message = {
      sender_id: user.id,
      reciever_id: 2, // this needs to be changed to actual reciver id later
      content: messageText,
      sendtime: `${new Date().toISOString()}`
    };
    socketRef.current.emit('SEND_MESSAGE', message);
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