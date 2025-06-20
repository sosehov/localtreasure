const MessageSpan = (props) => {
  // Identifies whether it is sender or receiver for styling 
  const chatRole = props.message.sender_id === props.sender.id ? "sender" : "receiver";
  return (
    <li className={chatRole}>{props.message.content}</li>
  )
}

export default MessageSpan;