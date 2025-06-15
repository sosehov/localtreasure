const MessageSpan = (props) => {
  console.log("sender prop inside messagespan", props.sender);
  // figure out if it is sender or receiver for styling 
  const chatRole = props.message.sender_id === props.sender.userId ? "sender" : "receiver";
  return (
    // give li className of seller/buyer for styling later
    <li className={chatRole}>{props.message.text}</li>
  )
}

export default MessageSpan;