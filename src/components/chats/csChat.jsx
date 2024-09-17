import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import './cs-chat.scss';

export const CustomerSupport = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [chatSessionId, setChatSessionId] = useState(null);

    const user = useSelector(state => state.ekzaUser?.user);
    const userId = user?._id;

    useEffect(() => {
        if (isChatOpen) {
            const newSocket = io('http://localhost:2000/api/support', { transports: ['websocket'] });
            setSocket(newSocket);

            newSocket.on('connect', () => {
                console.log('Connected to customer support:', newSocket.id);

                if (!chatSessionId) {
                    newSocket.emit('createSupportSession', { userId });
                } else {
                    newSocket.emit('joinSupportSession', { userId, chatSessionId });
                }
            });

            newSocket.on('sessionCreated', ({ chatSessionId }) => {
                console.log('New chat session created:', chatSessionId);
                setChatSessionId(chatSessionId);
            });

            newSocket.on('previousMessages', (previousMessages) => {
                console.log('Previous messages:', previousMessages);
                setMessages(previousMessages);
            });

            newSocket.on('supportMessage', (msg) => {
                console.log('Received message:', msg);
                setMessages(prevMessages => [...prevMessages, msg]);
            });

            newSocket.on('disconnect', () => {
                console.log('Disconnected from customer support');
            });

            return () => {
                newSocket.disconnect();
            };
        }
    }, [isChatOpen, userId, chatSessionId]);

    const handleClick = () => {
        setIsChatOpen(true);
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && socket) {
            const msgObject = { text: message, sender: 'user', chatSessionId };
            socket.emit('supportMessage', msgObject);

            setMessages(prevMessages => [...prevMessages, msgObject]);
            setMessage('');
        }
    };

    return (
        <div className="customer-support">
            <button onClick={handleClick} className="support-button">
                Contact Support
            </button>

            {isChatOpen && (
                <div className="support-chat-container">
                    <h2>Customer Support</h2>
                    <div className="support-chat-messages">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`support-chat-message ${msg.sender === 'user' ? 'user' : 'support'}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={sendMessage} className="support-chat-form">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="support-chat-input"
                        />
                        <button type="submit" className="support-chat-submit">
                            Send
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};
