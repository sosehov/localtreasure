import MessageSpan from './MessageSpan';

const MessageBox = (props) => {
  return (
    <ul>
      {props.messages.map(message => (
        < MessageSpan message={message} sender={sender}/>
      ))}  
    </ul>
  )
}

export default MessageBox;