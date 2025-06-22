const MessageSpan = (props) => {
  const baseStyle = "px-4 py-2 rounded-lg max-w-xs text-sm";
  const senderStyle = "bg-primary text-primary-foreground self-end";
  const receiverStyle = "bg-muted text-muted-foreground self-start";
  // Identifies whether it is sender or receiver for styling 
  const chatRole = props.message.sender_id === props.sender.id ? "sender" : "receiver";
  return (
    <li className={`${chatRole} ${chatRole === 'sender' ? senderStyle : receiverStyle}`}>{props.message.content}</li>
  )
}

export default MessageSpan;