import MessageRoom from './MessageRoom';
import MessageRooms from './MessageRooms';

const MessagePage = () => {
  [recieverId, setReceiver] = useState(null);

  return (
    <div>
      <MessageRooms setReceiver={setReceiver}/>
      <div>
        {receiverId ? (
          <MessageRoom receiver={receiverId} />
        ) : (
          <p> Your messages will show here </p>
        )}
      </div>
    </div>
  )
}

export default MessagePage;