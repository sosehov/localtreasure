import { io } from 'socket.io-client';
import { useAuth } from "../contexts/AuthContext";
// import MessageRoom from './MessageRoom';

const URL = 'http://localhost:8080';

const MessageRooms = () => {

  // get user from JWT
  const { token, makeAuthenticatedRequest, user } = useAuth();

  const socketRef = useRef(null);
  
  return (
    <div>
      MessageRoom placeholder
      {/* {props.messageRooms.map(room => ( */}
        {/* <MessageRoom room={room}/> */}
      {/* ))} */}
    </div>
  )
};

export default MessageRooms;