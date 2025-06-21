import useMessageRooms from '../../hooks/useMessageRooms';
'hooks/useMessageRooms';
import ConversationCard from './ConversationCard';


const URL = 'http://localhost:8080';

const MessageRooms = () => {
  const { rooms, user } = useMessageRooms();

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