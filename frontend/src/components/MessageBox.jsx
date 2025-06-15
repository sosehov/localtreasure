import MessageSpan from './MessageSpan';

const MessageBox = (props) => {
  // const messages = getMessages();
  const messages = fetch('localhost/api/messages'); //pseodcode
  return (
    <ul>
      {props.messages.map(message => (
        < MessageSpan message={message} sender={sender}/>
      ))}  
    </ul>
  )
}

export default MessageBox;