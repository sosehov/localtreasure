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
    <button onClick={handleDelete} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-muted-foreground hover:text-foreground">
      <svg  xmlns="http://www.w3.org/2000/svg"  width={16}  height={16}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-x">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
  )
};

export default DeleteButton;