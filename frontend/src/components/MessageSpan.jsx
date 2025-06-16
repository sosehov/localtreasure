const MessageSpan = (props) => {
  console.log(props.message);
  // Identifies whether it is sender or receiver for styling 
  const chatRole = props.message.sender_id === props.sender.id ? "sender" : "receiver";
  return (
    <li key={props.message.msg_id} className={chatRole}>{props.message.content}</li>
  )
}

export default MessageSpan;