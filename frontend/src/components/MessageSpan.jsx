const MessageSpan = (props) => {
  // console.log("sender prop inside messagespan", props.sender);
  // Identifies whether it is sender or receiver for styling 
  const chatRole = props.message.sender_id === props.sender.id ? "sender" : "receiver";
  return (
    <li className={chatRole}>{props.message.text}</li>
  )
}

export default MessageSpan;