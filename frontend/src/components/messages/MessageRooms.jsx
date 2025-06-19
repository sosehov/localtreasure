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


  return (
    <div>
    {rooms.length > 0 && user.name ? (
      <>
        <p>{user.name}'s Messages</p>
        <ul>
          {rooms.map((room) => (
            <ConversationCard room={room} />
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