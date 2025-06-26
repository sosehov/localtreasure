import { useChat } from '../../hooks/useChat';

import MessageBox from './MessageBox';
import MessageInputForm from './MessageInputForm';

const MessageRoom = (props) => {
  const { user, messages, setMessages, socketRef } = useChat(props.receiver_id);

  const handleSubmit = (e, user) => {

    e.preventDefault();
    const messageText = e.target[0].value;
    if (messageText.trim() === '') return;

    const message = {
      sender_id: user.id,
      receiver_id: Number(props.receiver_id),
      content: messageText,
      sendtime: `${new Date().toISOString()}`
    };

    socketRef.current.emit('SEND_MESSAGE', message);
    socketRef.current.off('SEND_MESSAGE', message);

    const sentMessage = async (message) => {
      setMessages(prev => [...prev, message]);
      socketRef.current.off('SENT_MESSAGE', sentMessage); // cleanup
    };
    socketRef.current.on('SENT_MESSAGE', sentMessage);

    e.target.reset();
  };

  return (
    <div className="flex flex-col flex-1 h-full">
      <MessageBox messages={messages} sender={user} />
      <MessageInputForm user={user} handleSubmit={handleSubmit} />
    </div>
  );
};

export default MessageRoom;
