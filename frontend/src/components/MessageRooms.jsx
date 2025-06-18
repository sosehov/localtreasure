import MessageRoom from './MessageRoom';
import { useAuth } from "../contexts/AuthContext";

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
          console.log('rooms after fetch:', data);
        } catch (error) {
          console.error("Error fetching rooms:", error);
        }
      };
      
      fetchRooms();
    }, []);

    // each room in db with a sender and reciever id, if user ever message someone, an entry gets created in db for the room
    // then here we pull all the rooms for this user have reciever id ready
  return (
    <ul>
      {rooms.map(room => (
        <li key={room.id}>
          <Link to={`/message?reciever_id=${room.reciver_id}`}> room.reciever_id </Link>
        </li>
      ))}  
    </ul>
  )
};

export default MessageRooms;