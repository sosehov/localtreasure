import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from 'react';

const useMessageRooms = () => {
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

  }, [token]);

  return { rooms, user, setRooms }
}

export default useMessageRooms;