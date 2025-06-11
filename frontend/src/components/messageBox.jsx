import { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
const URL = 'http://localhost:8080';


const MessageBox = () => {

  const socketRef = useRef(null)
  // all of this prob goes into a hook
  // const socket = io(URL);
  const [name, setName] = useState(null);
  const [users, setUsers] = useState([]);
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
      setMessages(prev => [...prev, payload.message]);
    }

    socket.on('NEW_CONNECTION', newConnection);
    socket.on('NEW_USER', newUser);
    socket.on('NEW_MESSAGE', newMessage);

  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    // form validation
    const message = e.target[0].value;
    console.log('message from form', message);
    socketRef.current.emit('SEND_MESSAGE', { message });
    e.target.reset();
  }

  return (
    <div className = "message-box">
      <ul>
        { messages }
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text"></input>
        <button type="submit">Send</button>
      </form>
    </div>
  )
};

export default MessageBox;