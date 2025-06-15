import MessageSpan from './MessageSpan';

const MessageBox = (props) => {
  // we have access to the sender under props.sender
  return (
    <ul>
      {props.messages.map(message => (
        < MessageSpan message={message}/>
      ))}  
    </ul>
  )
}

export default MessageBox;