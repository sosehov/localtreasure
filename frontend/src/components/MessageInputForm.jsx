const MessageInputForm = (props) => {
  return (
    <form onSubmit={(e) => props.handleSubmit(e, props.user)}>
      <input type="text"></input>
      <button type="submit">Send</button>
    </form>
  )
};

export default MessageInputForm;