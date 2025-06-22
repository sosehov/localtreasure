const MessageSpan = (props) => {

  const baseStyle = "inline-block px-3 py-1 rounded-md max-w-xs text-black text-sm whitespace-normal";
  const senderStyle = "bg-[#fda738] self-end";
  const receiverStyle = "bg-gray-200 self-start";

  // Identifies whether it is sender or receiver for styling 
  const chatRole = props.message.sender_id === props.sender.id ? "sender" : "receiver";

  return (
    <li className={`flex flex-col w-[60%] ${chatRole === 'sender' ? 'self-end' : 'self-start'}`}>
      <span className={`${chatRole === 'sender' ? 'self-end' : 'self-start'}`}>{props.message.sender_name}</span>
      <div className={`${baseStyle} ${chatRole === 'sender' ? senderStyle : receiverStyle}`}>
        {props.message.content}
      </div>
    </li>
  )
}

export default MessageSpan;