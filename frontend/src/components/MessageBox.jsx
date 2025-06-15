import MessageSpan from './MessageSpan';

const MessageBox = (props) => {
  // fetch message from db
  return (
    <ul>
      {props.messages.map(message => (
        < MessageSpan message={message}/>
      ))}  
    </ul>
  )
}

export default MessageBox;