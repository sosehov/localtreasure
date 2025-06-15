const MessageSpan = (props) => {
  return (
    // give li className of seller/buyer for styling later
    <li>{props.message.text}</li>
  )
}

export default MessageSpan;