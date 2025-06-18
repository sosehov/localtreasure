import MessageRoom from './MessageRoom';

const URL = 'http://localhost:8080';

const MessageRooms = () => {
  return (
    <div>
      {/* each room in db with a sender and reciever id, if user ever message someone, an entry gets created in db for the room
      then here we pull all the rooms for this user have reciever id ready */}
      < MessageRoom />
    </div>
  )
};

export default MessageRooms;