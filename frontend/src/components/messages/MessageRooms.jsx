import useMessageRooms from '../../hooks/useMessageRooms';
'hooks/useMessageRooms';
import ConversationCard from './ConversationCard';


const URL = 'http://localhost:8080';

const MessageRooms = (props) => {
  const { rooms, user, setRooms } = useMessageRooms();

  return (
    <div className="w-64 border-r h-full overflow-y-auto bg-background">
      {rooms.length > 0 && user.name ? (
      <>
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">{user.name}'s Messages</h2>
        </div>
        <ul className="space-y-2 p-4">
          {rooms.map((room) => (
            <ConversationCard room={room} setRooms={setRooms} setReceiver={props.setReceiver}/>
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
