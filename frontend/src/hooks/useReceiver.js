import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const useReceiver = (room) => {
  const { token, makeAuthenticatedRequest, user } = useAuth();
  const [receiver, setReceiver] = useState(null);

  // Determine the receiver's ID
  const receiverId = user?.id === room?.sender_id ? room?.receiver_id : room?.sender_id;

  useEffect(() => {
    const fetchReceiver = async () => {
      if (!receiverId || !token) return;

      try {
        const fetchURL = `api/users/${receiverId}`;
        const response = await makeAuthenticatedRequest(fetchURL, { method: 'GET' });
        const data = await response.json();
        setReceiver(data.user[0]);
      } catch (error) {
        console.error('Error fetching receiver:', error);
      }
    };

    if (receiverId) {
      fetchReceiver();
    }
  }, [receiverId, token, makeAuthenticatedRequest]);

  return { receiver, receiverId };
};

export default useReceiver;