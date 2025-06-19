import { useAuth } from "../contexts/AuthContext";

const DeleteButton = (props) => {
  const { makeAuthenticatedRequest } = useAuth();

  const handleDelete = async () => {
    const fetchURL = `api/messageRooms/delete/${props.room.id}`;
    const response = await makeAuthenticatedRequest(fetchURL, {
      method: "POST"
    })
    .then((res) => {
      console.log('convo deleted:', res);
    })
  }

  return(
    <button onClick={handleDelete}>
      Delete
    </button>
  )
};

export default DeleteButton;