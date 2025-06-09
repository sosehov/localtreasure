import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
const URL = 'http://localhost:8080';


const MessageBox = () => {

  // all of this prob goes into a hook
  const socket = io(URL);
  const [name, setName] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log('MOUNTS <-------');

    const newConnection = payload => {
      console.log('you have connected');
      setName(payload.name);
      setUsers(payload.users);
    }
    const newUser = payload => {
      console.log("someone new has joined the chat");
      console.log(payload);
      setUsers(prev => [...prev, payload.name]);
    }
    const newMessage = payload => {
      console.log("message is here!");
      xonsole.log(payload);
      setMessages(prev => [...prev, payload]);
    }

    socket.on('NEW_CONNECTION', newConnection);
    socket.on('NEW_USER', newUser);
    socket.on('NEW_MESSAGE', newMessage);

  }, [])

  return (
    <div className = "message-box">
      { messages }
      <form>
      <input type="text"></input>
      <button type = "submit" action="/messages" method = "POST">Send</button>
      </form>
    </div>
  )
};

export default MessageBox;