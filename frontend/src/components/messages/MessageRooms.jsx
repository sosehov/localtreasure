import useMessageRooms from '../../hooks/useMessageRooms';
'hooks/useMessageRooms';
import ConversationCard from './ConversationCard';


const URL = 'http://localhost:8080';

const MessageRooms = (props) => {
  const { rooms, user, setRooms } = useMessageRooms();

  return (
    <div>
      {rooms.length > 0 && user.name ? (
      <>
        <p>{user.name}'s Messages</p>
        <ul>
          {rooms.map((room) => (
            <ConversationCard room={room} setRooms={setRooms} setReceiver={setReceiver}/>
          ))}
        </ul>
      </>
      ) : (
        <p>You have no messages.</p>
      )}
    </div>
  )
};

export default MessageRooms;
