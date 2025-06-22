const MessageSpan = (props) => {
  const baseStyle = "px-4 py-2 rounded-lg max-w-xs text-sm w-[60%] whitespace-normal";
  const senderStyle = "inline-block px-3 py-1 rounded-md max-w-xs bg-[#fda738] text-black self-end";
  const receiverStyle = "inline-block px-3 py-1 rounded-md max-w-xs bg-gray-200 text-muted-foreground self-start";

  // Identifies whether it is sender or receiver for styling 
  const chatRole = props.message.sender_id === props.sender.id ? "sender" : "receiver";
  return (
    <li className={`${baseStyle} ${chatRole === 'sender' ? senderStyle : receiverStyle}`}>{props.message.content}</li>
  )
}

export default MessageSpan;