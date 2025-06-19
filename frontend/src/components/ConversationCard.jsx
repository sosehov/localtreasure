import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from 'react';


const ConversationCard = (props) => {

  const { token, makeAuthenticatedRequest, user } = useAuth();
  const [receiver, setReceiver] = useState(null);

  const getReceiverId = (room) => {
    const receiver_id = user.id === room.sender_id ? room.receiver_id : room.sender_id;
    console.log('room sender:', user.id, ', room receiver:', receiver_id);
    return receiver_id;
  };
  
  const receiverId = getReceiverId(props.room);


  useEffect(() => {
    const fetchReceiver = async () => {
      try {
        const fetchURL = `api/users/${receiverId}`;
        const response = await makeAuthenticatedRequest(fetchURL, {
          method: "GET"
        });
        const data = await response.json();
        setReceiver(data.user[0]);
        console.log('receiver after fetch:', data.user);
      } catch (error) {
        console.error("Error fetching receiver:", error);
      }
    };

    if (receiverId) {
      console.log('props receiverid:', receiverId);
      fetchReceiver();
    }
  }, [token, user, makeAuthenticatedRequest]);

  return (
    <div>
      {receiver ? (
        <Link to={`/message?reciever_id=${receiverId}`}> {receiver.name} </Link>
      ) : (
        <p>Loading conversation...</p>
      )}
    </div>
  )
};

export default ConversationCard;