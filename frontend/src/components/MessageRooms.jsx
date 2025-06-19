import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from 'react';
import { Link } from "react-router";

const URL = 'http://localhost:8080';

const MessageRooms = () => {
  const { token, makeAuthenticatedRequest, user } = useAuth();
  
  // state
  const [rooms, setRooms] = useState([]);
  
  // fetch rooms
  useEffect(() => {
    // dont run if user or token hasn't loaded in yet
    if (!user || !token) return;

    // get all the rooms for this user from db once when the page loads.
    const fetchRooms = async () => {
      try {
        const fetchURL = `api/messageRooms?senderId=${user.id}`
        const response = await makeAuthenticatedRequest(fetchURL, {
          method: "GET"
        });
        const data = await response.json();
        setRooms(data.rooms);
        console.log('rooms after fetch:', rooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    
    fetchRooms();
  }, [ user, token, makeAuthenticatedRequest]);


  // each room in db with a sender and reciever id, if user ever message someone, an entry gets created in db for the room
  // then here we pull all the rooms for this user have reciever id ready
  // if the reciever id is not equal to user id then it is the reciver id, otherwise the sender_id is
  const getReceiverId = (room) => {
    const receiver_id = user.id === room.sender_id ? room.receiver_id : room.sender_id;
    console.log('room sender:', user.id, ', room receiver:', receiver_id);
    return receiver_id;
  };

  return (
    <ul>
      {rooms.length > 0 ? (
        rooms.map(room => (
          <li key={room.id}>
            <Link to={`/message?reciever_id=${getReceiverId(room)}`}> {getReceiverId(room)} </Link>
          </li>
        ))
    ) : (
      <li>Loading rooms...</li>
    )}  
    </ul>
  )
};

export default MessageRooms;