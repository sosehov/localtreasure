import { Link } from "react-router";
import DeleteButton from './DeleteButton';
import useReceiver from '../../hooks/useReceiver';

const ConversationCard = (props) => {

  const { receiver, receiverId } = useReceiver(props.room);

  return (
    <div>
      <li key={props.room.id}>
        {receiver ? (
          <Link to={`/message?receiver_id=${receiverId}`}> {receiver.name} </Link>
        ) : (
          <p>Loading conversation...</p>
        )}
        < DeleteButton room={props.room}/>
      </li>
    </div>
  )
};

export default ConversationCard;