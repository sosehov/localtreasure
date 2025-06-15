const MessageInputForm = (props) => {
  
  const handleSubmit = (e, user) => {
    console.log(e);
    e.preventDefault();
    // form validation
    const message = e.target[0].value; // see if we can make this more specific
    console.log('message from form', message);
    socketRef.current.emit('SEND_MESSAGE', { message });
    e.target.reset(); // resets whole form
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, props.user)}>
      <input type="text"></input>
      <button type="submit">Send</button>
    </form>
  )
};

export default MessageInputForm;

