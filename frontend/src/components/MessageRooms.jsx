import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from 'react';
import ConversationCard from './ConversationCard';


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
  

  return (
    <div>
    {rooms.length > 0 && user.name ? (
      <>
        <p>{user.name}</p>
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>
              <ConversationCard room={room} />
            </li>
          ))}
        </ul>
      </>
      ) : (
        <p>Loading rooms...</p>
      )}
    </div>
  )
};

export default MessageRooms;