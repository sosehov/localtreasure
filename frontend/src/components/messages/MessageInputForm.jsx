const MessageInputForm = (props) => {
  return (
    <form className="border-t p-4 flex gap-2" onSubmit={(e) => props.handleSubmit(e, props.user)}>
      <input 
      type="text" 
      className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      placeholder="Type a message...">
      </input>
      <button type="submit" 
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-[#fda738]/90 transition-colors">Send</button>
    </form>
  )
};

export default MessageInputForm;