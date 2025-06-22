import MessageRoom from './MessageRoom';
import MessageRooms from './MessageRooms';
import  { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const MessagePage = () => {
  const [receiver_id, setReceiver] = useState(null);
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const receiver_id = searchParams.get('receiver_id');
    if (receiver_id) {
      setReceiver(receiver_id);
    }
  }, [searchParams]);

  return (
    <div className="flex h-screen">
      <MessageRooms setReceiver={setReceiver}/>
      <div style={{"border":"solid"}}>
        {receiver_id ? (
          <MessageRoom key={receiver_id} receiver_id={receiver_id} />
        ) : (
          <p> Your messages will show here </p>
        )}
      </div>
    </div>
  )
}

export default MessagePage;