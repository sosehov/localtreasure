import { Link } from "react-router";
import DeleteButton from './DeleteButton';
import useReceiver from '../../hooks/useReceiver';

const ConversationCard = (props) => {

  const { receiver, receiverId } = useReceiver(props.room);

  const handleChatClick = () => {
    props.setReceiver(receiverId);
  };

  return (
    <div>
      <li key={props.room.id} className="group flex items-center justify-between px-4 py-2 rounded-md transition-colors hover:bg-[#fda738]/80">
        {receiver ? (
          <button onClick={handleChatClick} className="truncate"> {receiver.name} </button>
        ) : (
          <p>Loading conversation...</p>
        )}
        < DeleteButton room={props.room} setRooms={props.setRooms}/>
      </li>
    </div>
  )
};

export default ConversationCard;