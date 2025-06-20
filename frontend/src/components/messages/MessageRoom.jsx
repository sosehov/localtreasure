import { useChat } from '../../hooks/useChat';

import MessageBox from './MessageBox';
import MessageInputForm from './MessageInputForm';

const MessageRoom = () => {
  const { user, receiver_id, messages, setMessages, socketRef } = useChat();

  const handleSubmit = (e, user) => {
    e.preventDefault();
    const messageText = e.target[0].value;

    const message = {
      sender_id: user.id,
      receiver_id: Number(receiver_id),
      content: messageText,
      sendtime: `${new Date().toISOString()}`
    };

    socketRef.current.emit('SEND_MESSAGE', message);
    socketRef.current.off('SEND_MESSAGE', message);

    const sentMessage = async (message) => {
      console.log('new message is here:', message);
      setMessages(prev => [...prev, message]);
      socketRef.current.off('SENT_MESSAGE', sentMessage); // cleanup
    };
    socketRef.current.on('SENT_MESSAGE', sentMessage);

    e.target.reset();
  };

  return (
    <div>
      <MessageBox messages={messages} sender={user} />
      <MessageInputForm user={user} handleSubmit={handleSubmit} />
    </div>
  );
};

export default MessageRoom;
