import MessageSpan from './MessageSpan';

const MessageBox = (props) => {
  return (
    <ul className="flex flex-col h-[85%] overflow-y-auto p-4 space-y-2">
      {Object.values(props.messages).map(message => (
        < MessageSpan key={message.msg_id} message={message} sender={props.sender}/>
      ))}  
    </ul>
  )
}

export default MessageBox;