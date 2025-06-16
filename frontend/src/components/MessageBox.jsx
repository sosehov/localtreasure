import MessageSpan from './MessageSpan';

const MessageBox = (props) => {
  console.log('messages inside messagebox:', Object.values(props.messages)[0]);
  return (
    <ul>
      {Object.values(props.messages)[0].map(message => ( //what's happening here
        < MessageSpan key={message.msg_id} message={message} sender={props.sender}/>
      ))}  
    </ul>
  )
}

export default MessageBox;