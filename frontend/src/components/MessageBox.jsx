import MessageSpan from './MessageSpan';

const MessageBox = (props) => {
  console.log('messages state inside messagebox:', props.messages);
  return (
    <ul>
      {Object.values(props.messages).map(message => (
        < MessageSpan key={message.msg_id} message={message} sender={props.sender}/>
      ))}  
    </ul>
  )
}

export default MessageBox;