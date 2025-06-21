import { useAuth } from "../../contexts/AuthContext";

const DeleteButton = (props) => {
  const { makeAuthenticatedRequest } = useAuth();

  const handleDelete = async () => {
    console.log('click registered');
    const fetchURL = `api/messageRooms/delete/${props.room.id}`;
    const response = await makeAuthenticatedRequest(fetchURL, {
      method: "POST"
    })
    props.setRooms(prev => {
      return prev.filter(room => room.id !== props.room.id);
    })

  }

  return(
    <button onClick={handleDelete}>
      Delete
    </button>
  )
};

export default DeleteButton;