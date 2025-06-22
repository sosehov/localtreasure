import { Link } from "react-router";
import DeleteButton from './DeleteButton';
import useReceiver from '../../hooks/useReceiver';

const ConversationCard = (props) => {

  const { receiver, receiverId } = useReceiver(props.room);

  const handleChatClick = () => {
    props.setReceiver(receiverId);
  } 

  return (
    <div>
      <li key={props.room.id}>
        {receiver ? (
          // <Link to={`/message?receiver_id=${receiverId}`}> {receiver.name} </Link>
          <button onClick={handleChatClick}> {receiver.name} </button>
        ) : (
          <p>Loading conversation...</p>
        )}
        < DeleteButton room={props.room} setRooms={props.setRooms}/>
      </li>
    </div>
  )
};

export default ConversationCard;